import {MapReduce} from './MapReduce';

export class SubMapReduce extends MapReduce {
  constructor(list: number[]) {
    super(list, function(number) {
      return number - 3;
    });
  }
  public reduce(): number {
    let aux: number = 0;
    this.list.forEach((number) => {
      aux += number;
    });
    return aux;
  }
}
