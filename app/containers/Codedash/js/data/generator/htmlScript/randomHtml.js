function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateFormHTML() {
  const typeValue = ['text', 'number', 'email'];
  let finalString = '<form>\n';
  const howManyFields = Math.floor(Math.random() * typeValue.length) + 1;
  const nums = new Set();
  while (nums.size !== typeValue.length) {
    nums.add(Math.floor(Math.random() * typeValue.length));
  }
  const randomIndices = [...nums];
  let buildString;
  for (let i = 0; i < howManyFields; i++) {
    const whichInputType = typeValue[randomIndices[i]];
    buildString = `${whichInputType}:<input type = 'typeValue' id = 'myElement'><br>\n`;
    buildString = buildString.replace('typeValue', whichInputType);
    finalString += buildString;
  }
  finalString += '</form>';
  console.log(finalString);
  return finalString;
}

function generateImageHTML() {
  const attributes = ['height', 'width'];
  const nums = new Set();
  while (nums.size !== attributes.length) {
    nums.add(Math.floor(Math.random() * attributes.length));
  }
  const randomIndices = [...nums];
  const hasAlt = Math.floor(Math.random() * 2);
  const imgSrc = 'testing.jpg';
  let finalString = `<img src ='${imgSrc}' `;
  const howManyAttributes = Math.floor(Math.random() * attributes.length);
  if (hasAlt) {
    finalString += `alt = 'This is an image' `;
  }
  for (i = 0; i < howManyAttributes; i++) {
    finalString += `${attributes[randomIndices[i]]} = ${Math.floor(
      Math.random() * 500,
    ) + 100} `;
  }
  finalString += `>`;
  return finalString;
}

function generateNesting() {
  const tags = ['p', 'b', 'a', 'ul'];
  const compatibleTags = [['b', 'a'], [], [], ['li']];
  const props = [[], [], ['href'], ['start']];
  const noOfTags = Math.floor(Math.random() * tags.length) + 1;
  let buildString = '<div>\n';
  let i = 0;
  while (i < noOfTags) {
    i++;
    const index = Math.floor(Math.random() * tags.length);
    const usingTag = tags[index];
    buildString += `<${usingTag}`;
    if (props[index]) {
      if (usingTag == 'a') {
        buildString += ` href ="https://www.google.com"`;
      }
      // else{
      //     buildString += ` start = ${Math.floor(Math.random()*10)+1}`;
      // }
    }
    buildString += `>`;
    if (compatibleTags[index].length) {
      const insideIndex = Math.floor(
        Math.random() * compatibleTags[index].length,
      );
      if (compatibleTags[index][insideIndex] == 'a') {
        buildString += 'Lorem\n';
        buildString += `<${
          compatibleTags[index][insideIndex]
        } href ="https://www.google.com">Lorem Ipsum</${
          compatibleTags[index][insideIndex]
        }>\n`;
      } else {
        buildString += 'Lorem';
        buildString += `<${compatibleTags[index][insideIndex]}>Lorem Ipsum</${
          compatibleTags[index][insideIndex]
        }>\n`;
      }
      buildString += `</${usingTag}>\n`;
    } else {
      buildString += `Lorem Ipsum doner set amit\n</${usingTag}>\n`;
    }
  }
  buildString += `</div>`;
  console.log(buildString);
  return buildString;
}

function createAWebPage(noOfDivs) {
  const fs = require('fs');
  let data = `<!DOCTYPE html>\n<body bgcolor='${getRandomColor()}'>`;
  const headingSize = Math.floor(Math.random() * 3 + 1);
  data += `\n<h${headingSize}>Random HTML Generator</h${headingSize}>`;
  data += `\n${generateImageHTML()}\n${generateFormHTML()}\n${generateNesting()}`;
  data += `\n</body></html>`;
  fs.writeFile('index.html', data, err => {
    if (err) {
      console.log(err);
    }
  });
}
createAWebPage();
