import * as list from '../core/list';

const numberLists = list.l(1, 2, 3, 4, 5);
const array = [1, 2, 3, 4, 5];
test('list', () => {
    // isList
    expect(list.isList(numberLists)).toBe(true);

    // toString
    expect(list.toString(numberLists))
        .toBe('(1, 2, 3, 4, 5)');

    // head
    expect(list.head(numberLists)).toBe(1);

    // tail
    expect(list.toString(list.tail(numberLists)))
        .toBe('(2, 3, 4, 5)');

    // isEmpty
    expect(list.isEmpty(list.l())).toBe(true);

    // reverse
    expect(list.toString(list.reverse(numberLists)))
        .toBe('(5, 4, 3, 2, 1)');

    // reduce
    expect(list.reduce(numberLists,
        (a, e) => a + e, 0))
        .toBe(array.reduce(
            (a, e) => a + e
        ));

    // length
    expect(list.length(numberLists)).toBe(5);
    expect(list.length(list.l())).toBe(0);

    // cons
    expect(list.head(list.cons(0, numberLists)))
        .toBe(0);
    expect(list.toString(list.cons(6, numberLists, 1)))
        .toBe('(1, 6, 2, 3, 4, 5)');
    expect(list.toString(list.cons(6, numberLists, 10)))
        .toBe('(1, 2, 3, 4, 5, 6)');

    // convertToArray
    expect(list.convertToArray(numberLists))
        .toStrictEqual(array);

});
