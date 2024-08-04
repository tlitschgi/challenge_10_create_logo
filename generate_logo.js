// Import readline and file system
const readline = require('readline');
const fs = require('fs');

// Create readline variable and interface used for input and output data
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user with question and return promise with the user answer
function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Generate SVG based on the user shape answer
function generateSVG(color, shape, text) {
  let logoElement;
  switch (shape.toLowerCase()) {
    case 'circle':
      logoElement = `<circle cx="100" cy="100" r="80" fill="${color}" />`;
      break;
    case 'square':
      logoElement = `<rect x="20" y="20" width="160" height="160" fill="${color}" />`;
      break;
    case 'triangle':
      logoElement = `<polygon points="100,20 180,180 20,180" fill="${color}" />`;
      break;
    default:
      throw new Error('Invalid shape. Please choose circle, square, or triangle.');
  }

  // Return SVG
  return `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      ${logoElement}
      <text x="100" y="100" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>`;
}

// Main function to execute program
// Prompt user to enter logo details and wait for response
// Generate and save SVG based on entered user logo details
// Close readline interface
async function main() {
  try {
    const color = await promptUser('Enter a color (e.g., #ff0000 or red): ');
    const shape = await promptUser('Enter a shape (circle, square, or triangle): ');
    const text = await promptUser('Enter text for the logo: ');

    const svg = generateSVG(color, shape, text);

    const fileName = 'logo.svg';
    fs.writeFileSync(fileName, svg);
    console.log(`Generated ${fileName}`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {

    rl.close();
  }
}

// Execute main function to generate logo
main();
