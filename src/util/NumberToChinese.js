/*
 * @Author: LainCarl 
 * @Date: 2018-04-02 17:04:43 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-04-02 17:05:08
 * @Feature: 数字表示转化为中文 15=> 十五 
 */

const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
const chnUnitChar = ['', '十', '百', '千'];
function SectionToChinese(section) {
  let strIns = '';
  let chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    const v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos += 1;
    section = Math.floor(section / 10);
  }
  return chnStr;
}
export default function NumberToChinese(num) {
  let unitPos = 0;
  let strIns = ''; 
  let chnStr = '';
  let needZero = false;
 
  if (num === 0) {
    return chnNumChar[0];
  }
 
  while (num > 0) {
    const section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos += 1;
  }
 
  return chnStr;
}
