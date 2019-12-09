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
const cons = (element, list) => {
    _checkList(list);
    return pair.cons(element, list);
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
 * reduce for the list
 * @param {function:list} list - список.
 * @param {function} reducer - функция редьюсер.
 * @param {*} acc - аккумулятор.
 * @returns {*}
 */
export const reduce = (list, reducer, acc = 0) => {
    _checkList(list);
    const iter = (iterList, acc) => !isEmpty(iterList)
        ? iter(tail(iterList), reducer(acc, head(iterList)))
        : acc;
    return iter(list, acc);
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
// todo: оставить логику только для списков
export const toString = (list) => {
    _checkList(list);
    const strOfList = reduce(list, (a, e) => {
        let str = '';
        if (isList(e)) {
            str = `, ${toString(e)}`;
        } else {
            let string = '';
            if (typeof e === 'object') {
                string = JSON.stringify(e, null, 2);
            } else {
                string = String(e);
            }
            str = a ? `, ${string}` : string;
        }
        return a + str;
    }, '');
    return `(${strOfList})`;
};

// todo: need testing
const numberLists = l(1, 2,{name: 'll', cl: '213'}, l('qwe', 'rty'));
const res = reduce(numberLists, (e, a) => a + e, 0);
const len = length(numberLists);
const addedL = cons(2, numberLists);
console.log(toString(numberLists));
