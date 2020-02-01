class Snake {
    run(width, height) {
        return {
            score: 100,
            level: 10,
            snake:[
                {top: 10, left: 20, type: "head"},
                {top: 10, left: 19, type: "body"},
                {top: 10, left: 18, type: "body"},
              ]
        }
    }
}

export default Snake;