
import { Icon, Modal } from 'antd';
import styles from './index.less';
import Snake from './snake';



class Ground extends React.Component {
  constructor(props) {
    super(props);
    this.snakeEngine = new Snake();
    this.state = {
      start: false,
      snake: [],
      score: 0,
      level: 0,
      clock: 0,
    }
  }

  componentDidMount() {

  }

  onStart = () => {
    this.setState({ start: true });
    this.setSpeed(0);
  }

  go = () => {
    let ret = this.snakeEngine.run(window.innerWidth, window.innerHeight);
    this.setState({ snake: ret.snake, score: ret.score, level: ret.level, clock: this.state.clock+1 });
  }

  setSpeed = (level) => {
    if (this.speed) {
      clearInterval(this.speed);
    }

    this.speed = setInterval(this.go, 200 - level * 2);
  }

  onRank = () => {
    Modal.info({
      title: '排行榜',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() { },
    });
  }

  render() {
    return (
      <div className={styles.body}>
        <div id='ground' className={styles.ground}></div>
        <div className={styles.ctrl}>
          {
            this.state.start ?
              <div className={styles.button}>
                <Icon className={styles.icon} type="left" />
              </div>
              :
              <div className={styles.button} onClick={this.onStart}>
                <div className={styles.icon}>开始</div>
              </div>
          }
          {
            this.state.start ?
              <div className={styles.button}>
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
          </div>
          <div className={styles.headerBar}>
            <div>SCORE: {this.state.score}</div>
            <div>LEVEL: {this.state.level}</div>
            <div>TIME: {this.state.clock}</div>

          </div>
        </div>
      </div>
    );
  }
}

export default Ground;
