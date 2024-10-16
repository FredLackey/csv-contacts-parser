const { parse } = require('../src');

const FILE_PATH = process.env.TEST_FILE_PATH;

const json = parse({ path: FILE_PATH });

console.log(JSON.stringify(json, null, 2));