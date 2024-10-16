const _ = require('cleaner-node');
const { convert } = require('./converter');

const parse = ({ path }) => {
  const content = _.readFile(path);
  const lines = content.split('\n');
  const valid = lines.filter(_.isValidString);
  if (valid.length === 0) {
    return [];
  }
  const first = valid[0];
  const hasTabs = first.includes('\t');
  // const hasComma = first.includes(',');

  const result = {
    path,
    contacts: hasTabs ? convert(valid, '\t') : convert(valid, ','),
  }

  return result;
}

module.exports = {
  parse,
}


// const csvToJson = require('convert-csv-to-json');

// const parseComma = path => {
//   const json = csvToJson
//     .parseSubArray('*', ',')
//     .getJsonFromCsv(path);
//   return json;
// }
// const parseTab = path => {
//   const json = csvToJson
//     .parseSubArray('*', '\t')
//     .getJsonFromCsv(path);
//   return json;
// }

// const parse = ({ path, delimeter = ',' }) => {
//   const json = parseTab(path);
//   return json;
// };

// module.exports = {
//   parse,
// };
