import 'mocha';
import {expect} from 'chai';
import {AddMapReduce} from '../../src/PE101/AddMapReduce';
import {SubMapReduce} from '../../src/PE101/SubMapReduce';
import {ProdMapReduce} from '../../src/PE101/ProdMapReduce';
import {DivMapReduce} from '../../src/PE101/DivMapReduce';

describe('Tests', () => {
  const add: AddMapReduce = new AddMapReduce([1, 2, 3, 4, 5, 6]);
  add.run();
  const sub: SubMapReduce = new SubMapReduce([1, 2, 3, 4, 5, 6, 7]);
  sub.run();
  const prod: ProdMapReduce = new ProdMapReduce([1, 2, 3, 4, 5]);
  prod.run();
  const div: DivMapReduce = new DivMapReduce([1, 2, 3, 4, 5, 6, 8]);
  div.run();
  it('add.reduce() returns value 60', () => {
    expect(add.reduce()).to.be.equal(60);
  });
  it('div.reduce() returns value 35', () => {
    expect(sub.reduce()).to.be.equal(35);
  });
  it('div.reduce() returns value 60', () => {
    expect(prod.reduce()).to.be.equal(60);
  });
  it('div.reduce() returns value 38.666666666666664', () => {
    expect(div.reduce()).to.be.equal(38.666666666666664);
  });
});
