import * as list from './list.js';

// todo: добавить сортировку аттрибутов по алфавиту
/**
 * remove repeated name in array of attributes
 * @param {array} attr - array of attr.
 * @returns {array}
 */
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

/**
 * node validator
 * @param {*} mix
 * @returns {void}
 */
const _validateNode = (...mix) => mix.forEach(el => {
    if (!el.get('type')) {
        throw Error(`Argument must be a Node instance: ${mix}`);
    }
});

/**
 * type array validator
 * @param {*} args
 * @returns {void}
 */
const _validate = (...args) => args.forEach(el => {
    if (!Array.isArray(el)) {
        throw Error(`Argument must be an array: ${el}`);
    }
});

/**
 * type string validator
 * @param {*} s
 * @returns {void}
 */
const _validateTypeString = (s) => {
    if (typeof s !== 'string') {
        throw Error(`Argument must be a string: ${s}`);
    }
};

/**
 * constructor for node
 * @constructor
 * @param {string} type - type of node
 * can be only 'singleNode', 'textNode' and 'htmlNode'.
 * @param {string|Null} name - name of node.
 * @param {array} attr - attributes array of objects.
 * It is set { name: string, value: string}.
 * Array of attributes will convert to list of objects.
 * @param {array} content - array of content in node.
 * It can be other nodes or string
 * @returns {Map}
 */
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
            nodeMap.set('attr', list.l());
            nodeMap.set('content', content);
            break;
        case 'htmlNode':
            nodeMap.set('attr', list.l(...clearAttrs));
            nodeMap.set('content', content);
            break;
    }
    return nodeMap;
};

/**
 * node wrapper for 'singleNode' type
 * @param {string|Null} name - name of node.
 * @param {array} attr - attributes array of objects.
 * It is set { name: string, value: string}.
 * Array of attributes will convert to list of objects.
 * @returns {Map}
 */
export const singleNode = (name, attr) => {
    return _node('singleNode', name, attr, []);
};


/**
 * node wrapper for 'textNode' type
 * @param {array} content - array of content in node.
 * It can be other nodes or string
 * @returns {Map}
 */
export const textNode = (content) => {
    return _node('textNode', '', [], content);
};

/**
 * node wrapper for 'htmlNode' type
 * @param {string|Null} name - name of node.
 * @param {array} attr - attributes array of objects.
 * It is set { name: string, value: string}.
 * Array of attributes will convert to list of objects.
 * @param {array} content - array of content in node.
 * It can be other nodes or string
 * @returns {Map}
 */
export const htmlNode = (name, attr, content) => {
    return _node('htmlNode', name, attr, content);
};

/**
 * get node attributes
 * @param {Map} node - name of node.
 * @returns {function:list}
 */
export const getAttrs = (node) => node.get('attr');

/**
 * get node name
 * @param {Map} node - name of node.
 * @returns {string|Null}
 */
export const getName = (node) => node.get('name');

/**
 * get node content
 * @param {Map} node - name of node.
 * @returns {array}
 */
export const getContent = (node) => node.get('content');

/**
 * check node for exist attribute with name @attr
 * @param {Map} node
 * @param {string} attr
 * @returns {boolean}
 */
const _hasNodeAttr = (node, attr) =>
    list.reduce(node, (a, e) =>
        e.name === attr ? true : a, false);

/**
 * set attribute in node
 * @param {Map} node
 * @param {string} newAttrName
 * @param {*} value
 * @returns {Map}
 */
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
    return _node(node.get('type'), getName(node), list.convertToArray(newAttrs), getContent(node));
};

/**
 * flatten array recursively
 * @param {array} arr1
 * @returns {array}
 */
export const flattenDeep = (arr1) =>
    arr1.reduce((acc, val) =>
        Array.isArray(val)
            ? acc.concat(flattenDeep(val))
            : acc.concat(val), []);


// todo: добавить конкатинацию ноды при добавлениее textNode в textNode
/**
 * insert new node or string in content of @node
 * (in element of content which is string)
 * @param {Map} node
 * @param {Map|string} insertElem
 * @param {number} numberOfContent - position changed element in node content
 * @param {number} pos - position in string of element
 * @returns {Map}
 */
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
    });
    return _node(node.get('type'), getName(node), list.convertToArray(getAttrs(node)), flattenDeep(newContent));
};

/**
 * set node name
 * @param {Map} node
 * @param {string} name
 * @param {boolean} isSingleNode
 * @returns {Map}
 */
export const setName = (node, name, isSingleNode = false) => {
    _validate(node);
    _validateTypeString(name);
    if (isSingleNode) {
        return _node('singleNode', name, list.convertToArray(getAttrs(node)), []);
    }
    if (node.get('type') === 'textNode') {
        return _node('htmlNode', name, list.l(), getContent(node));
    }
};