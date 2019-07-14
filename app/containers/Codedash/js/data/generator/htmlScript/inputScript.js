function generateInputFillIn(whatToReplace, fieldType) {
  const whatToInput = ['input', 'type', 'typeValue'];
  const typeValue = ['text', 'number', 'email'];
  const replaceString =
    whatToReplace ||
    whatToInput[Math.floor(Math.random() * whatToInput.length)];
  const whichInputType =
    fieldType || typeValue[Math.floor(Math.random() * typeValue.length)];
  let answer;
  let finalString = '<form>\n';
  let question = '';

  finalString += "\t<input type = 'typeValue' id = 'myElement'>";
  finalString = finalString.replace(replaceString, ' __ ');
  finalString += '\n</form>';
  if (replaceString == 'typeValue') {
    question = `Fill in the blank to make a ${whichInputType} field.`;
    answer = whichInputType;
  } else {
    finalString = finalString.replace('typeValue', whichInputType);
    question = `Fill in the blank to make a ${whichInputType} field.`;
    answer = replaceString;
  }
  return {
    questionTitle: question,
    questionType: 'FITB',
    questionPart2: `${finalString}`,
    numberOfBlanks: 1,
    hint: 'They all belong to input tag properties :)',
    hintType: 'POPUP',
    answer,
    language: 'HTML',
  };
}

export default generateInputFillIn;
