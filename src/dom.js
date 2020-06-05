window.dom = {
    //创建插入标签
    create(string) {
        // const div = dom.create('     <div><span>1</span></div>');
        const container = document.createElement('template');//创建一个标签容器里面放代码，如果是div，那么里面不能放td等，所以最好用template标签，能放任何元素
        container.innerHTML = string.trim();//trim()函数是去掉字符串两边的空格，innerHTML当有空格时会变成文本节点，firstChild拿到的就是文本节点
        return container.content.firstChild;//template里面的元素只能通过.content.xxxChild拿到，不能children
    },
    //在node后面插入node2  原生的after是新功能，还不兼容，用insertBefore:在之前插入
    after(node, node2) {
        // console.log(node.nextSibling);
        node.parentNode.insertBefore(node2, node.nextSibling);//插到我的后面就是插到我下一个兄弟的前面，// 当最后一个没有兄弟时也可
    },
    //在前面插入
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    //新增儿子
    append(parent, node) {
        parent.appendChild(node);
    },
    //新增爸爸：先把要加的插到我前面/后面也行，再把我插到它里面
    wrap(node, parent) {
        dom.before(node, parent);
        dom.append(parent, node);
    },
    remove(node) {
        // node.remove() //这个接口比较新 IE可能不支持，所以换一个让爸爸删
        node.parentNode.removeChild(node);
        return node;//返回，保留它可以用
    },
    empty(node) {
        // node.innerHTML=''; //这样也是可以的，但是拿不到被清空掉的元素的引用，有时候需要拿到
        // const childNodes=node.childNodes
        //上面可以用ES6语法
        const {childNodes} = node;
        const array = [];
        // for (let i = 0; i < childNodes.length; i++) {
        //     // console.log(childNodes.length);//边删除length会实时改变
        //     console.log(childNodes[i]);
        //     array.push(dom.remove(childNodes[i]));
        // }
        let first = node.firstChild;
        while (first) {
            array.push(dom.remove(node.firstChild));
            first = node.firstChild;//第一个删了第二个跑上去变第一个
        }
        return array;
    },
    //改
    attr(node, name, value) {
        if (arguments.length === 3) {//重载：根据不同的参数个数做不同的事情
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },
    text(node, string) {
        if (arguments.length === 2) {
            // if (node.innerText){
            if ('innerText' in node) {//适配，兼容不同的浏览器
                node.innerText = string;//Firefox/chrome
            } else {
                node.textContent = string;//IE
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText;
            } else {
                return node.textContent;
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string;
        } else if (arguments.length == 1) {
            return node.innerHTML;
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(test,'border','1px solid red');
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === "string") {
                //dom.style(test.'border');
                return node.style[name];
                // }else if (typeof name==="object"){
            } else if (name instanceof Object) {
                //dom.style(test, {border: '1px solid red',color:'blue'});
                for (let key in name) {
                    //key:border / color
                    //node.style.border =...
                    //node.style.color =...
                    node.style[key] = name[key];//key是一个变量所以用[]
                }
            }
        }

    },
    class: {//classList用法
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        has(node, className) {
            return node.classList.contains(className);
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },
    //
    find(selector, scope) {//querySelectorAll方法
        return (scope || document).querySelectorAll(selector);//秒啊，不过那也只能是id啊，其他可以存个变量再套进来
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {
        return Array.from(node.parentNode.childNodes).filter(n => n !== node)//过滤掉自己
    },
    //找弟弟
    next(node) {
        let next = node.nextSibling;
        if (next && next.nodeType === 3) {
            next = next.nextSibling;
        }
        return next;
    },
    previous(node){
        let last = node.previousSibling;
        if (last && last.nodeType === 3) {
            last = last.previousSibling;
        }
        return last;
    },
    //遍历
    each(nodeList,fn){
        for (let i=0;i<nodeList.length;i++){
            fn.call(null,nodeList[i]);
        }
    },
    //获取排行
    index(node){
        const list=dom.children(node.parentNode);
        let i;
        for (i=0;i<list.length;i++){
            if (list[i]===node){
                break
            }
        }
        return i;
    }
};








