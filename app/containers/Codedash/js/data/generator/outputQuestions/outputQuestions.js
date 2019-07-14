function simpleOutputQuestion(
  howManyExpressions,
  withVariable,
  howManyVariables,
) {
  const operators = ['+', '-', '*'];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const selectedNumbers = [];
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';
  const selectedVariables = [];
  let evalString = '';
  let count = 0;
  let stringToCompute = '';
  let tempString = '';

  if (withVariable) {
    for (var i = 0; i < howManyVariables; i++) {
      selectedVariables.push(alphabets[i]);
      selectedNumbers.push(numbers[Math.floor(Math.random() * 10)]);
      evalString += `var ${selectedVariables[i]} = ${selectedNumbers[i]};\n`;
    }
    // building expressions
    for (var i = 0; i < howManyExpressions; i++) {
      stringToCompute += `(${
        selectedVariables[Math.floor(Math.random() * selectedVariables.length)]
      } `;
      stringToCompute += `${
        operators[Math.floor(Math.random() * operators.length)]
      } `;
      stringToCompute += `${
        selectedVariables[Math.floor(Math.random() * selectedVariables.length)]
      }) `;
      count++;
      if (howManyExpressions > count) {
        stringToCompute += `${
          operators[Math.floor(Math.random() * operators.length)]
        } `;
      }
    }
  } else {
    for (var i = 0; i < howManyExpressions; i++) {
      stringToCompute += `(${
        numbers[Math.floor(Math.random() * numbers.length)]
      } `;
      stringToCompute += `${
        operators[Math.floor(Math.random() * operators.length)]
      } `;
      stringToCompute += `${
        numbers[Math.floor(Math.random() * numbers.length)]
      }) `;
      count++;
      if (howManyExpressions > count) {
        stringToCompute += `${
          operators[Math.floor(Math.random() * operators.length)]
        } `;
      }
    }
  }
  tempString = evalString + stringToCompute;
  evalString += `var output = ${stringToCompute}`;
  result = eval(tempString);
  evalString += '\nconsole.log(output)';
  console.log(evalString);
  return [evalString, result];
}

simpleOutputQuestion(100, true, 26);
