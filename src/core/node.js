import * as list from './list.js';
import md5 from 'md5';
import './queue';
import Queue from "./queue";

/**
 * minimal hash function
 * @returns {string}
 */
const makeHash = (n = 5) => {
    let text = "";
    const possible = "abcdefghijklmnopqrstuvwxyz";
    for (let i of Array(n)) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


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
    nodeMap.set('id', md5(name + makeHash()));
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
 * get node id
 * @param {Map} node - name of node.
 * @returns {number}
 */
export const getId = (node) => node.get('id');


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


// todo: добавить конкатенацию ноды при добавлениее textNode в textNode
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
    _validateNode(node);
    _validateTypeString(name);
    if (isSingleNode) {
        return _node('singleNode', name, list.convertToArray(getAttrs(node)), []);
    }
    return _node('htmlNode', name, list.convertToArray(getAttrs(node)), getContent(node));
};

// todo: протестирвоать
const content = {
    "name": "div",
    "htmlNode": true,
    "attributes": [
        {
            "name": "class",
            "value": "ssss"
        }
    ],
    "content": [
        {
            "name": "asss",
            "attributes": [
                {
                    "name": "class",
                    "value": "sdssss"
                }
            ],
            "htmlNode": true,
            "singleNode": false,
            "content": "content of a node"
        },
        {
            "name": "span",
            "attributes": [
                {
                    "name": "class",
                    "value": "aaaa"
                }
            ],
            "htmlNode": true,
            "singleNode": true
        },
        {
            "attributes": [
                {
                    "name": "class",
                    "value": ""
                }
            ],
            "htmlNode": false,
            "singleNode": false,
            "content": "another content"
        }
    ]
};

/**
 * create node from beginning form
 * @param {object} node
 * @returns {Map}
 */
export const createNodeFromForm = node => {
    let type = 'htmlNode';
    if (!node.htmlNode) {
        type = 'textNode';
    }
    if (node.singleNode) {
        type = 'singleNode'
    }
    let content = [];
    if (node.content) {
        if (Array.isArray(node.content)) {
            content = node.content.map((e => createNodeFromForm(e)));
        } else if (typeof node.content === 'string') {
            content.push(node.content);
        }
    }
    switch (type) {
        case 'singleNode':
            return singleNode(node.name, node.attributes);
        case 'textNode':
            return textNode(content);
        case 'htmlNode':
            return htmlNode(node.name, node.attributes, content);
    }
};

// todo: вынести в отдельный фаил работа с деревом
/**
 * breadth-first search by ID
 * @param {Map} node
 * @param {number} id
 * @returns {Map}
 */
export const getNodeById = (node, id) => {
    if (id === getId(node)) {
        return node;
    }
    const que = new Queue();
    getContent(node).forEach((el) => {
        if (typeof el !== 'string') {
            que.enqueue(el);
        }
    });
    const iter = (q, searchNode) => {
        if (!q.length || searchNode) {
            return searchNode;
        }
        const elem = q.dequeue();
        const currentNodeId = getId(elem);
        if (currentNodeId === id) {
            return iter(q, elem);
        }
        getContent(node).forEach((el) => {
            if (typeof el !== 'string') {
                que.enqueue(el);
            }
        });
        return iter(q, searchNode);
    };
    return iter(que, undefined);
};

/**
 * insert NewNode in Tree with Depth-first search
 * @param {Map} node
 * @param {number} id
 * @param {Map} newNode
 * @returns {Map}
 */
export const _insertNode = (node, id, newNode) => {
    if (getId(node) === id) {
        return newNode
    }
    const iter = (n) => {
        if (typeof n === 'string') {
            return n
        }
        if (getId(n) === id) {
            return newNode
        }
        return getContent(n).map((e) => {
            if (typeof e === 'string') {
                return e
            }
            if (getId(e) === id) {
                return newNode
            }
            return _node(n.get('type'), getName(n), list.convertToArray(getAttrs(n)), iter(e));
        });
    };
    return _node(node.get('type'), getName(node), list.convertToArray(getAttrs(node)), iter(node))
};

/**
 * change Name and insert node
 * @param {Map} node
 * @param {number} id
 * @param {string} name
 * @returns {Map}
 */
export const insertChangedNameNode = (node, id, name) => {
    const newNode = setName(getNodeById(node, id), name);
    return _insertNode(node, id, newNode);
};

/**
 * change Attrs and insert node
 * @param {Map} node
 * @param {number} id
 * @param {array} attrs
 * @returns {Map}
 */
export const insertChangedAttrsNode = (node, id, attrs) => {
    const targetNode = getNodeById(node, id);
    const newNode = _node(targetNode.get('type'), getName(targetNode), attrs, getContent(targetNode));
    return _insertNode(node, id, newNode);
};

/**
 * change Content and insert node
 * @param {Map} rootNode
 * @param {number} id
 * @param {object} content
 * @param {number} index
 * @returns {Map}
 */
export const insertChangedContentNode = (rootNode, id, content, index) => {
    const targetNode = getNodeById(rootNode, id);
    let newNode;
    if (content.insertNode) {
        const insertNode = createNodeFromForm({...content});
        const inContent = content.inContent.split('<>');
        const pos = inContent[0].length;
        newNode = addContent(targetNode, insertNode, index, pos);
    } else {
        newNode = addContent(targetNode, content.inContent, index);
    }
    return _insertNode(rootNode, id, newNode);
};
