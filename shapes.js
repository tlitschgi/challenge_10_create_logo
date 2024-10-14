class Shape {
  constructor(color, text) {
    this.color = color;
    this.text = text;
    if (this.constructor === Shape) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    throw new Error("render() method must be implemented by child classes");
  }
}

class Circle extends Shape {
  constructor(color, text) {
    super(color, text);
  }

  render() {
    return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`;
  }
}

class Square extends Shape {
  constructor(color, text) {
    super(color, text);
  }

  render() {
    return `<rect x="50" y="50" width="160" height="160" fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  constructor(color, text) {
    super(color, text);
  }

  render() {
    return `<polygon points="150,18 244,182 56,182" fill="${this.color}" />`;
  }
}

function createShape(shapeType, color, text) {
  if (text.length > 3) {
    throw new Error('Text must be 3 characters or less');
  }

  switch (shapeType.toLowerCase()) {
    case 'circle':
      return new Circle(color, text);
    case 'square':
      return new Square(color, text);
    case 'triangle':
      return new Triangle(color, text);
    default:
      throw new Error('Invalid shape. Please choose circle, square, or triangle.');
  }
}

module.exports = { Shape, Circle, Square, Triangle, createShape };

module.exports = { Shape, Circle, Square, Triangle, createShape };