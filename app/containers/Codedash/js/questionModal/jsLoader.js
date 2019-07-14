import jsBoolean from '../data/generator/booleanScript';
import jsString from '../data/generator/stringQuestions/stringNumberMethods';
import jsArray from '../data/generator/arrayQuestions/arrayScript';

let jsData = null;
const JS_PICKER = [jsBoolean, jsString, jsArray];
let JS_INDEX = 0;
const nums = new Set();
while (nums.size !== JS_PICKER.length) {
  nums.add(Math.floor(Math.random() * JS_PICKER.length));
}
const randomIndices = [...nums];

const jsLoader = () => {
  if (JS_INDEX === JS_PICKER.length) {
    JS_INDEX = 0;
  }
  jsData = JS_PICKER[randomIndices[JS_INDEX]](2, 3);
  JS_INDEX += 1;
};

export { jsData };
export default jsLoader;
