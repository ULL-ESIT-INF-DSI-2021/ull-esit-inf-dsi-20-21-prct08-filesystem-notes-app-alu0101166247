import 'mocha';
import {expect} from 'chai';
import {AddMapReduce} from '../../src/PE101/AddMapReduce';
import {SubMapReduce} from '../../src/PE101/SubMapReduce';
import {ProdMapReduce} from '../../src/PE101/ProdMapReduce';
import {DivMapReduce} from '../../src/PE101/DivMapReduce';

describe('Tests', () => {
  const add: AddMapReduce = new AddMapReduce([1, 2, 3, 4, 5, 6]);
  const sub: SubMapReduce = new SubMapReduce([1, 2, 3, 4, 5, 6, 7]);
  const prod: ProdMapReduce = new ProdMapReduce([1, 2, 3, 4, 5]);
  const div: DivMapReduce = new DivMapReduce([1, 2, 3, 4, 5, 6, 8]);

  it('add.run() returns value 60', () => {
    expect(add.run()).to.be.equal(60);
  });
  it('div.run() returns value 35', () => {
    expect(sub.run()).to.be.equal(35);
  });
  it('div.run() returns value 60', () => {
    expect(prod.run()).to.be.equal(60);
  });
  it('div.run() returns value 38.666666666666664', () => {
    expect(div.run()).to.be.equal(38.666666666666664);
  });
});
