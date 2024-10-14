const Shape = require('./shape');

class Triangle extends Shape {
  render() {
    return `<polygon points="100,20 180,180 20,180" fill="${this.color}" />`;
  }
}

module.exports = Triangle;