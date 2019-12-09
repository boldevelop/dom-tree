import * as list from './list.js';
// todo: check for repeated attrs
// todo: add testing
const arr = [
    {
        name: 'href',
        value: '1'
    },
    {
        name: 'class',
        value: '2'
    },
    {
        name: 'data-type',
        value: '3'
    },
    {
        name: 'href',
        value: '4'
    },
];

// todo: добавить сортировку аттрибутов по алфавиту
const _removeRepeatedAttr = (attr) => {
    let newArray = [];
    attr.forEach(e => {
        console.log(e);
        newArray.push(e);
        newArray.forEach((el, i) => {
           const currentName = e.name.toLowerCase();
           const nameInNewArray = el.name.toLowerCase();
           if (currentName === nameInNewArray) {
               newArray[i] = {
                   name: currentName,
                   value: e.value,
               }
           }
        });
    });
    return newArray;
};
console.log(_removeRepeatedAttr(arr));
const _validateNode = (...mix) => mix.forEach(el => {
    if (!el.get('type')) {
        throw Error(`Argument must be a Node instance: ${mix}`);
    }
});
const _validate = (...args) => args.forEach(el => {
    if (!Array.isArray(el)) {
        throw Error(`Argument must be an array: ${el}`);
    }
});
const _validateTypeString = (s) => {
    if (typeof s !== 'string') {
        throw Error(`Argument must be a string: ${s}`);
    }
};
const _node = (type, name, attr, content) => {
    _validate(attr, content);
    _validateTypeString(name);
    const nodeMap = new Map();
    nodeMap.set('type', type);
    nodeMap.set('name', name ? name : null);
    switch (type) {
        case 'singleNode':
            nodeMap.set('attr', list.l(...attr));
            nodeMap.set('content', []);
            break;
        case 'textNode':
            nodeMap.set('name', []);
            nodeMap.set('attr', []);
            nodeMap.set('content', list.l(...content));
            break;
        case 'htmlNode':
            nodeMap.set('attr', list.l(...attr));
            nodeMap.set('content', list.l(...content));
            break;
    }
    return nodeMap;
};
export const singleNode = (name, attr) => {
    return _node('singleNode', name, attr, []);
};
export const textNode = (content) => {
    return _node('textNode', '', [], content);
};
export const htmlNode = (name, attr, content) => {
    return _node('htmlNode', name, attr, content);
};
const _hasNodeAttr = (node, attr) =>
    list.reduce(node, (a, e) =>
        e.name === attr ? true : a, false);
export const setAttr = (node, newAttrName, value) => {
    _validateNode(node);
    _validateTypeString(newAttrName);
    const oldAttr = node.get('attr');
    let newAttrs;
    if (_hasNodeAttr(node, newAttrName)) {
        newAttrs = list.reduce(oldAttr, (a, e) => {
            if (e.name === newAttrName) {
                e.value = value;
            }
            return list.cons(e, a);
        }, list.l());
    } else {
        newAttrs = list.cons({
            name: newAttrName,
            value,
        }, oldAttr);
    }
    node.set('attr', newAttrs);
    return node;
};
// attr obj{name: string; value: string;}
export const setContent = (node, newNode, pos = 0) => {
    _validateNode(node, newNode);
    const oldContent = node.get('content');
    let newContent = list.cons(newNode, oldContent, pos);
    node.set('content', newContent);
    return node;
};
export const setName = () => {

};
