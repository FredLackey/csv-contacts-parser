# csv-contacts-parser

Extract Basic Contact Lists from CSV Files

## Installation

```bash
npm install csv-contacts-parser
```

## Usage

```javascript
const csvContacts = require('csv-contacts-parser');

const json = await csvContacts.parse({
  path: 'path/to/csv/file.csv'
});
```

## Options

- `path` (string, required): Path to the CSV file.

## Output

The output is a JSON object with the following structure:

```json
{
  "path": "path/to/csv/file.csv",
  "contacts": [
    {
      "email": "joe.blow@nowhere.com",
      "name": "Joe Blow"
    },
    {
      "email": "mike.smith@nowhere.com",
      "name": "Mike Smith"
    }
  ]
}
```

## Contact Information

If you ever need a hand or have any questions, feel free to reach out.  

**Fred Lackey**  
[https://fredlackey.com](https://fredlackey.com)  
[fred.lackey@gmail.com](mailto:fred.lackey@gmail.com)  