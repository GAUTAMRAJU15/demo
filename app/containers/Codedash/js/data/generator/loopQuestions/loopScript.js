function generateLoopOutput(howMuchNesting) {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';
  const selectedVariables = [];
  let evalString = 'var count = 0;\n';
  const selectedNumbers = [];
  for (var i = 0; i < howMuchNesting; i++) {
    selectedVariables.push(alphabets[i]);
    selectedNumbers.push(Math.floor(Math.random() * 10));
  }
  for (var i = 0; i < howMuchNesting; i++) {
    evalString += `for(var ${selectedVariables[i]} = 0; ${
      selectedVariables[i]
    } < ${selectedNumbers[i]}; ${selectedVariables[i]}++){\n`;
    for (var j = 0; j <= i; j++) {
      evalString += '\t';
    }
  }
  evalString += `count++;\n`;
  for (var i = howMuchNesting; i > 0; i--) {
    for (var j = 0; j < i - 1; j++) {
      evalString += '\t';
    }
    evalString += `}\n`;
  }
  const tempString = `${evalString}count`;
  const result = eval(tempString);
  evalString += 'console.log(count);';

  return [evalString, result];
}

generateLoopOutput(3);
