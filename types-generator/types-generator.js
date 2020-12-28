/*
This script allows the user to generate types according to different development needs in a React-Redux app.
The scripts consoles out the types and also appends the results to a file named types.txt to have the types in file-format.
If you want this functionality, simply uncomment the file section.
Example usage:
for CRUD operation on users, posts and comments, see the included FEEDER

 */

const fs = require("fs");
const STORE_FNAME = "types_demo.txt";
const TEMPLATE = "export const";
const FEEDER = {
  /* this is the main data store, which can be edited depending on the needs
  for example if you only need CR on a particular key, you would enter
  key: "CR"
  verbs can be changed depending on what you want for ending type
  some examples:
  R: "FETCH" or R: "GET", etc.
  */
  user: "CR", // only create and read
  users: "CRUD",
  posts: "CR", // only create and read
  post: "CRUD",
  comments: "CRUD",
  account: "D", // only delete
};

const VERBS = {
  C: "ADD",
  R: "FETCH",
  U: "EDIT",
  D: "DELETE",
};

function crudOps(actions, key, store) {
  const singles = actions.split("");
  for (action of singles) {
    const currentType = `${TEMPLATE} ${
      VERBS[action]
    }_${key.toUpperCase()} = \'${VERBS[action]}_${key.toUpperCase()}\';`;
    store.push(currentType);
  }
  return store;
}

function storeData(data) {
  fs.appendFile(STORE_FNAME, data, (err) => {
    if (err) throw err;
  });
}

let storedTypes = [];
for (key in FEEDER) {
  storedTypes = crudOps(FEEDER[key], key, storedTypes);
}
storedTypes.sort();
for (type of storedTypes) {
  console.log(type);

  // UNCOMMENT THIS IF YOU WANT TO SAVE TO FILE
  // storeData(`${type}\n`);
}
