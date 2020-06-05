//创建
const div = dom.create("       <td>hi</td>");
// console.log(div);
//在之后插入
dom.after(test, div);
// console.log(test);
//加父亲
const div2 = dom.create('<div id="parent"></div>');
dom.wrap(test, div2);
//删除
// const node=dom.remove(div2);
// console.log(node);
//清空
// console.log(window.empty)
const nodes = dom.empty(window.empty);
// console.log(nodes);

//改
dom.attr(test, 'title', 'Hi, I am A');
//读
const title = dom.attr(test, 'title');
// console.log(title);
//设置读取文本内容
dom.text(test, '你好');
dom.text(test);
//改样式
dom.style(test, {border: '1px solid red', color: 'blue'});
//读样式
// console.log(dom.style(test,'border'));
dom.style(test, 'border', '1px solid blue');
//添加class
dom.class.add(test, 'red');
dom.class.add(test, 'blue');
dom.class.remove(test, 'blue');
// console.log(dom.class.has(test,'blue'));
//事件
// const fn=()=>{
//     console.log('点击了');
// }
// dom.on(test,'click',fn);
// dom.off(test,'click',fn);

//找
// console.log(dom.find('#test'));
console.log(dom.find('#test')[0]);
console.log(dom.find('.red', test4));
const a = document.querySelector('.test3');
console.log(dom.find('.red', a));
// console.log(test4.querySelectorAll('.red'))
// console.log(document.querySelector('.test3').querySelectorAll('.red'))


//找爸爸
console.log(dom.parent(test));
console.log(dom.siblings(dom.find('#test4')[0]));

console.log(dom.next(dom.find('#test5')[0]));
console.log(dom.previous(dom.find('#test5')[0]));
const t = dom.find('#travel')[0];
dom.each(dom.children(t),(n)=>dom.style(n,'color','red'));
console.log(dom.index(test4));