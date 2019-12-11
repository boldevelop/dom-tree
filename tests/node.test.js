import * as node from '../core/node';
import * as list from '../core/list';

const arrOfAttrs = [
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
const arrOfAttrsWithoutRepeated = [
    {
        name: 'href',
        value: '4'
    },
    {
        name: 'class',
        value: '2'
    },
    {
        name: 'data-type',
        value: '3'
    }
];
const attrs = [
    {
        name: 'class',
        value: 'wrapper'
    },
    {
        name: 'aria-hidden',
        value: false
    },
];
const tNodeContent = ['Это изображени'];
const sNode = node.singleNode('img', arrOfAttrs);
const tNode = node.textNode(tNodeContent);
const hNode = node.htmlNode('div', attrs, [tNode, sNode]);

test('node: create', () => {
    const singleAttrs = node.getAttrs(sNode);
    const nameOfSingleNode = sNode.get('type');
    const htmlContent = node.getContent(hNode);
    const listOfSingleAttrs = list.l(...node._removeRepeatedAttr(arrOfAttrs));
    const listOfHtmlNode = [tNode, sNode];
    expect(list.toString(singleAttrs))
        .toBe(list.toString(listOfSingleAttrs));
    expect(htmlContent)
        .toStrictEqual(listOfHtmlNode);
    expect(nameOfSingleNode)
        .toBe('singleNode');
    expect(node.getName(hNode))
        .toBe('div');
});

test('node: removeRepeated', () => {
   expect(node._removeRepeatedAttr(arrOfAttrs))
       .toStrictEqual(arrOfAttrsWithoutRepeated);
});

test('node: setAttr', () => {
    const setNode = node.setAttr(hNode, 'class', 'content');
    const addedAttr = {
        name: 'class',
        value: 'content'
    };
    const newAttrs = node.getAttrs(setNode);
    expect(list.head(newAttrs))
        .toEqual(addedAttr);

    const setNode2 = node.setAttr(hNode, 'data-class', 'value');
    const addedAttr2 = {
        name: 'data-class',
        value: 'value'
    };
    const newAttrs2 = node.getAttrs(setNode2);
    expect(list.head(newAttrs2))
        .toEqual(addedAttr2);
});

test('node: setContent', () => {
    const newTextNode = node.textNode(['Описание']);
    const insertionPos = 5;
    const oldContentString = node.getContent(tNode)[0];
    const firstString = oldContentString.slice(0, insertionPos);
    const secondString = oldContentString.slice(insertionPos);
    const setContentNode = node.addContent(tNode, 'Это новый контент', 0);
    const setContentNode2 = node.addContent(tNode, newTextNode, 0, -12);
    const setContentNode3 = node.addContent(tNode, newTextNode, 0, insertionPos);
    const setContentNode4 = node.addContent(tNode, newTextNode, 0, 111);

    expect(node.getContent(setContentNode)[0]).toBe('Это новый контент');
    expect(node.getContent(setContentNode2))
        .toStrictEqual([newTextNode, oldContentString]);
    expect(node.getContent(setContentNode3))
        .toStrictEqual([firstString, newTextNode, secondString]);
    expect(node.getContent(setContentNode4))
        .toStrictEqual([oldContentString, newTextNode]);
});
