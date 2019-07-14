function generateHTMLTableQuestion(numberOfCellInRow, numberOfRows, whatToAsk) {
  var numberOfRows = numberOfRows || Math.floor(Math.random() * 3 + 1);
  var numberOfCellInRow =
    numberOfCellInRow || Math.floor(Math.random() * 3 + 1);
  const dataForTable = [
    ['Rows', numberOfRows],
    ['Cells', numberOfCellInRow * numberOfRows],
    ['Columns', numberOfCellInRow],
  ];
  const question = whatToAsk || Math.floor(Math.random() * 3);
  const answer = dataForTable[question][1];

  const ques = `How many ${
    dataForTable[question][0]
  } are there in the table below?\n `;
  let finalString = '';
  for (let i = 0; i < numberOfRows; i++) {
    finalString += '<table>\n\t<tr>\n\t\t';
    for (let j = 0; j < numberOfCellInRow; j++) {
      finalString += '<td>..</td> ';
    }
    finalString += '\n\t</tr>\n';
  }
  finalString += '</table>\n';

  const option = new Set();
  while (option.size !== 4) {
    option.add(~~(Math.random() * 4) + 1);
  }

  option.add(Number(answer));
  const opt = [...option];
  if (opt.length === 5) {
    opt.splice(opt.indexOf(2), 1);
  }

  return {
    questionTitle: ques,
    question: finalString,
    questionType: 'MCQ',
    questionPart2: '',
    option: opt,
    hint: 'tr stands for table row & td stands for table data',
    hintType: 'POPUP',
    answer: opt.indexOf(Number(answer)),
    language: 'HTML',
  };
}

export default generateHTMLTableQuestion;
