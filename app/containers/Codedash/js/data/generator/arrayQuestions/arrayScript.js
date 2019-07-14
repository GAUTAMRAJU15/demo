function arrayQuestion(howManyOperations) {
  const choice = ['word', 'string'];
  let evalString = '';
  const wordOrString = choice[Math.floor(Math.random() * choice.length)];
  const operations = ['.push(', '.pop()'];
  if (wordOrString == 'word') {
    var seeding = Math.floor(Math.random() * 5 + 2);
    const randomWords = require('random-words');
    var initialArray = [];
    for (var i = 0; i < seeding; i++) {
      initialArray.push(`"${randomWords()}"`);
    }
    evalString += `var array = [${initialArray}];\n`;
    for (var i = 0; i < howManyOperations; i++) {
      var generatedOperations =
        operations[Math.floor(Math.random() * operations.length)];
      switch (generatedOperations) {
        case '.push(':
          evalString += `array${generatedOperations}"${randomWords()}");\n`;
          break;
        case '.unshift(':
          evalString += `array${generatedOperations}"${randomWords()}");\n`;
          break;
        case '.pop()':
          evalString += `array${generatedOperations};\n`;
          break;
        case '.shift()':
          evalString += `array${generatedOperations};\n`;
          break;
      }
    }
    // console.log("if",evalString,"if");
  } else {
    var seeding = Math.floor(Math.random() * 5 + 2);
    seeding = seeding > howManyOperations ? seeding : howManyOperations + 1;
    var initialArray = [];
    for (var i = 0; i < seeding; i++) {
      initialArray.push(Math.floor(Math.random() * 100));
    }
    evalString += `var array = [${initialArray}];\n`;
    for (var i = 0; i < howManyOperations; i++) {
      var generatedOperations =
        operations[Math.floor(Math.random() * operations.length)];
      switch (generatedOperations) {
        case '.push(':
          evalString += `array${generatedOperations}${Math.floor(
            Math.random() * 100,
          )});\n`;
          break;
        case '.unshift(':
          evalString += `array${generatedOperations}${Math.floor(
            Math.random() * 100,
          )});\n`;
          break;
        case '.pop()':
          evalString += `array${generatedOperations};\n`;
          break;
        case '.shift()':
          evalString += `array${generatedOperations};\n`;
          break;
      }
    }
    // console.log("else",evalString,"else");
  }
  const tempString = `${evalString}array`;
  const result = eval(tempString);
  const option1 = [...result];
  const option2 = [...result]; // result
  const option3 = [...result];
  const option4 = [...result];
  const options = [];
  option1.push(23);
  option3.pop();
  option3.pop();
  option4.push(34);
  option4.length = 0;
  const option = [
    `[${option1}]`,
    `[${option2}]`,
    `[${option3}]`,
    `[${option4}]`,
  ];

  const nums = new Set();
  while (nums.size !== option.length)
    nums.add(~~(Math.random() * option.length));

  const OPTION_PICKER = [...nums];
  for (const i of OPTION_PICKER) {
    options.push(option[i]);
  }

  return {
    questionTitle: 'Find the Array output below',
    question: evalString,
    questionType: 'MCQ',
    option: options,
    hint: 'Match the position with words',
    hintType: 'POPUP',
    answer: options.indexOf(`[${result}]`),
    language: 'JAVASCRIPT',
  };
}

function arrayWithIntegerOutput(howManyExpressions, wordOrString) {
  if (wordOrString == 'word') {
    var operations = ['.push(', '.pop()', '.shift()', '.unshift('];
    var seeding = Math.floor(Math.random() * 5 + 2);
    seeding = seeding > howManyOperations ? seeding : howManyOperations + 1;
    const randomWords = require('random-words');
    var initialArray = [];
    for (var i = 0; i < seeding; i++) {
      initialArray.push(`"${randomWords()}"`);
    }
    evalString += `var array = [${initialArray}];\n`;
    for (var i = 0; i < howManyOperations; i++) {
      var generatedOperations =
        operations[Math.floor(Math.random() * operations.length)];
      switch (generatedOperations) {
        case '.push(':
          evalString += `array${generatedOperations}"${randomWords()}");\n`;
          break;
        case '.unshift(':
          evalString += `array${generatedOperations}"${randomWords()}");\n`;
          break;
        case '.pop()':
          evalString += `array${generatedOperations};\n`;
          break;
        case '.shift()':
          evalString += `array${generatedOperations};\n`;
          break;
      }
    }
  } else {
    var operations = ['.push(', '.pop()', '.shift()', '.unshift('];
    var seeding = Math.floor(Math.random() * 5 + 2);
    seeding = seeding > howManyOperations ? seeding : howManyOperations + 1;
    var initialArray = [];
    for (var i = 0; i < seeding; i++) {
      initialArray.push(Math.floor(Math.random() * 100));
    }
    evalString += `var array = [${initialArray}];\n`;
    for (var i = 0; i < howManyOperations; i++) {
      var generatedOperations =
        operations[Math.floor(Math.random() * operations.length)];
      switch (generatedOperations) {
        case '.push(':
          evalString += `array${generatedOperations}${Math.floor(
            Math.random() * 100,
          )});\n`;
          break;
        case '.unshift(':
          evalString += `array${generatedOperations}${Math.floor(
            Math.random() * 100,
          )});\n`;
          break;
        case '.pop()':
          evalString += `array${generatedOperations};\n`;
          break;
        case '.shift()':
          evalString += `array${generatedOperations};\n`;
          break;
      }
    }
  }
}
// arrayQuestion(2);

export default arrayQuestion;
