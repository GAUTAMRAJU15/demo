import css_defs_questions from './cssKeyword';

class QuestionGenerator {
  constructor() {
    this.DIFFICULTY_EASY = 1;
    this.DIFFICULTY_MEDIUM = 2;
    this.DIFFICULTY_HARD = 3;

    this.CSSPropsWithNumericalVals = [
      'margin',
      'color',
      'padding',
      'border',
      'width',
      'height',
    ];

    this.PROPS_MAP = {
      margin: [
        { name: 'margin-top', range: [0, 20] },
        { name: 'margin-right', range: [0, 20] },
        { name: 'margin-bottom', range: [0, 20] },
        { name: 'margin-left', range: [0, 20] },
      ],
      color: [
        { name: 'red color component', range: [0, 255] },
        { name: 'green color component', range: [0, 255] },
        { name: 'blue color component', range: [0, 255] },
      ],
      padding: [
        { name: 'padding-top', range: [0, 20] },
        { name: 'padding-right', range: [0, 20] },
        { name: 'padding-bottom', range: [0, 20] },
        { name: 'padding-left', range: [0, 20] },
      ],
      border: [
        { name: 'border-top', range: [0, 20] },
        { name: 'border-right', range: [0, 20] },
        { name: 'border-bottom', range: [0, 20] },
        { name: 'border-left', range: [0, 20] },
      ],
      width: [{ name: 'width', range: [0, 20] }],
      height: [{ name: 'height', range: [0, 20] }],
    };
  }

  getQuestion(usernameOptional) {
    const QUESTION_TYPES = [
      'Arithmetic',
      'BooleanAlgebra',
      'StringType1',
      'StringType2',
      'CSSDefinitions',
      'CSSPropertyExtraction',
    ];
    const type = this._pickRandomElementFromList(QUESTION_TYPES);

    switch (type) {
      case 'Arithmetic':
        return this.getArithmeticQuestion();
      case 'BooleanAlgebra':
        return this.getBooleanAlgebraQuestion();
      case 'StringType1':
        return this.getStringQuestionWithNumericalAnswer(usernameOptional);
      case 'StringType2':
        return this.getStringQuestionWithStringAnswer(usernameOptional);
      case 'CSSDefinitions':
        return this.getCSSDefinitionsQuestion();
      case 'CSSPropertyExtraction':
        return this.getCSSPropertyExtractionQuestion();
    }
  }

  getArithmeticQuestion() {
    const numOperands = Math.floor(Math.random() * 3) + 2; // between 2 and 4
    let equation = this._generateRandomArithmeticQuestion(numOperands);
    const answers = this._generateAnswersForArithmeticQuestion(equation);
    const correct_answer = answers[0];
    let diff;

    this._shuffleArray(answers);
    equation += ' = ?';

    if (numOperands == 2) diff = this.DIFFICULTY_EASY;
    else if (numOperands == 3) diff = this.DIFFICULTY_MEDIUM;
    else if (numOperands == 4) diff = this.DIFFICULTY_HARD;

    return {
      questionString: equation,
      answersList: answers,
      correctAnswer: correct_answer,
      difficulty: diff,
    };
  }

  getBooleanAlgebraQuestion() {
    const numVars = Math.floor(Math.random() * 3) + 2; // between 2 and 4

    const NUM_EXPRESSIONS_SPACE = {
      // the rows are # vars, the cols are options for # expressions
      2: [1, 2],
      3: [2, 3],
      4: [2, 3, 4],
    };

    const numExpressions = this._pickRandomElementFromList(
      NUM_EXPRESSIONS_SPACE[numVars],
    );

    return this._generateBooleanAlgebraQuestion(numVars, numExpressions);
  }

  getStringQuestionWithNumericalAnswer(usernameWord) {
    const numExpressions = this._pickRandomElementFromList([1, 2, 3]);
    return this._generateStringQuestionWithNumberAnswer(
      numExpressions,
      usernameWord,
    );
  }

  getStringQuestionWithStringAnswer(usernameWord) {
    const numExpressions = this._pickRandomElementFromList([1, 2, 3]);
    return this._generateStringQuestionWithStringAnswer(
      numExpressions,
      usernameWord,
    );
  }

  getCSSDefinitionsQuestion() {
    return this._generateCSSDefininitionQuestion();
  }

  getCSSPropertyExtractionQuestion() {
    const numProps = Math.floor(Math.random() * 4) + 2; // rand num between 2 and 5
    return this._generateCSSPropertyExtractionQuestion(numProps);
  }

  _generateCSSDefininitionQuestion() {
    // This function generates a random question along witht he correct answer and 3 other wrong answers
    // the correct answer is currently always present at the first option. This needs to be shuffled.

    // topic no gives the index of selected topic from the array css_defs_questions
    const topic_no = Math.round(
      Math.random() * (css_defs_questions.length - 1),
    );

    // now randomly select a question(or more specifically, the number of index for that particular element)
    const question_index = Math.round(
      Math.random() * (css_defs_questions[topic_no].Q.length - 1),
    );

    // get the value of question in variable questions
    let question = css_defs_questions[topic_no].Q[question_index];

    // get the value of answer, corrsponding to question variable in variable answer
    const answer = css_defs_questions[topic_no].A[question_index];

    // a_options contains options for the questions including the correct answer, which is always in the first place
    const answer_options = [];
    answer_options.push(answer);

    // length_ans contains length of A array corresponfing to that particular topic.
    const length_ans = css_defs_questions[topic_no].A.length;

    let count = 0;

    while (count != 3) {
      const option =
        css_defs_questions[topic_no].A[
          Math.round(Math.random() * (length_ans - 1))
        ];
      let added = false;
      for (const i of answer_options) {
        if (i == option) {
          added = true;
        }
      }
      if (added) {
        continue;
      } else {
        answer_options.push(option);
      }
      count++;
    }

    const correct_answer = answer_options[0];
    this._shuffleArray(answer_options);

    question = `Which CSS property ${question}?`;

    return {
      questionTitle: question,
      question: '',
      questionType: 'MCQ',
      questionPart2: '',
      option: answer_options,
      hint: 'Property is the way you give style to an element',
      hintType: 'POPUP',
      answer: answer_options.indexOf(correct_answer),
      language: 'CSS',
    };
  }

  _generateCSSPropertyExtractionQuestion(numProps) {
    const randomlyChosenProps = this._randomAndUniqueSublistFromList(
      numProps,
      this.CSSPropsWithNumericalVals,
    );
    const propToAskAbout = this._pickRandomElementFromList(randomlyChosenProps);

    let constraintToAskAbout;
    let correctAnswer;
    const answerChoices = [];
    let answerChoicesSpace = [];

    let fullSelector = '<pre>.myElement {\n';
    let propString = '';

    for (const prop of randomlyChosenProps) {
      if (prop == propToAskAbout) {
        propString = '';
        const constraints = this.PROPS_MAP[propToAskAbout];
        constraintToAskAbout = this._pickRandomElementFromList(constraints)
          .name;

        for (let i = 0; i < constraints.length; i++) {
          const constraint = constraints[i];
          const val = this._randNumBetweenInclusive(
            constraint.range[0],
            constraint.range[1],
          );

          if (constraint.name == constraintToAskAbout) {
            correctAnswer = val;
          }

          propString += ` ${val}`;
          answerChoices.push(val);

          if (propToAskAbout == 'color' && i != constraints.length - 1)
            propString += ',';
          else if (propToAskAbout != 'color') propString += 'px';
        }

        if (propToAskAbout == 'color')
          propString = `color: rgb(${propString.trim()});`;
        else propString = `${propToAskAbout}: ${propString.trim()};`;
      } else {
        const randomProps = this._randomValueStringForCSSProperty(prop);
        propString = randomProps.string;
        answerChoicesSpace = answerChoicesSpace.concat(randomProps.values);
      }
      fullSelector += `  ${propString}\n`;
    }

    fullSelector += '}';

    let questionString =
      `${fullSelector}</pre>\n` +
      `What is the ${constraintToAskAbout} for the element above?`;

    questionString = questionString.replace(/\n/g, '<br/>');

    while (answerChoices.length < 4) {
      answerChoices.push(this._pickRandomElementFromList(answerChoicesSpace));
    }

    this._shuffleArray(answerChoices);

    return {
      questionString,
      answersList: answerChoices,
      correctAnswer,
      difficulty: this.DIFFICULTY_EASY,
      topic: 'CSS: Property Extraction',
    };
  }

  _randomValueStringForCSSProperty(selectedProp) {
    const constraints = this.PROPS_MAP[selectedProp];
    let propString = '';
    const vals = [];
    for (let i = 0; i < constraints.length; i++) {
      const constraint = constraints[i];
      const val = this._randNumBetweenInclusive(
        constraint.range[0],
        constraint.range[1],
      );

      propString += ` ${val}`;
      vals.push(val);

      if (selectedProp == 'color' && i != constraints.length - 1)
        propString += ',';
      else if (selectedProp != 'color') propString += 'px';
    }

    if (selectedProp == 'color')
      propString = `color: rgb(${propString.trim()});`;
    else propString = `${selectedProp}: ${propString.trim()};`;

    return { string: propString, values: vals };
  }

  _randomAndUniqueSublistFromList(sublistSize, list) {
    // to avoid gettinig stuck in an inifinite loop
    if (sublistSize > list.length) {
      return list;
    }

    const sublist = [];

    while (true) {
      const tryAddingThisItem = this._pickRandomElementFromList(list);

      if (!sublist.includes(tryAddingThisItem)) sublist.push(tryAddingThisItem);

      if (sublist.length >= sublistSize) return sublist;
    }
  }

  _generateStringQuestionWithNumberAnswer(numExpressions, wordToUse) {
    let word = wordToUse || 'Code Battles';
    if (word.length <= 4) word = 'Code Battles';

    let evalString = `var word = "${word}";\n`;
    let htmlString = `var word = "${word}";\n\n<br/><br/><b>Evaluate the following expression:</b><br/>\n`;

    const functionOptions = ['indexOf', 'length'];
    const connectingOperations = ['+', '-', '*'];

    let selectedFn;
    let connectingOp;

    for (var i = 0; i < numExpressions; i++) {
      if (i != 0) {
        connectingOp = this._pickRandomElementFromList(connectingOperations);
        evalString += ` ${connectingOp} `;
        htmlString += ` ${connectingOp} `;
      }
      selectedFn = this._pickRandomElementFromList(functionOptions);

      switch (selectedFn) {
        case 'indexOf':
          var rand_substring = this._getRandomSubstring(word);
          evalString += `word.indexOf("${rand_substring}")`;
          htmlString += `word.indexOf("${rand_substring}")`;
          break;

        case 'length':
          evalString += 'word.length';
          htmlString += 'word.length';
          break;
      }
    }

    const correctAnswer = eval(evalString);

    // generate answers
    const answers = [];

    answers.push(correctAnswer);

    let randAnswer;
    const max = correctAnswer + 30;
    const min = correctAnswer - 30;

    for (var i = 0; i < 3; i++) {
      randAnswer = Math.floor(Math.random() * (max - min)) + min;
      answers.push(randAnswer);
    }

    this._shuffleArray(answers);

    let diff;
    if (numExpressions == 1) diff = this.DIFFICULTY_EASY;
    else if (numExpressions == 2) diff = this.DIFFICULTY_MEDIUM;
    else if (numExpressions >= 3) diff = this.DIFFICULTY_HARD;

    return {
      questionString: htmlString,
      answersList: answers,
      correctAnswer,
      difficulty: diff,
      topic: 'JavaScript: Strings',
    };
  }

  _generateStringQuestionWithStringAnswer(numExpressions, wordToUse) {
    let word = wordToUse || 'Code Battles';
    if (word.length <= 4) word = 'Code Battles';

    let evalString = `var word = "${word}";\n`;
    let htmlString = `var word = "${word}";\n<br/>var output = `;

    const functionOptions = ['charAt', '[]', 'substring'];
    const concatOperation = ' + ';

    let selectedFn;

    for (var i = 0; i < numExpressions; i++) {
      if (i != 0) {
        evalString += concatOperation;
        htmlString += concatOperation;
      }
      selectedFn = this._pickRandomElementFromList(functionOptions);

      switch (selectedFn) {
        case 'charAt':
          var rand_index = this._randNumBetweenInclusive(0, word.length - 1);
          evalString += `word.charAt(${rand_index})`;
          htmlString += `word.charAt(${rand_index})`;
          break;

        case '[]':
          var rand_index = this._randNumBetweenInclusive(0, word.length - 1);
          evalString += `word[${rand_index}]`;
          htmlString += `word[${rand_index}]`;
          break;

        case 'substring':
          var indeces = this._getRandomSubstringIndeces(word);
          evalString += `word.substring(${indeces[0]}, ${indeces[1]})`;
          htmlString += `word.substring(${indeces[0]}, ${indeces[1]})`;
          break;
      }
    }

    htmlString += ';\n<br/>console.log(output);';
    htmlString += '\n\n<br/><br/><b>What will the above code print?</b><br/>\n';

    const correctAnswer = eval(evalString);

    // generate answers
    const answers = [];
    answers.push(`'${correctAnswer}'`);

    let randAnswer;

    // generate 3 other answers
    for (var i = 0; i < 3; i++) {
      randAnswer = '';
      // generate other answer choices that are same length as the correct one
      // in order to make random guessing harder
      for (let j = 0; j < correctAnswer.length; j++) {
        randAnswer += this._pickRandomElementFromList(word);
      }
      answers.push(`'${randAnswer}'`);
    }

    this._shuffleArray(answers);

    let diff;
    if (numExpressions == 1) diff = this.DIFFICULTY_EASY;
    else if (numExpressions == 2) diff = this.DIFFICULTY_MEDIUM;
    else if (numExpressions >= 3) diff = this.DIFFICULTY_HARD;

    return {
      questionString: htmlString,
      answersList: answers,
      correctAnswer: `'${correctAnswer}'`,
      difficulty: diff,
      topic: 'JavaScript: Strings',
    };
  }

  _getRandomSubstringIndeces(original) {
    const substring_start_index = this._randNumBetweenInclusive(
      0,
      original.length - 1,
    );
    const substring_end_index = this._randNumBetweenInclusive(
      substring_start_index + 1,
      original.length,
    );
    return [substring_start_index, substring_end_index];
  }

  _getRandomSubstring(original) {
    const indeces = this._getRandomSubstringIndeces(original);
    return original.substring(indeces[0], indeces[1]);
  }

  // includes min and max
  _randNumBetweenInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _generateBooleanAlgebraQuestion(numVars, numExpressions) {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    const variables = [];
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const operators = ['>', '<', '<=', '>=', '==', '!='];
    const connector = ['&&', '||'];
    const selectedNumbers = [];
    let evalString = '';
    let ifString = '';
    let correctAnswer = '';
    let count = 0;
    let questionString = '';

    for (var i = 0; i < numVars; i++) {
      variables.push(alphabets[i]);
    }
    for (var i = 0; i < numVars; i++) {
      selectedNumbers.push(numbers[Math.floor(Math.random() * 10)]);
    }
    for (var i = 0; i < numVars; i++) {
      evalString += `var ${variables[i]} = ${selectedNumbers[i]};\n`;
      questionString += `var ${variables[i]} = ${selectedNumbers[i]};<br/>`;
    }

    questionString += '<br/><b>Evalute the following expression:</b><br/>';

    for (var i = 0; i < numExpressions; i++) {
      ifString += `(${
        variables[Math.floor(Math.random() * variables.length)]
      } `;
      ifString += `${operators[Math.floor(Math.random() * operators.length)]} `;
      ifString += `${
        variables[Math.floor(Math.random() * variables.length)]
      }) `;
      count++;
      if (numExpressions > count) {
        ifString += `${connector[Math.floor(Math.random() * 2)]} `;
      }
    }
    evalString += ifString;
    correctAnswer = eval(evalString);

    questionString += ifString;

    let diff;
    if (numExpressions >= 4) diff = this.DIFFICULTY_HARD;
    else if (numExpressions >= 2) diff = this.DIFFICULTY_MEDIUM;
    else diff = this.DIFFICULTY_EASY;

    return {
      questionString,
      answersList: ['true', 'false'],
      correctAnswer: `${correctAnswer}`,
      difficulty: diff,
    };
  }

  _generateRandomArithmeticQuestion(numOperands) {
    const allowedOperations = '*-+';

    let randOperand = this._pickRandomElementFromList('0123456789');
    let randOperator;

    let equation = `${randOperand}`; // the first operand

    for (let i = 0; i < numOperands - 1; i++) {
      // the remaining operands
      randOperand = this._pickRandomElementFromList('0123456789');
      randOperator = this._pickRandomElementFromList(allowedOperations);

      equation += ` ${randOperator} ${randOperand}`;
    }

    return equation;
  }

  _generateAnswersForArithmeticQuestion(equation) {
    const correctAnswer = eval(equation);
    const answers = [];

    answers.push(correctAnswer);

    let randAnswer;
    const max = correctAnswer + 50;
    const min = correctAnswer - 50;

    for (let i = 0; i < 3; i++) {
      randAnswer = Math.floor(Math.random() * (max - min)) + min;
      answers.push(randAnswer);
    }

    return answers;
  }

  _pickRandomElementFromList(list) {
    const len = list.length;
    return list[Math.floor(Math.random() * len)];
  }

  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  _shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}

export default QuestionGenerator;
