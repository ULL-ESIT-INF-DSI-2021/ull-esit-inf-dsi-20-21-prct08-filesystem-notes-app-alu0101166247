/* eslint-disable max-len */
/**
 * Clase abstracta MapReduce
 */
export abstract class MapReduce {
  /**
     * Constructor
     * @param list lista
     * @param func funcion
     */
  constructor(
        protected list: number[],
        protected func: (list: number)=>number) {
  }
  /**
   * Run que ejecuta el Map y luego el Reduce y muestra en pantalla
   */
  public run(): number {
    this.map(this.func);
    return this.reduce();
  }
  /**
   * Funcion Map
   * @param func Funcion a calcular
   */
  protected map(func: (list: number)=>number): void {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i] += func(this.list[i]);
    }
  }
  /**
   * Funcion Reduce
   */
  protected abstract reduce(): number;
}
