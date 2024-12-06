import React, { memo } from 'react'
import Sketch from './components/Sketch'

class Perceptron {
  constructor(totalInputs) {
    this.weights = Array.from({ length: totalInputs }, () =>
      Math.random(-1, 1)
    )
    this.learningConstant = 0.01
  }

  feedforward(inputs) {
    const sum = inputs.reduce(
      (acc, input, i) => acc + input * this.weights[i],
      0
    )
    return this.activate(sum)
  }

  activate(sum) {
    return sum > 0 ? 1 : -1
  }

  train(inputs, desired) {
    const guess = this.feedforward(inputs)
    const error = desired - guess
    console.log('error is', error);
    this.weights = this.weights.map(
      (weight, i) => weight + error * inputs[i] * this.learningConstant
    )
  }
}

const NeuralNetworks = memo(() => {
  return (
    <Sketch
      sketch={p5 => {
        let per = null
        const training = []
        function f(x) {
          return 0.5 * x - 1
        }

        p5.setup = () => {
          p5.createCanvas(640, 400)
          p5.background(255)

          p5.translate(p5.width / 2, p5.height / 2)
          // p5.scale(1, -1) // Flip the y-axis
          per = new Perceptron(3, 0.0001)

          p5.stroke(0)
          p5.strokeWeight(2)

          for (let i = 0; i < 50; i++) {
            let x = p5.random(-p5.width / 2, p5.width / 2)
            let y = p5.random(-p5.height / 2, p5.height / 2)
            let answer = 1
            if (y < f(x)) {
              answer = -1
            }
            training.push({
              input: [x, y, 1],
              output: answer,
              isTrained: false,
            })
          }
        }
        let lastUpdateTime = 0

        p5.draw = () => {
          const currentTime = p5.millis()

          // 只在需要清除画布时调用 p5.background
          if (currentTime - lastUpdateTime > 100) {
            if (training.every(item => item.isTrained)) {
              return;
            }
            p5.background(255)
            lastUpdateTime = currentTime
            p5.translate(p5.width / 2, p5.height / 2)
            p5.scale(1, -1) // Flip the y-axis
            p5.stroke(0)
            p5.strokeWeight(2)
            p5.line(
              -p5.width / 2,
              f(-p5.width / 2),
              p5.width / 2,
              f(p5.width / 2)
            )

            // 使用当前权重绘制感知器的直线
            const w0 = per.weights[2]
            const w1 = per.weights[0]
            const w2 = per.weights[1]
            const x1 = -p5.width / 2
            const y1 = (-w0 - w1 * x1) / w2
            const x2 = p5.width / 2
            const y2 = (-w0 - w1 * x2) / w2
            p5.stroke(255, 0, 0)
            p5.line(x1, y1, x2, y2)

            // 找到一个没有训练过的点
            const needTrain = training.find(item => !item.isTrained)
            if (needTrain) {
              per.train(needTrain.input, needTrain.output)
              needTrain.isTrained = true
            }
            console.log(
              '训练到第几个了',
              training.filter(item => item.isTrained).length
            )
            console.log('此时的权重', per.weights);
            for (let i = 0; i < training.length; i++) {
              let guess = per.feedforward(training[i].input)
              if (guess > 0) {
                p5.noFill()
              } else {
                p5.fill(0)
              }
              p5.ellipse(training[i].input[0], training[i].input[1], 8, 8)
            }
          }
        }
      }}
    />
  )
})

export default NeuralNetworks
