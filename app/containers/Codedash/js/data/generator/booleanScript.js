function generateQuestion(howManyVariables, howManyExpressions) {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';
  const variables = [];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const selectedNumbers = [];
  const operators = ['>', '<', '<=', '>=', '==', '!='];
  const connector = ['&&', '||'];
  let evalString = '';
  let ifString = '';
  let correctAnswer = '';
  let count = 0;

  for (var i = 0; i < howManyVariables; i++) {
    variables.push(alphabets[i]);
  }
  for (var i = 0; i < howManyVariables; i++) {
    selectedNumbers.push(numbers[Math.floor(Math.random() * 10)]);
  }
  for (var i = 0; i < howManyVariables; i++) {
    evalString += `var ${variables[i]} = ${selectedNumbers[i]};\n`;
  }
  for (var i = 0; i < howManyExpressions; i++) {
    ifString += `(${variables[Math.floor(Math.random() * variables.length)]} `;
    ifString += `${operators[Math.floor(Math.random() * operators.length)]} `;
    ifString += `${variables[Math.floor(Math.random() * variables.length)]}) `;
    count++;
    if (howManyExpressions > count) {
      ifString += `${connector[Math.floor(Math.random() * 2)]} `;
    }
  }
  evalString += ifString;
  correctAnswer = eval(evalString);
  evalString += ' = ?';
  const option = ['true', 'false'];

  return {
    questionTitle: 'Answer true or false',
    question: evalString,
    questionType: 'MCQ',
    option,
    hint: 'Apply operators knowledge',
    hintType: 'POPUP',
    answer: option.indexOf(`${correctAnswer}`),
    language: 'PYTHON',
  };
}

export default generateQuestion;
