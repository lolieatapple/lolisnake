
import { Icon, Modal, Input, Table } from 'antd';
import styles from './index.less';
import Snake from './snake/snake';
import axios from 'axios';


class Ground extends React.Component {
  constructor(props) {
    super(props);
    this.snakeEngine = new Snake();
    this.state = {
      start: false,
      snake: [],
      food: [],
      score: 0,
      level: 0,
      clock: 0,
    }

    this.rankServer = 'https://molin.tech:8801/rank';
  }

  componentDidMount() {

  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'nick',
      key: 'name',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ]

  onStart = () => {
    this.setState({ start: true });
    this.setSpeed(0);
  }

  go = () => {
    let ret = this.snakeEngine.run(window.innerWidth, window.innerHeight);
    if (ret.level !== this.state.level) {
      this.setSpeed(ret.level);
    }
    this.setState({ snake: ret.snake, score: ret.score, level: ret.level, clock: ret.clock, food: ret.food });
    if (ret.gameOver) {
      let nick = document.getElementById('input').value;
      console.log(nick, 'GameOver.');
      this.setRank(nick, ret.score, ret.level, ret.clock);
      clearInterval(this.speed);
      this.setState({ start: false });
      this.snakeEngine.reset();
    }
  }

  setSpeed = (level) => {
    console.log('speed level:', level);
    if (this.speed) {
      clearInterval(this.speed);
    }
    let time = level < 99?level:99;
    this.speed = setInterval(this.go, 200 - time * 2);
  }

  setRank = (nick, score, level, time) => {
    axios({
      method: 'GET',
      url: this.rankServer,
      timeout: 10000,
      params: {
        nick,
        score,
        level,
        time
      }
    }).then(console.log).catch(console.log);
  }

  onRank = () => {
    axios({
      method: 'GET',
      url: this.rankServer,
      timeout: 10000,
    }).then((value) => {
      console.log(value.data);
      let obj = value.data;
      let dataSource = [];
      for (var i in obj) {
        console.log('键名：', i);
        console.log('键值：', obj[i]);
        dataSource.push(obj[i]);
      }

      Modal.info({
        title: '排行榜',
        content: (
          <Table columns={this.columns} size="small" dataSource={dataSource.sort((a, b)=>{return b.score - a.score})}/>
        ),
        onOk() { },
      });
    }).catch((err)=>{
      window.alert(err);
    });
  }

  render() {
    return (
      <div className={styles.body}>
        <div id='ground' className={styles.ground}></div>
        <div className={styles.ctrl}>
          {
            this.state.start ?
              <div className={styles.button} onClick={() => { this.snakeEngine.turnLeft() }}>
                <Icon className={styles.icon} type="left" />
              </div>
              :
              <div className={styles.button} onClick={this.onStart}>
                <div className={styles.icon}>开始</div>
              </div>
          }
          {
            this.state.start ?
              <div className={styles.button} onClick={() => { this.snakeEngine.turnRight() }}>
                <Icon className={styles.icon} type="right" />
              </div>
              :
              <div className={styles.button} onClick={this.onRank}>
                <div className={styles.icon}>排行</div>
              </div>
          }
          <div>
            {this.state.snake.map((v, i) => {
              let top = v.top;
              let left = v.left;
              if (v.type === 'head') {
                return <div className={styles.snakeHead} style={{ top: top + "vh", left: left + "vh" }} />
              }
              return <div className={styles.snakeBody} style={{ top: top + "vh", left: left + "vh" }} />
            })}
            {this.state.food.map((v, i) => {
              let top = v.top;
              let left = v.left;
              if (v.type === 'normal') {
                return <div className={styles.normalFood} style={{ top: top + "vh", left: left + "vh" }} />
              }
              return <div className={styles.superFood} style={{ top: top + "vh", left: left + "vh" }} />
            })}
          </div>
          <div className={styles.headerBar}>
            <div>SCORE: {this.state.score}</div>
            <div>LEVEL: {this.state.level}</div>
            <div>TIME: {this.state.clock}</div>

          </div>
        </div>
        <div className={styles.inputParent}>
          <div style={{ margin: '1vh' }}>请先输入昵称😊:</div>
          <Input
            id='input'
            placeholder="先输入昵称再开始哦~" style={{ width: '50vw' }} defaultValue={'匿名'} />
        </div>
      </div>
    );
  }
}

export default Ground;
