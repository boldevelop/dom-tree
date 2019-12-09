import * as list from './list.js';

const node = (type, name, attr, content) => {
    const nodeMap = new Map();
    nodeMap.set('type', name);
    nodeMap.set('name', name);
    nodeMap.set('attr', attr);
    nodeMap.set('content', content);
    return nodeMap;
};
export const singleNode = (name, attr) => {
    return node('singleNode', name, attr, null);
};
export const textNode = (content) => {
    return node('textNode', null, null, content);
};
export const htmlNode = (name, attr, content) => {
    return node('htmlNode', name, attr, content);
};
export const setAttr = (node, attr, value) => {

};
export const setContent = (node, attr, value) => {

};
export const setName = () => {

};
