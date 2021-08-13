const { addIconToProject } = require('./download-fa-icon.js');

const args = process.argv.slice(2);
const faURL = args[0]; // First parameter is the URL of Font Awesome icon

if (!faURL) {
  throw new Error('Font Awesome icon URL is missing');
}

addIconToProject(faURL);

export default (faURL) => {
  if (!faURL) {
    throw new Error('Font Awesome icon URL is missing');
  }

  addIconToProject(faURL);
};
