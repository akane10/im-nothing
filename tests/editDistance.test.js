const getEditDistance = require('../src/helper/edit-distance');

const dataTest = [
  // [value test, behavior, expected]
  [['hello', 'helo'], 'should get', 1],
  [['hola', 'hi'], 'should get', 3],
  [['haha', 'hehe'], 'should get', 2],
  [['jaja', 'hahah'], 'should get', 3]
];

describe.each(dataTest)(
  'test getEditDistance',
  (valueTest, behavior, expected) => {
    const [str1, str2] = valueTest;
    test(`given "${str1}" and "${str2}" ${behavior} ${expected}`, () => {
      expect(getEditDistance(str1, str2)).toBe(expected);
    });
  }
);

// describe('test getEditDistance', () => {
//   const str = 'hello';
//   const str1 = 'helo';

//   test(`success`, () => {
//     expect(getEditDistance(str, str1)).toBe(1);
//   });
// });
