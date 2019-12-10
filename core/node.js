import * as list from './list.js';

// todo: добавить сортировку аттрибутов по алфавиту
export const _removeRepeatedAttr = (attr) => {
    let newArray = [];
    attr.forEach(firstElement => {
        let alreadyInArray = false;
        newArray.forEach(secondElement => {
          const firstName = firstElement.name.toLowerCase();
          const secondName = secondElement.name.toLowerCase();
          if (firstName === secondName) {
              alreadyInArray = true;
              secondElement.value = firstElement.value;
          }
        });
        if (!alreadyInArray) {
            newArray.push(firstElement);
        }
    });
    return newArray;
};

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
    const clearAttrs = _removeRepeatedAttr(attr);
    const nodeMap = new Map();
    nodeMap.set('type', type);
    nodeMap.set('name', name ? name : null);
    switch (type) {
        case 'singleNode':
            nodeMap.set('attr', list.l(...clearAttrs));
            nodeMap.set('content', []);
            break;
        case 'textNode':
            nodeMap.set('name', []);
            nodeMap.set('attr', []);
            nodeMap.set('content', list.l(...content));
            break;
        case 'htmlNode':
            nodeMap.set('attr', list.l(...clearAttrs));
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
export const getAttrs = (node) => node.get('attr');
export const getName = (node) => node.get('name');
export const getContent = (node) => node.get('content');
const _hasNodeAttr = (node, attr) =>
    list.reduce(node, (a, e) =>
        e.name === attr ? true : a, false);
export const setAttr = (node, newAttrName, value) => {
    _validateNode(node);
    _validateTypeString(newAttrName);
    const oldAttr = node.get('attr');
    let newAttrs;
    if (_hasNodeAttr(oldAttr, newAttrName)) {
        newAttrs = list.reverse(list.reduce(oldAttr, (a, e) => {
            if (e.name === newAttrName) {
                e.value = value;
            }
            return list.cons(e, a);
        }, list.l()));
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

// todo: доделать логику добавления контента
export const addContent = (node, newNode, pos = 0) => {
    _validateNode(node, newNode);
    const oldContent = getContent(node);
    console.log(list.toString(oldContent));
    const newContent = list.cons(newNode, oldContent, pos);
    console.log(list.toString(newContent));
    node.set('content', newContent);
    return node;
};
export const setName = (node, name, type = 'htmlNode') => {
    _validate(node);
    _validateTypeString(name);
    node.set('name', name);
    switch (type) {
        case 'singleNode':
            node.set('content', []);
            break;
        case 'textNode':
            node.set('attr', []);
            break;
    }
};
