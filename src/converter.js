const _ = require('cleaner-node');

const getFirstLine = lines => {

  const validLines = [].concat(lines).filter(x => (x && x.trim().length > 0));
  if (validLines.length === 0) {
    return null;
  }

  return validLines.length > 0 ? validLines[0] : null;
}
const getHeaderPositions = (firstLine, delimeter) => {

  const parts = firstLine.split(delimeter).map(x => `${x}`);

  // Header cannot have actual values
  const emailAddress = parts.find(x => _.isEmail(x));
  if (emailAddress) {
    return {};
  }
  const positions = {};

  for (let i = 0; i < parts.length; i++) {

    const part = `${parts[i]}`.trim().toLowerCase();
    if (!part) {
      continue;
    }

    if (part.indexOf('email') >= 0 && !_.isNumber(positions.email)) {
      positions.email = i;
    }
    if (part.indexOf('name') >= 0 && !_.isNumber(positions.name)) {
      positions.name = i;
    }
  }

  return positions;

}
const getDataLines = (lines, firstLine) => {
  const validLines = [].concat(lines).filter(x => (x && x.trim().length > 0 && x !== firstLine));
  return [].concat(lines).filter(x => (x && x.trim().length > 0 && x !== firstLine));
}

const lineToContact = ({ line, delimeter, positions }) => {

  const contact = {};

  const parts = line.split(delimeter);

  Object.keys(positions).forEach(key => {
    const position = positions[key];
    if (parts.length > (position + 1)) {
      contact[key] = parts[position].trim();
    }
  });

  return contact;

};

const convert = (rawLines, delimeter) => {

  const lines = [];
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    if (!_.isValidString(line)) {
      continue;
    }
    lines.push(line.replace(/\0/g, ''));
  }

  const firstLine = getFirstLine(lines);
  const positions = getHeaderPositions(firstLine, delimeter);
  const dataLines = getDataLines(lines, firstLine);

  const contacts = [];

  for (let i = 0; i < dataLines.length; i++) {

    const contact = lineToContact({ line: dataLines[i], delimeter, positions });
    if (!contact) {
      continue;
    }
    if (!contact?.name && !contact?.email) {
      console.log('Skipping line', contact);
      continue;
    }
    contacts.push(contact);

  }

  return contacts;

};

module.exports = {
  convert
};