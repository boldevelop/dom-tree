import * as pair from './cons.js';

/**
 * check value on the list type
 * @param {*} mix - проверяемый элемент.
 * @returns {boolean}
 */
const isList = mix => {
    if (mix === null) {
        return true
    }
    if (pair.isPair(mix)) {
        return isList(pair.cdr(mix))
    }
    return false;
};

/**
 * validate list
 * @param {function:list} list - список.
 * @returns {void}
 */
const _checkList = (list) => {
    if (!isList(list)) {
        throw new Error(`Argument must be list, but it was '${list}'`);
    }
};

/**
 * add elem to list in beginning
 * @param {*} element - значение.
 * @param {function:list} list - список.
 * @returns {function:list}
 */
export const _cons = (element, list) => {
    _checkList(list);
    return pair.cons(element, list);
};

/**
 * reverse list
 * @param {*} element - вставляемый элемент.
 * @param {function:list} list - список.
 * @param {number} pos - позиция.
 * @returns {function:list}
 */
export const cons = (element, list, pos = 0) => {
    _checkList(list);
    const lengthList = length(list);
    if (pos === 0) {
        return _cons(element, list);
    }
    const posReplace = pos > lengthList ? lengthList - 1 : pos;
    return reverse(reduce(list, (a, e, i) => {
        if (i === posReplace) {
            return cons(e, cons(element, a));
        }
        return pair.cons(e, a);
    }, null));
};

/**
 * constructor for list
 * @constructor
 * @param {*} elements - значения.
 * @returns {function}
 */
export const l = (...elements) =>
    elements.reverse().reduce((acc, item) =>
        cons(item, acc), null);

/**
 * get head of the list
 * @param {function} list - список.
 * @returns {*}
 */
export const head = list => {
    _checkList(list);
    return pair.car(list);
};

/**
 * get tail of the list
 * @param {function} list - список.
 * @returns {*}
 */
export const tail = list => {
    _checkList(list);
    return pair.cdr(list);
};

/**
 * checking for empty
 * @param {function:list} list - список.
 * @returns {boolean}
 */
export const isEmpty = list => {
    _checkList(list);
    return list === null;
};

/**
 * reverse list
 * @param {function:list} list - список.
 * @returns {function:list}
 */
export const reverse = (list) => {
    _checkList(list);
    return reduce(list, (a, e) => cons(e, a), null)
};

/**
 * reduce for the list
 * @param {function:list} list - список.
 * @param {function} reducer - функция редьюсер.
 * @param {*} acc - аккумулятор.
 * @returns {*}
 */
export const reduce = (list, reducer, acc = 0) => {
    _checkList(list);
    const iter = (iterList, acc, i) => !isEmpty(iterList)
        ? iter(tail(iterList), reducer(acc, head(iterList), i++), i)
        : acc;
    return iter(list, acc, 0);
};

/**
 * get length of the list
 * @param {function:list} list - список.
 * @returns {number}
 */
export const length = list => {
    _checkList(list);
    return reduce(list,a => a + 1, 0);
};

/**
 * checking for existence elem in list
 * @param {function:list} list - список.
 * @param {*} elem - искомый элемент.
 * @returns {boolean}
 */
export const has = (list, elem) => {
    _checkList(list);
    return reduce(list, (a, e) => e === elem ? true : a, false)
};

/**
 * presentation list as a string
 * @param {function:list} list - список.
 * @returns {string}
 */
export const toString = (list) => {
    _checkList(list);
    const strOfList = reduce(list, (a, e) => {
        let str = '';
        if (isList(e)) {
            str = toString(e);
        } else {
            if (typeof e === 'object') {
                str = JSON.stringify(e, null, 2);
            } else {
                str = String(e);
            }
        }
        str = a ? `, ${str}` : str;
        return a + str;
    }, '');
    return `(${strOfList})`;
};

// todo: need testing
const numberLists = l(1, 2, 3, l('qwe', 'rty'));
const res = reduce(numberLists, (e, a) => a + e, 0);
const len = length(numberLists);
const addedL = cons(2, numberLists);
console.log(toString(numberLists));
console.log(toString(cons('start', numberLists, 3)));
