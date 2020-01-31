
import { Icon, Modal } from 'antd';
import styles from './index.less';

class Snake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
    }
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
            <Icon className={styles.snakeHead} type="smile" />
            <Icon className={styles.snakeBody} type="plus-circle" />
          </div>
        </div>
      </div>
    );
  }
}

export default Snake;