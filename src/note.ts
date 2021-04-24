/* eslint-disable no-unused-vars */
/**
 * Enumerable con los colores disponibles para las notas
 */
export enum colors {
  red = 'Red',
  green = 'Green',
  blue = 'Blue',
  yellow = 'Yellow'}

/**
 * Clase para representar una nota
 */
export class Note {
  /**
   * Constructor de la clase nota
   * @param title Titulo de la nota
   * @param body Cuerpo de la nota
   * @param color Color de la nota
   */
  constructor(
    private title: string,
    private body: string,
    private color: colors) { }

  /**
   * Get del titulo de la nota
   * @returns Titulo de la nota
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * Set para cambiar el titulo a una nota
   * @param title Nuevo titulo
   */
  public setTitle(title: string): void {
    this.title = title;
  }

  /**
   * Get para el cuerpo de la nota
   * @returns El cuerpo
   */
  public getBody(): string {
    return this.body;
  }

  /**
   * Set para cambiar el cuerpo de la nota
   * @param body Nuevo cuerpo
   */
  public setBody(body: string): void {
    this.body = body;
  }

  /**
   * Get del color de la nota
   * @returns Color de la nota
   */
  public getColor(): colors {
    return this.color;
  }

  /**
   * Set para cambiar el color a una nota
   * @param color Nuevo color
   */
  public setColor(color: colors): void {
    this.color = color;
  }
}
