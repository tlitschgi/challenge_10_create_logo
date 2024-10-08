// Import readline and file system
const readline = require('readline');
const fs = require('fs');

// Class for shape
class Shape {
  constructor(color, text) {
    this.color = color;
    this.text = text;
  }

  render() {
    throw new Error('render() method must be implemented by child classes');
  }

  // Generate SVG based on the user shape answer
  generateSVG() {
    return `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      ${this.render()}
      <text x="100" y="100" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${this.text}</text>
    </svg>`;
  }
}

// Class to create Circle shape
class Circle extends Shape {
  render() {
    return `<circle cx="100" cy="100" r="80" fill="${this.color}" />`;
  }
}

// Class to create sqaure shape
class Square extends Shape {
  render() {
    return `<rect x="20" y="20" width="160" height="160" fill="${this.color}" />`;
  }
}

// Class to create triange shape
class Triangle extends Shape {
  render() {
    return `<polygon points="100,20 180,180 20,180" fill="${this.color}" />`;
  }
}

// Create readline variable and interface used for input and output data
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user with question.
// When valid entry, return promise with the user answer.
// When invalid entry, respond with error and retry message for user.
function promptUser(question, validator = null) {
  return new Promise((resolve) => {
    const askQuestion = () => {
      rl.question(question, (answer) => {
        if (validator) {
          const validationResult = validator(answer);
          if (validationResult === true) {
            resolve(answer);
          } else {
            console.log(validationResult);
            askQuestion();
          }
        } else {
          resolve(answer);
        }
      });
    };
    askQuestion();
  });
}

// Return shape, color and text based on user entry
function createShape(shapeType, color, text) {
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

// Main function
// Prompt user to enter logo details and wait for response
// Create, generate and save SVG file based on entered user logo details
// Close readline interface
async function main() {
  try {
    const color = await promptUser('Enter a color (e.g., #ff0000 or red): ');
    const shape = await promptUser('Enter a shape (circle, square, or triangle): ',
      (input) => {
        const validShapes = ['circle', 'square', 'triangle'];
        return validShapes.includes(input.toLowerCase()) 
          ? true 
          : 'Invalid shape. Please choose circle, square, or triangle.';
      }
    );
    const text = await promptUser('Enter text for the logo (max 3 characters): ', 
      (input) => input.length <= 3 ? true : 'Text must be 3 characters or less. Please try again.');

    const shapeObj = createShape(shape, color, text);
    const svg = shapeObj.generateSVG();

    const fileName = 'logo.svg';
    fs.writeFileSync(fileName, svg);
    console.log(`Generated ${fileName}`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    rl.close();
  }
}

main();
