import { sayHello } from './index';

describe('Unit test: index', () => {
  test('sayHello should print a message', () => {
    const spy = jest.spyOn(global.console, 'info').mockImplementation();

    sayHello();

    expect(spy.mock.calls.pop()).toEqual(['Hello World!']);
    spy.mockClear();
  });

  test('sayHello should print name in the message', () => {
    const spy = jest.spyOn(global.console, 'info').mockImplementation();

    sayHello('John');

    expect(spy.mock.calls.pop()).toEqual(['Hello John!']);
    spy.mockClear();
  });
});
