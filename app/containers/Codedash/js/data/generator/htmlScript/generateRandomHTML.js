const tagsToUse = [
  'div',
  'p',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'img',
  'ul',
  'ol',
  'i',
];
const nestingRules = {
  div: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  p: ['a', 'b', 'i', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  a: ['img'],
};
const nestedTags = Object.keys(nestingRules);

const questionRules = {
  a: 'Complete the code to make a hyperlink',
  p: 'complete the code to make a paragraph',
  div: 'complete the code to make a division in the webpage',
  h1: 'complete the code to make a heading of level 1',
  h2: 'complete the code to make a heading of level 2',
  h3: 'complete the code to make a heading of level 3',
  h4: 'complete the code to make a heading of level 4',
  h5: 'complete the code to make a heading of level 5',
  h6: 'complete the code to make a heading of level 6',
  img: 'complete the code to add an image',
  b: `bold the word`,
  u: 'underline the word',
  em: 'emphasise the word',
  sub: 'subscript the word',
  sup: 'superscript the word',
};

const formattingTags = ['b', 'u', 'em', 'sub', 'sup'];

function generateQuestion() {
  const parentNodeToAppend = document.getElementById('question');
  let questionString = '';
  let answer = '';
  const subParentTag =
    nestedTags[Math.floor(Math.random() * nestedTags.length)];
  // console.log(subParentTag);
  const subParentNode = document.createElement(subParentTag.toUpperCase());
  var textNode = document.createTextNode('Hello');
  const questionTag =
    nestingRules[subParentTag][
      Math.floor(Math.random() * nestingRules[subParentTag].length)
    ];
  // console.log(questionTag);
  const questionNode = document.createElement(questionTag.toUpperCase());
  if (questionTag == 'img') {
    questionNode.setAttribute('src', 'myPic.jpg');
  }
  if (subParentTag == 'a') {
    subParentNode.setAttribute('href', 'https://www.google.com');
  }
  if (questionTag == 'a') {
    questionNode.setAttribute('href', 'https://www.google.com');
  }
  // console.log(questionNode);
  subParentNode.innerHTML += '\n\t\t';
  var textNode = document.createTextNode(
    'CampK12 teaches future technologies.',
  );
  questionNode.appendChild(textNode);
  subParentNode.appendChild(questionNode);
  subParentNode.innerHTML += '\n\t';
  parentNodeToAppend.innerHTML += '\n\t';
  parentNodeToAppend.appendChild(subParentNode);
  const questionArray = [];
  [...parentNodeToAppend.childNodes].forEach(tag => {
    tag.tagName && questionArray.push(tag);
  });
  [...subParentNode.childNodes].forEach(tag => {
    tag.tagName && questionArray.push(tag);
  });
  const toReplace = questionArray[
    Math.floor(Math.random() * questionArray.length)
  ].tagName.toLowerCase();
  // console.log(toReplace);
  questionString = parentNodeToAppend.innerHTML;
  const opt = Math.floor(Math.random() * 2);
  questionString =
    opt == 0
      ? questionString.replace(`<${toReplace}>`, '< __ >')
      : questionString.replace(`</${toReplace}>`, '</ __ >');
  questionString += `\n\n${questionRules[toReplace]}`;
  answer = toReplace;
  console.log(questionString);
  return [questionString, answer];
}

function generateFormatingQuestions() {
  const str = 'CampK12 teaches future technologies.';
  const stringArray = str.split(' ');
  const parentNodeToAppend = document.getElementById('question');
  let subParentTag;
  let questionString = '';
  let answer = '';
  const indexToModify = Math.floor(Math.random() * stringArray.length);
  for (let i = 0; i < stringArray.length; i++) {
    if (i == indexToModify) {
      subParentTag =
        formattingTags[Math.floor(Math.random() * formattingTags.length)];
      const subParentNode = document.createElement(subParentTag.toUpperCase());
      const textNode = document.createTextNode(` ${stringArray[i]} `);
      subParentNode.appendChild(textNode);
      parentNodeToAppend.appendChild(subParentNode);
      parentNodeToAppend.innerHTML += ' ';
    } else {
      const text = document.createTextNode(`${stringArray[i]} `);
      parentNodeToAppend.appendChild(text);
    }
  }
  questionString = parentNodeToAppend.innerHTML;
  const opt = Math.floor(Math.random() * 2);
  console.log(opt);
  questionString =
    opt == 0
      ? questionString.replace(`<${subParentTag}>`, '< __ >')
      : questionString.replace(`</${subParentTag}>`, '</ __ >');
  answer = subParentTag;
  console.log(questionString);
  return [questionString, answer];
}
console.log(generateQuestion());
console.log(generateFormatingQuestions());
