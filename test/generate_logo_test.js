const { Shape, Circle, Square, Triangle } = require('./shapes');

describe('Shape Classes', () => {
  describe('Base Shape Class', () => {
    test('should throw error when render() is called on base Shape class', () => {
      const shape = new Shape('red', 'ABC');
      expect(() => shape.render()).toThrow('render() method must be implemented by child classes');
    });

    test('should set color and text in constructor', () => {
      const shape = new Shape('#FF0000', 'ABC');
      expect(shape.color).toBe('#FF0000');
      expect(shape.text).toBe('ABC');
    });
  });

  describe('Circle Class', () => {
    test('should generate correct SVG for circle', () => {
      const circle = new Circle('#FF0000', 'ABC');
      const svg = circle.generateSVG();
      
      expect(svg).toContain('<circle cx="100" cy="100" r="80" fill="#FF0000"');
      expect(svg).toContain('<text x="100" y="100"');
      expect(svg).toContain('>ABC<');
    });

    test('should render circle with different colors', () => {
      const circle1 = new Circle('blue', 'ABC');
      const circle2 = new Circle('#00FF00', 'ABC');
      
      expect(circle1.render()).toContain('fill="blue"');
      expect(circle2.render()).toContain('fill="#00FF00"');
    });
  });

  describe('Square Class', () => {
    test('should generate correct SVG for square', () => {
      const square = new Square('#FF0000', 'ABC');
      const svg = square.generateSVG();
      
      expect(svg).toContain('<rect x="20" y="20" width="160" height="160" fill="#FF0000"');
      expect(svg).toContain('<text x="100" y="100"');
      expect(svg).toContain('>ABC<');
    });

    test('should render square with different colors', () => {
      const square1 = new Square('green', 'ABC');
      const square2 = new Square('#0000FF', 'ABC');
      
      expect(square1.render()).toContain('fill="green"');
      expect(square2.render()).toContain('fill="#0000FF"');
    });
  });

  describe('Triangle Class', () => {
    test('should generate correct SVG for triangle', () => {
      const triangle = new Triangle('#FF0000', 'ABC');
      const svg = triangle.generateSVG();
      
      expect(svg).toContain('<polygon points="100,20 180,180 20,180" fill="#FF0000"');
      expect(svg).toContain('<text x="100" y="100"');
      expect(svg).toContain('>ABC<');
    });

    test('should render triangle with different colors', () => {
      const triangle1 = new Triangle('yellow', 'ABC');
      const triangle2 = new Triangle('#FF00FF', 'ABC');
      
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
  });
});

describe('Input Validation', () => {
  test('should validate text length is 3 or less characters', async () => {
    const validator = (input) => input.length <= 3 ? true : 'Text must be 3 characters or less. Please try again.';
    
    expect(validator('ABC')).toBe(true);
    expect(validator('AB')).toBe(true);
    expect(validator('A')).toBe(true);
    expect(validator('ABCD')).toBe('Text must be 3 characters or less. Please try again.');
  });

  test('should validate shape input', async () => {
    const validator = (input) => {
      const validShapes = ['circle', 'square', 'triangle'];
      return validShapes.includes(input.toLowerCase()) 
        ? true 
        : 'Invalid shape. Please choose circle, square, or triangle.';
    };

    expect(validator('circle')).toBe(true);
    expect(validator('square')).toBe(true);
    expect(validator('triangle')).toBe(true);
    expect(validator('hexagon')).toBe('Invalid shape. Please choose circle, square, or triangle.');
  });
});