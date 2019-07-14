import cssInput from '../data/generator/cssScript/cssScript';

let cssData = null;

const CSS_PICKER = [cssInput];
let CSS_INDEX = 0;
const nums = new Set();
while (nums.size !== CSS_PICKER.length) {
  nums.add(Math.floor(Math.random() * CSS_PICKER.length));
}
const randomIndices = [...nums];

const cssLoader = () => {
  if (CSS_INDEX === CSS_PICKER.length) {
    CSS_INDEX = 0;
  }
  const ques = new CSS_PICKER[randomIndices[CSS_INDEX]]();
  cssData = ques._generateCSSDefininitionQuestion();
  CSS_INDEX += 1;
};

export { cssData };
export default cssLoader;
