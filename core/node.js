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
    if (name !== null) {
        _validateTypeString(name);
    }
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
            nodeMap.set('name', null);
            nodeMap.set('attr', []);
            nodeMap.set('content', content);
            break;
        case 'htmlNode':
            nodeMap.set('attr', list.l(...clearAttrs));
            nodeMap.set('content', content);
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

// todo: можно сделать без мутации, преобразовать список в массив
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
// todo: добавить конкатинацию ноды при добавлениее textNode в textNode
export const addContent = (node, insertElem, numberOfContent = 0, pos = 0) => {
    _validateNode(node);
    let isStringInsertElem = true;
    if (typeof insertElem !== 'string') {
        _validateNode(node);
        isStringInsertElem = false;
    }
    const oldContent = getContent(node);
    const newContent = oldContent.map((e, i) => {
        if (i === numberOfContent) {
            if (isStringInsertElem) {
                return insertElem;
            } else {
                const firstString = e.slice(0, pos < 0 ? 0 : pos);
                const secondString = e.slice(pos < 0 ? 0 : pos);
                if (pos <= 0) {
                    return [insertElem, secondString];
                }
                if (pos >= e.length) {
                    return [firstString, insertElem];
                }
                return [firstString, insertElem, secondString];
            }
        }
        return e;
    }).flat();
    return _node(node.get('type'), getName(node), getAttrs(node), newContent);
};

export const setName = (node, name, isSingleNode = false) => {
    _validate(node);
    _validateTypeString(name);
    if (isSingleNode) {
        return _node('singleNode', name, getAttrs(node), []);
    }
    if (node.get('type') === 'textNode') {
        return _node('htmlNode', name, [], getContent(node));
    }
};
