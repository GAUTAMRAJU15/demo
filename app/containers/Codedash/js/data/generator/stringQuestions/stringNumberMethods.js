function stringWithNumberAnswer() {
  const randomWords = require('random-words');
  const generatedRandomWord = randomWords();
  let evalString = '';
  const variable = `var str = "${generatedRandomWord}";\n`;
  const functions = ['.search(', '.indexOf(', '.match('];
  const selectedFunction =
    functions[Math.floor(Math.random() * functions.length)];
  const initialLimit = Math.floor(
    (Math.random() * generatedRandomWord.length) / 2,
  );
  let result = null;

  const subStr = generatedRandomWord.substring(
    initialLimit,
    Math.floor(Math.random() * generatedRandomWord.length + initialLimit + 1),
  );
  evalString += `${variable}str${selectedFunction}"${subStr}")`;
  result = eval(evalString);
  if (selectedFunction == '.match(') {
    result = result.index;
  }

  let option = new Set();
  while (option.size !== 4) {
    option.add(~~(Math.random() * 4) + 1);
  }

  option.add(result);
  option = [...option];
  option.indexOf(result);
  option.splice(option.indexOf(3), 1, result);
  option = new Set(option);

  return {
    questionTitle: 'Find the result and answer below',
    question: evalString,
    questionType: 'MCQ',
    option: [...option],
    hint: 'Match the position with words',
    hintType: 'POPUP',
    answer: [...option].indexOf(result),
    language: 'JAVASCRIPT',
  };
}

export default stringWithNumberAnswer;
