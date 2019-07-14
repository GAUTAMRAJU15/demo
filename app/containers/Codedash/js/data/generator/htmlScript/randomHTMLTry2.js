function generateNesting(noOfTags, nestingDepth) {
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
    'img src',
    'ul',
    'ol',
  ];
  // <p></p>
  // <h1></h1>
  // <h2></h2>
  // <h6></h6>
  // <div></div>
  // <img/>
  // <a>
  // <ol>
  // <ul></ul>
  const nestingRules = {
    div: ['all'],
    p: ['a', 'b', 'i', 'img src', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
  };
  const tagProperties = {
    p: [
      { name: 'align', values: ['left', 'right', 'center', 'justify'] },
      { name: 'id', values: ['myPID'] },
      { name: 'class', values: ['myPClass'] },
    ],
    div: [
      { name: 'align', values: ['left', 'right', 'center', 'justify'] },
      { name: 'id', values: ['myDivID'] },
      { name: 'class', values: ['myDivClass'] },
    ],
    span: [
      { name: 'id', values: ['mySpanID'] },
      { name: 'class', values: ['mySpanClass'] },
    ],
    'img src': [
      { name: 'alt', values: 'This is an image' },
      { name: 'height', values: Math.floor(Math.random() * 500) + 100 },
      { name: 'width', values: Math.floor(Math.random() * 500) + 100 },
      { name: 'id', values: ['myImgID'] },
      { name: 'class', values: ['myImgClass'] },
    ],
  };
  const selectedTags = new Set();
  while (selectedTags.size !== tagsToUse.length) {
    selectedTags.add(tagsToUse[Math.floor(Math.random() * noOfTags)]);
  }
  console.log(selectedTags);
}
generateNesting();
