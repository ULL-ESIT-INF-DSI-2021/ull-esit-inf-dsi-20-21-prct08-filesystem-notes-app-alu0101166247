/* eslint-disable max-len */
/**
 * Clase abstracta MapReduce
 */
export abstract class MapReduce {
  constructor(
        protected list: number[],
        protected func: (list: number)=>number) {
  }
  public run() {
    console.log('\nList: ' + this.list + '\n');
    this.map(this.func);
    console.log('After Map: ' + this.list + '\n');
    console.log('Reduce: ' + this.reduce() + '\n');
  }
  protected map(func: (list: number)=>number): void {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i] += func(this.list[i]);
    }
  }
  protected abstract reduce(): number;
}
