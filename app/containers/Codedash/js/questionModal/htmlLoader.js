import htmlInput from '../data/generator/htmlScript/inputScript';
import htmlTable from '../data/generator/htmlScript/tableScript';

let htmlData = null;

const HTML_PICKER = [htmlInput, htmlTable];
let HTML_INDEX = 0;
const nums = new Set();
while (nums.size !== HTML_PICKER.length) {
  nums.add(Math.floor(Math.random() * HTML_PICKER.length));
}
const randomIndices = [...nums];

const htmlLoader = () => {
  if (HTML_INDEX === HTML_PICKER.length) {
    HTML_INDEX = 0;
  }
  htmlData = HTML_PICKER[randomIndices[HTML_INDEX]]();
  HTML_INDEX += 1;
};

export { htmlData };
export default htmlLoader;
