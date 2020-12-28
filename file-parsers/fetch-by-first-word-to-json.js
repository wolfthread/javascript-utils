/*
  This script will parse a source file line by line and exterpt the line splitted by words according to specific delimiters.
 */

const fs = require("fs");
const readline = require("readline");
const STORE_FNAME = "<FILL_THIS>";
const SOURCE_FNAME = "<FILL_THIS>";
const FIRST_WORD = "<FILL_THIS>";

function storeData(data) {
  fs.appendFile(STORE_FNAME, data, (err) => {
    if (err) throw err;
  });
}

async function fetchByFirstWordToJson() {
  const fileStream = fs.createReadStream(SOURCE_FNAME);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let storeObject = {
    store: [],
  };

  for await (const line of rl) {
    if (line.length > 25) {
      const firstWordFromFile = line.slice(0, 7);
      if (firstWordFromFile === FIRST_WORD) {
        const splittedLine = line.split(/[ ,]+/); // modify this according to your search
        storeObject.store.push({
          key1: splittedLine[0],
          key2: splittedLine[1],
          key3: splittedLine[2],
        });
      }
    }
  }

  storeObjectToJson = JSON.stringify(storeObject);

  console.log(storeObjectToJson);

  // UNCOMMENT THE FUNCTION BELOW IF YOU WANT TO SAVE TO FILE
  // fs.writeFile(STORE_FNAME, storeObjectToJson, "utf8", function (err) {
  //   if (err) throw err;
  //   console.log("data saved");
  // });
}

fetchByFirstWordToJson();
