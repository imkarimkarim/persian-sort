"use strict";

const { alphabet } = require("./alphabet");

const compare = (a, b) => {
  if (alphabet[a] > alphabet[b]) {
    return true;
  }
  if (alphabet[a] < alphabet[b]) {
    return false;
  }
  return false;
};

// TODO: pSort

// TODO: checking inputs
// TODO: module...
// TODO: groupByFirstLetter
// TODO: sortGroup
// TODO: share/packaging
// TODO: readme
