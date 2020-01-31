
import { Icon, Modal } from 'antd';
import styles from './index.less';

class Snake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      testSnake: [],
    }
  }

  testSnake = [
    {top: 10, left: 50, type: "head"},
    {top: 10, left: 46, type: "body"},
    {top: 10, left: 42, type: "body"},
    {top: 10, left: 38, type: "body"},
    {top: 10, left: 34, type: "body"},
    {top: 10, left: 30, type: "body"},
    {top: 10, left: 26, type: "body"},
    {top: 10, left: 22, type: "body"},
    {top: 10, left: 18, type: "body"},
    {top: 10, left: 14, type: "body"},
    {top: 10, left: 10, type: "body"},
    {top: 10, left: 6, type: "body"},
  ]

  componentDidMount() {
    setInterval(()=>{
      for (let i=0; i<this.testSnake.length; i++) {
        if (this.testSnake[i].left <= 50) {
          this.testSnake[i].left++;
        } else {
          this.testSnake[i].left = 2;
        }
      }

      this.setState({testSnake: this.testSnake});
    }, 200);
  }

  onStart = () => {
    this.setState({start: true});
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
      onOk() {},
    });
  }

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.ground}></div>
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
            
            
            {this.testSnake.map((v, i)=>{
              let top = v.top;
              let left = v.left;
              if (v.type === 'head') {
                return <Icon className={styles.snakeHead} style={{top: top+"vh", left: left+"vh"}} type="smile" />
              }
              return <Icon className={styles.snakeBody} style={{top: top+"vh", left: left+"vh"}} type="plus-circle" />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Snake;