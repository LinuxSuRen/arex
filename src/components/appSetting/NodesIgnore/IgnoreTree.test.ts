import { parseIgnoreObject } from './IgnoreTree';

const IgnoreObject_0 = {
  string: 'hello world',
  number: '123456',
};

const parsedObject_0 = [
  { key: 'string/', title: 'string', value: 'hello world' },
  { key: 'number/', title: 'number', value: '123456' },
];

test('parseSimpleIgnoreObject', () => {
  expect(parseIgnoreObject(IgnoreObject_0)).toEqual(parsedObject_0);
});

const IgnoreObject_1 = {
  string: 'hello world',
  number: '123456',
  arrayString: ['hello', 'world'],
  object: {
    string: 'hello world',
    number: '123456',
    arrayString: ['hello', 'world'],
  },
  objectArray: [
    {
      string: 'hello world',
      number: '123456',
      arrayString: ['hello', 'world'],
    },
    {
      string: 'hello world',
      number: '123456',
      arrayString: ['hello', 'world'],
    },
  ],
};

const parsedObject_1 = [
  { key: 'string/', title: 'string', value: 'hello world' },
  { key: 'number/', title: 'number', value: '123456' },
  {
    key: 'arrayString/',
    title: 'arrayString',
    value: ['hello', 'world'],
  },
  {
    key: 'object/',
    title: 'object',
    children: [
      { key: 'object/string/', title: 'string', value: 'hello world' },
      { key: 'object/number/', title: 'number', value: '123456' },
      {
        key: 'object/arrayString/',
        title: 'arrayString',
        value: ['hello', 'world'],
      },
    ],
  },
  {
    key: 'objectArray/',
    title: 'objectArray',
    children: [
      { key: 'objectArray/string/', title: 'string', value: 'hello world' },
      { key: 'objectArray/number/', title: 'number', value: '123456' },
      {
        key: 'objectArray/arrayString/',
        title: 'arrayString',
        value: ['hello', 'world'],
      },
    ],
  },
];

test('parseNestIgnoreObject', () => {
  expect(parseIgnoreObject(IgnoreObject_1)).toEqual(parsedObject_1);
});
