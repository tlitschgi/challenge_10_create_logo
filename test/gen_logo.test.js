const { Shape, Circle, Square, Triangle, createShape } = require('../shapes');

describe('Shape Classes', () => {
  describe('Base Shape Class', () => {
    test('should throw error when instantiated directly', () => {
      expect(() => new Shape('red', 'ABC')).toThrow("Abstract classes can't be instantiated.");
    });

    test('should throw error when render() is called on base Shape class', () => {
      const shape = new Circle('red', 'ABC');
      Object.setPrototypeOf(shape, Shape.prototype);
      expect(() => shape.render()).toThrow('render() method must be implemented by child classes');
    });
  });

  describe('Circle Class', () => {
    test('should generate correct SVG for circle', () => {
      const circle = new Circle('#FF0000', 'ABC');
      const svg = circle.render();
      expect(svg).toBe('<circle cx="150" cy="100" r="80" fill="#FF0000" />');
    });

    test('should render circle with different colors', () => {
      const circle1 = new Circle('blue', 'ABC');
      const circle2 = new Circle('#00FF00', 'DEF');
      expect(circle1.render()).toContain('fill="blue"');
      expect(circle2.render()).toContain('fill="#00FF00"');
    });
  });

  describe('Square Class', () => {
    test('should generate correct SVG for square', () => {
      const square = new Square('#FF0000', 'ABC');
      const svg = square.render();
      expect(svg).toBe('<rect x="50" y="50" width="160" height="160" fill="#FF0000" />');
    });

    test('should render square with different colors', () => {
      const square1 = new Square('green', 'ABC');
      const square2 = new Square('#0000FF', 'DEF');
      expect(square1.render()).toContain('fill="green"');
      expect(square2.render()).toContain('fill="#0000FF"');
    });
  });

  describe('Triangle Class', () => {
    test('should generate correct SVG for triangle', () => {
      const triangle = new Triangle('#FF0000', 'ABC');
      const svg = triangle.render();
      expect(svg).toBe('<polygon points="150,18 244,182 56,182" fill="#FF0000" />');
    });

    test('should render triangle with different colors', () => {
      const triangle1 = new Triangle('yellow', 'ABC');
      const triangle2 = new Triangle('#FF00FF', 'DEF');
      expect(triangle1.render()).toContain('fill="yellow"');
      expect(triangle2.render()).toContain('fill="#FF00FF"');
    });
  });
});

describe('Shape Creation', () => {
  describe('createShape function', () => {
    test('should create correct shape instance based on shape type', () => {
      const circle = createShape('circle', 'red', 'ABC');
      const square = createShape('square', 'blue', 'DEF');
      const triangle = createShape('triangle', 'green', 'GHI');

      expect(circle).toBeInstanceOf(Circle);
      expect(square).toBeInstanceOf(Square);
      expect(triangle).toBeInstanceOf(Triangle);
    });

    test('should handle case-insensitive shape names', () => {
      const circle = createShape('CiRcLe', 'red', 'ABC');
      expect(circle).toBeInstanceOf(Circle);
    });

    test('should throw error for invalid shape type', () => {
      expect(() => createShape('hexagon', 'red', 'ABC'))
        .toThrow('Invalid shape. Please choose circle, square, or triangle.');
    });
    test('should throw error for text longer than 3 characters', () => {
      expect(() => createShape('circle', 'red', 'ABCD'))
        .toThrow('Text must be 3 characters or less');
    });

    test('should accept text with 3 or fewer characters', () => {
      expect(() => createShape('circle', 'red', 'ABC')).not.toThrow();
      expect(() => createShape('square', 'blue', 'AB')).not.toThrow();
      expect(() => createShape('triangle', 'green', 'A')).not.toThrow();
    });
  });
});

describe('Input Validation', () => {
  test('should validate text length is 3 or less characters', () => {
    expect(() => createShape('circle', 'red', 'ABCD')).toThrow('Text must be 3 characters or less');
    expect(() => createShape('square', 'blue', 'ABC')).not.toThrow();
  });

  test('should validate shape input', () => {
    expect(() => createShape('invalid', 'red', 'ABC')).toThrow('Invalid shape');
  });
});