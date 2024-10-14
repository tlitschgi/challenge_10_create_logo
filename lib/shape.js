class Shape {
    constructor(color, text) {
      this.color = color;
      this.text = text;
    }
  
    render() {
      throw new Error('render() method must be implemented by child classes');
    }
  
    generateSVG() {
      return `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        ${this.render()}
        <text x="100" y="100" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${this.text}</text>
      </svg>`;
    }
  }
  
  module.exports = Shape;