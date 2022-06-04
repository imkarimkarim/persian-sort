"use strict";

const { alphabet } = require("./alphabet");

const isInAlphabet = (letter) => {
  if (!letter) {
    return false;
  }
  letter = letter.toString();
  if (alphabet[letter[0]] === undefined) {
    return false;
  }
  return true;
};

// returns(1/-1) are based on official .sort() "compare" option
const alphabetCompare = (a, b) => {
  if (!isInAlphabet(a) || !isInAlphabet(b)) {
    if (isInAlphabet(a)) {
      return -1;
    }
    if (isInAlphabet(b)) {
      return 1;
    }
  }
  if (alphabet[a] > alphabet[b]) {
    return 1;
  }
  if (alphabet[a] < alphabet[b]) {
    return -1;
  }
  return -1;
};

// will sorting till 3Letters! (maybe change/opt it later...)
const wordCompare = (a, b) => {
  if (a.length === 1 && b.length > 1) {
    return -1;
  }
  if (b.length === 1 && a.length > 1) {
    return 1;
  }
  if (a.length === 1 && b.length === 1) {
    return alphabetCompare(a[0], b[0]);
  }
  // all the first letters by here will be equal(groupByFirstLetter)
  if (a[1] === b[1] && a.length >= 3 && b.length >= 3) {
    return alphabetCompare(a[2], b[2]);
  }
  if (a.length >= 2 && b.length >= 2) {
    if (a[1] === b[1]) {
      if ((a.length === 2 || b.length === 2) && a.length < b.length) {
        return -1;
      }
      return 1;
    }
    return alphabetCompare(a[1], b[1]);
  }
};

const groupByFirstLetter = (list) => {
  if (!list) {
    return false;
  }
  let groups = {
    persian: {},
    other: [],
  };
  for (let i = 0; i < list.length; i++) {
    let word = list[i];
    // fL stands for first letter of the word
    let fL = word[0];
    if (isInAlphabet(fL)) {
      if (groups.persian[fL] === undefined) {
        groups.persian[fL] = [word];
      } else {
        groups.persian[fL].push(word);
      }
    } else {
      groups.other.push(word);
    }
  }
  return groups;
};

const sortTheGroups = (groups) => {
  if (!groups) {
    return false;
  }
  return Object.keys(groups)
    .sort(alphabetCompare)
    .reduce((res, key) => {
      res[key] = groups[key];
      return res;
    }, {});
};

const sortGroupItems = (group) => {
  if (!group) {
    return false;
  }
  return group.sort(wordCompare);
};

// main function
const pSort = (wordsList) => {
  if (!wordsList) {
    return false;
  }
  wordsList = groupByFirstLetter(wordsList);
  let persianList = wordsList.persian;
  let otherList = wordsList.other;
  persianList = sortTheGroups(persianList);

  let tmp = [];
  for (const key in persianList) {
    persianList[key] = sortGroupItems(persianList[key]);
    for (let i = 0; i < persianList[key].length; i++) {
      tmp.push(persianList[key][i]);
    }
  }
  otherList = otherList.sort();

  return [...tmp, ...otherList];
};

const testArr = [
  "Yazd",
  "yazd",
  "یزد",
  "جادی",
  "ریکت",
  "گوگل",
  "اسلایمم",
  "ع",
  "عمه",
  "رامین",
  "",
  "خدیجه",
  "ه",
  "خ",
  "x",
  ",",
  "?",
  "خاله",
  "مهشید",
  "مهشدی",
  "karim",
  "w",
  1,
  2,
  3,
  3,
  4,
];

console.log(pSort(testArr));

// TODO: pSort
// TODO: module...
// TODO: share/packaging
// TODO: readme
