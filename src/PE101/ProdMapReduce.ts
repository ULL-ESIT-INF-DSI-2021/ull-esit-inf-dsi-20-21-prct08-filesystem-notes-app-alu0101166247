import {MapReduce} from './MapReduce';
/**
 * Clase ProdMapReduce
 */
export class ProdMapReduce extends MapReduce {
  /**
     * Constructor
     * @param list Lista
     */
  constructor(list: number[]) {
    super(list, function(number) {
      return number * 3;
    });
  }
  /**
   * Funcion Reduce local
   * @returns resultado
   */
  protected reduce(): number {
    let aux: number = 0;
    this.list.forEach((number) => {
      aux += number;
    });
    return aux;
  }
}
