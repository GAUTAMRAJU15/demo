function mathFunctionQuestions(
  howManyExpressions,
  withVariable,
  howManyVariables,
) {
  const functions = [
    'Math.round(',
    'Math.pow(',
    'Math.sqrt(',
    'Math.ceil(',
    'Math.floor(',
    'Math.abs(',
    'Math.min(',
    'Math.max(',
  ];
  const operators = ['+', '-'];
  let evalString = '';
  let count = 0;

  // building expressions
  for (let i = 0; i < howManyExpressions; i++) {
    const selectedFunction =
      functions[Math.floor(Math.random() * functions.length)];
    switch (selectedFunction) {
      case 'Math.round(':
        evalString += `${selectedFunction + (Math.random() * 10).toFixed(2)})`;
        break;
      case 'Math.pow(':
        evalString += `${selectedFunction +
          Math.floor(Math.random() * 10 + 1)},${Math.floor(
          Math.random() * 3 + 1,
        )})`;
        break;
      case 'Math.sqrt(':
        evalString += `${selectedFunction +
          Math.pow(Math.floor(Math.random() * 10 + 1), 2)})`;
        break;
      case 'Math.ceil(':
        evalString += `${selectedFunction + (Math.random() * 10).toFixed(2)})`;
        break;
      case 'Math.floor(':
        evalString += `${selectedFunction + (Math.random() * 10).toFixed(2)})`;
        break;
      case 'Math.abs(':
        evalString += `${selectedFunction + Math.floor(Math.random() * -10)})`;
        break;
      case 'Math.min(': {
        var toSelectNumbers = Math.floor(Math.random() * 5 + 1);
        var selectedNumbers = [];
        for (let j = 0; j < toSelectNumbers; j++) {
          selectedNumbers.push(Math.floor(Math.random() * 10));
        }
        evalString += `${selectedFunction + selectedNumbers})`;
        break;
      }
      case 'Math.max(': {
        var toSelectNumbers = Math.floor(Math.random() * 5 + 1);
        var selectedNumbers = [];
        for (let j = 0; j < toSelectNumbers; j++) {
          selectedNumbers.push(Math.floor(Math.random() * 10));
        }
        evalString += `${selectedFunction + selectedNumbers})`;
        break;
      }
    }
    evalString += ' ';
    count++;
    if (count < howManyExpressions) {
      evalString += `${
        operators[Math.floor(Math.random() * operators.length)]
      } `;
    }
  }
  const result = eval(evalString);
  evalString = `var output = ${evalString};\nconsole.log(output);`;
  return [evalString, result];
}

function chainedMathFunctions(howMuchChaining, howManyExpressions) {
  const functions = ['Math.pow(', 'Math.abs(', 'Math.min(', 'Math.max('];
  const compatibleFunctions = [
    [
      'Math.floor(',
      'Math.ceil(',
      'Math.round(',
      'Math.max(',
      'Math.min(',
      'Math.sqrt(',
      'Math.abs(',
    ],
    ['Math.pow('],
    ['Math.pow('],
    ['Math.pow('],
    ['Math.floor(', 'Math.ceil(', 'Math.pow('],
    [
      'Math.round(',
      'Math.pow(',
      'Math.sqrt(',
      'Math.ceil(',
      'Math.floor(',
      'Math.abs(',
      'Math.min(',
      'Math.max(',
    ],
    [
      'Math.round(',
      'Math.pow(',
      'Math.sqrt(',
      'Math.ceil(',
      'Math.floor(',
      'Math.abs(',
      'Math.min(',
      'Math.max(',
    ],
  ];

  let evalString = '';
  const index = Math.floor(Math.random() * functions.length);
  const selectedFunction = functions[index];
  switch (selectedFunction) {
    case 'Math.pow(':
      evalString += `${selectedFunction} ${returnParameter(
        compatibleFunctions[0][
          Math.floor(Math.random() * compatibleFunctions[0].length)
        ],
      )}, ${returnParameter(
        compatibleFunctions[0][
          Math.floor(Math.random() * compatibleFunctions[1].length)
        ],
      )} )`;
      break;
    case 'Math.sqrt(':
      evalString += `${selectedFunction +
        Math.pow(Math.floor(Math.random() * 10 + 1), 2)})`;
      break;
    case 'Math.ceil(':
      evalString += `${selectedFunction + (Math.random() * 10).toFixed(2)})`;
      break;
    case 'Math.floor(':
      evalString += `${selectedFunction + (Math.random() * 10).toFixed(2)})`;
      break;
    case 'Math.abs(':
      evalString += `${selectedFunction} ${returnParameter(
        compatibleFunctions[4][
          Math.floor(Math.random() * compatibleFunctions[4].length)
        ],
      )} )`;
      break;
    case 'Math.min(': {
      var toSelectNumbers = Math.floor(Math.random() * 5 + 2);
      var selectedNumbers = [];
      var innerString = '';
      for (let j = 0; j < toSelectNumbers; j++) {
        innerString += returnParameter(
          compatibleFunctions[4][
            Math.floor(Math.random() * compatibleFunctions[4].length)
          ],
        );
        if (j + 1 != toSelectNumbers) {
          innerString += ', ';
        }
      }
      evalString += `${selectedFunction} ${innerString} )`;
      break;
    }
    case 'Math.max(': {
      var toSelectNumbers = Math.floor(Math.random() * 5 + 2);
      var selectedNumbers = [];
      var innerString = '';
      for (let j = 0; j < toSelectNumbers; j++) {
        innerString += returnParameter(
          compatibleFunctions[4][
            Math.floor(Math.random() * compatibleFunctions[4].length)
          ],
        );
        if (j + 1 != toSelectNumbers) {
          innerString += ', ';
        }
      }
      evalString += `${selectedFunction + innerString})`;
      break;
    }
  }
  evalString += ' ';
  const result = eval(evalString);
  evalString = `var output = ${evalString};\nconsole.log(output);`;
  console.log(evalString);
}

function returnParameter(selectedFunction) {
  const functions = [
    'Math.round(',
    'Math.pow(',
    'Math.sqrt(',
    'Math.ceil(',
    'Math.floor(',
    'Math.abs(',
    'Math.min(',
    'Math.max(',
  ];
  let evalString = '';
  // console.log(selectedFunction);
  switch (selectedFunction) {
    case 'Math.round(':
      evalString += `${selectedFunction + (Math.random() * 10).toFixed(2)})`;
      break;
    case 'Math.pow(':
      evalString += `${selectedFunction +
        Math.floor(Math.random() * 10 + 1)},${Math.floor(
        Math.random() * 3 + 1,
      )})`;
      break;
    case 'Math.sqrt(':
      evalString += `${selectedFunction +
        Math.pow(Math.floor(Math.random() * 10 + 1), 2)})`;
      break;
    case 'Math.ceil(':
      evalString += `${selectedFunction + (Math.random() * 10).toFixed(2)})`;
      break;
    case 'Math.floor(':
      evalString += `${selectedFunction + (Math.random() * 10).toFixed(2)})`;
      break;
    case 'Math.abs(':
      evalString += `${selectedFunction + Math.floor(Math.random() * -10)})`;
      break;
    case 'Math.min(': {
      var toSelectNumbers = Math.floor(Math.random() * 5 + 1);
      var selectedNumbers = [];
      for (let j = 0; j < toSelectNumbers; j++) {
        selectedNumbers.push(Math.floor(Math.random() * 10));
      }
      evalString += `${selectedFunction + selectedNumbers})`;
      break;
    }
    case 'Math.max(': {
      var toSelectNumbers = Math.floor(Math.random() * 5 + 1);
      var selectedNumbers = [];
      for (let j = 0; j < toSelectNumbers; j++) {
        selectedNumbers.push(Math.floor(Math.random() * 10));
      }
      evalString += `${selectedFunction + selectedNumbers})`;
      break;
    }
  }
  return evalString;
}

chainedMathFunctions();

mathFunctionQuestions(3);
