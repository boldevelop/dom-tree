/**
 * constructor for pair
 * @constructor
 * @param {*} a - значение.
 * @param {*} b - значение.
 * @returns {function}
 */
export const cons = (a, b) => (message) => {
    switch (message) {
        case 'car':
            return a;
        case 'cdr':
            return b;
        case 'type':
            return 'pair';
        default:
            throw new Error(`Unknown message for pair: '${message}'`);
    }
};

/**
 * type check
 * @param {function:pair} p - пара.
 * @returns {boolean}
 */
export const isPair = (p) => typeof p === 'function' && p('type') === 'pair';

/**
 * validation pair
 * @param {function:pair} p - пара.
 */
const _checkPair = (p) => {
    if (!isPair(p)) {
        throw new Error(`This is not a pair: '${p}'`);
    }
};

/**
 * get first value
 * @param {function:pair} p - пара.
 * @returns {*}
 */
export const car = (p) => {
    _checkPair(p);
    return p('car');
};

/**
 * get second value
 * @param {function:pair} p - пара.
 * @returns {*}
 */
export const cdr = (p) => {
    _checkPair(p);
    return p('cdr');
};


/**
 * presentation pair as a string
 * @param {function:pair} pair - пара.
 * @returns {string}
 */
export const toString = (pair) => {
    _checkPair(pair);
    const iterateChild = (p) => {
        if (!isPair(p)) {
            return String(p);
        }
        const left = car(p);
        const right = cdr(p);
        return `(${iterateChild(left)}, ${iterateChild(right)})`;
    };
    return iterateChild(pair);
};
