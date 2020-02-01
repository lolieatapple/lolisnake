class Snake {
  constructor() {
    this.reset();
  }

  reset() {
    this.snake = [
      { top: 10, left: 20, type: "head" },
      { top: 10, left: 19, type: "body" },
      { top: 10, left: 18, type: "body" },
    ];
    this.score = 0;
    this.level = 0;
    this.direct = 0;
    this.minX = 1;
    this.maxX = 50;
    this.minY = 1;
    this.maxY = 62;
    this.width = 0;
    this.height = 0;
    this.clock = 0;
  }


  run(width, height) {
    this.clock++;
    this.updateSize(width, height);
    this.snakeBodyGo();
    this.snakeHeadGo();
    let ret = this.collisionDetection();
    return {
      score: this.score,
      level: this.level,
      clock: this.clock,
      gameOver: ret ==='GameOver',
      snake: this.snake,
    }
  }

  updateSize(width, height) {
    if (width !== this.width || height !== this.height) {
      this.width = width;
      this.height = height;
      let vh = height / 100;
      let vw = width / 100;
      this.maxX = Number((width / vh - 1).toFixed(0))

      console.log('maxX:', this.maxX);
    }
  }

  turnRight() {
    this.direct++;
  }

  turnLeft() {
    this.direct--;
    if (this.direct < 0) {
      this.direct = 3;
    }
  }

  snakeBodyGo() {
    let tailX = this.snake[this.snake.length - 1].left;
    let tailY = this.snake[this.snake.length - 1].top;

    for (let i = this.snake.length - 1; i > 0; i--) {
      this.snake[i].top = this.snake[i - 1].top;
      this.snake[i].left = this.snake[i - 1].left;
    }

    if (this.clock % 10 === 0) {
      this.snake.push({ top: tailY, left: tailX, type: 'body' });
    }

  }

  snakeHeadGo() {
    let direct = this.direct % 4;
    switch (direct) {
      case 0:
        if (this.snake[0].left + 1 < this.maxX) {
          this.snake[0].left++;
        } else {
          this.snake[0].left = 0 + this.minX;
        }
        break;
      case 1:
        if (this.snake[0].top + 1 < this.maxY) {
          this.snake[0].top++;
        } else {
          this.snake[0].top = 0 + this.minY;
        }
        break;
      case 2:
        if (this.snake[0].left - 1 > this.minX) {
          this.snake[0].left--;
        } else {
          this.snake[0].left = this.maxX;
        }
        break;
      case 3:
        if (this.snake[0].top - 1 > this.minY) {
          this.snake[0].top--;
        } else {
          this.snake[0].top = this.maxY;
        }
        break;
    }
  }


  collisionDetection() {
    for (let i = 0; i < this.snake.length; i++) {
      for (let j = 0; j < this.snake.length; j++) {
        if (this.snake[i].left === this.snake[j].left && this.snake[i].top === this.snake[j].top && i !== j) {
          console.log('GameOver', this.snake[i], this.snake[j], i, j);
          return "GameOver";
        }
      }
    }
  }
}

export default Snake;