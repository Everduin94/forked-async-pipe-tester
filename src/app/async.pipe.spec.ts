import { AsyncPipe } from './async.pipe';

describe('AsyncPipe', () => {
  it('create an instance', () => {
    const pipe = new AsyncPipe();
    expect(pipe).toBeTruthy();
  });
});
