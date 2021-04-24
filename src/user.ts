import {Note} from './note';

/**
 * Clase para representar un Usuario
 */
export class User {
  /**
   * Constructor de la clase User
   * @param name Nombre del usuario
   * @param notes Notas del usuario
   */
  constructor(
        private name: string,
        private notes: Note[]) { }

  /**
   * Get del nombre del usuario
   * @returns Nombre
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Get para las notas del usuario
   * @returns Notas del usuario
   */
  public getNotes(): Note[] {
    return this.notes;
  }

  /**
   * Funcion para agregar una nota al usuario
   * @param note Nueva nota
   * @returns Boolean
   */
  public addNote(note: Note): boolean {
    const index = this.notes.indexOf(note, 0);
    if (index > -1) {
      return false;
    } else {
      this.notes.push(note);
      return true;
    }
  }

  /**
   * Funcion para eliminar una nota al usuario
   * @param note Nota a eliminar
   * @returns Boolean
   */
  public removeNote(note : Note): boolean {
    const index = this.notes.indexOf(note, 0);
    if (index > -1) {
      this.notes.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
