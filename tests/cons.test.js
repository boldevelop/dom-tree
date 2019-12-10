import * as cons from '../core/cons';

const pair = cons.cons(1, 2);

test('pair: ', () => {
    expect(cons.isPair(pair)).toBe(true);
    expect(cons.isPair(false)).toBe(false);
    expect(cons.car(pair)).toBe(1);
    expect(cons.cdr(pair)).toBe(2);
    expect(cons.toString(pair)).toBe('(1, 2)');
});
