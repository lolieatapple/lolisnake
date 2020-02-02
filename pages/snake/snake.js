class Snake {
  constructor() {
    this.reset();
  }

  reset() {
    this.snake = [
      { top: 10, left: 20, type: "head" },
      { top: 10, left: 19, type: "body" },
      { top: 10, left: 18, type: "body" },
      { top: 10, left: 17, type: "body" },
      { top: 10, left: 16, type: "body" },
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
    this.foodScore = 0;
    this.snakeLength = 0;
    this.snakeOldLength = 0;

    this.food = [
      { top: this.randY(), left: this.randX(), type: 'normal'},
      { top: this.randY(), left: this.randX(), type: 'normal'},
      { top: this.randY(), left: this.randX(), type: 'normal'},
      { top: this.randY(), left: this.randX(), type: 'super'},
    ];
    console.log('food:', this.food);
  }

  randX() {
    return Math.floor((Math.random()*(this.maxX-6))+3);
  }

  randY() {
    return Math.floor((Math.random()*(this.maxY-6))+3);
  }

  run(width, height) {
    this.clock++;
    this.updateSize(width, height);
    this.snakeBodyGo();
    this.snakeHeadGo();
    this.calcLevel();
    this.calcScore();
    this.addFood();
    if (this.food.length > 50) {
      this.clearFood();
    }
    
    let ret = this.collisionDetection();
    return {
      score: this.score,
      level: this.level,
      clock: this.clock,
      gameOver: ret ==='GameOver',
      snake: this.snake,
      food: this.food,
    }
  }

  calcScore() {
    this.score = this.clock + 100*this.level + this.foodScore;
  }

  calcLevel() {
    this.level = this.snake.length - 5;
  }

  updateSize(width, height) {
    if (width !== this.width || height !== this.height) {
      this.width = width;
      this.height = height;
      let vh = height / 100;
      let vw = width / 100;
      this.maxX = Number((width / vh - 1).toFixed(0)) - 1;

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

    if (this.clock % 100 === 0) {
      this.snake.push({ top: tailY, left: tailX, type: 'body' });
    } else if ( this.snakeLength !== this.snakeOldLength ) {
      let length = this.snakeLength - this.snakeOldLength;
      if (length > 0) {
        this.snake.push({ top: tailY, left: tailX, type: 'body' });
        this.snakeOldLength++;
      } else if (length < 0) {
        this.snake.pop();
        this.snakeOldLength--;
      }
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

  addFood() {
    if (Math.floor((Math.random()*20)) === 0 ) {
      let type = Math.floor((Math.random()*10));
      if (type === 0 ) {
        this.food.push({top: this.randY(), left: this.randX(), type:'super' });
      } else if (type === 1) {
        this.food.push({top: this.randY(), left: this.randX(), type:'long' });
      } else if (type === 2) {
        this.food.push({top: this.randY(), left: this.randX(), type:'short' });
      }else {
        this.food.push({top: this.randY(), left: this.randX(), type:'normal' });
      }
    }
  }

  clearFood() {
    if (Math.floor((Math.random()*20)) === 0 ) {
      this.food.splice(0, 1);
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

    for (let i=0; i<this.food.length; i++) {
      if (this.snake[0].left === this.food[i].left && this.snake[0].top === this.food[i].top) {
        if (this.food[i].type === 'normal') {
          this.foodScore += 100
        } else if (this.food[i].type === 'long') {
          this.foodScore += 1000
          this.snakeLength += 10;
        } else if (this.food[i].type === 'short') {
          this.foodScore += 1000
          if (this.snakeLength > 10) {
            this.snakeLength -= 10;
          } else {
            this.snakeLength = 0;
          }
        } else {
          this.foodScore += 1000
        }

        this.snakeLength++;
        this.food.splice(i, 1);
      }
    }
  }
}

export default Snake;