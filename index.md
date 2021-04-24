![Logo](img/logo.jpg)

##### José Daniel Fuentes Marra alu0101166247@ull.edu.es
# Informe de la práctica 8
## Aplicación de procesamiento de notas de texto

## Introducción
 
En esta practica se pide crear un especie de aplicación de gestión de notas multi-usuario para ser usada a través de comandos desde la terminal.
## Objetivo
 
El objetivo de esta práctica es crear esta aplicación haciendo uso de 3 herramientas las cuales son:

[Chalk](https://www.npmjs.com/package/chalk): Nos permite cambiar el color de la salida por consola de texto.
[Yargs](https://www.npmjs.com/package/yargs): Nos permite configurar comandos para interactuar con un programa desde la terminal enviándole parámetros.
[API síncrona de Node.js (fs)](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_synchronous_api): Nos permite leer o escribir archivos desde nuestro programa para guardar o cargar información almacenada en ficheros, entre otras funciones mas avanzadas.

## Contenido 

Para empezar decidí crear 2 clases (Note y User) para poder implementar correctamente el objetivo de la practica que seria tener usuarios y que cada usuario tenga una lista de notas propias las cuales tienen titulo, cuerpo y color cada una.

La clase Note seria la siguiente:

```ts
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
```

Como se puede ver esta clase representa una nota y tiene el titulo de la nota, el cuerpo de la nota y su color. También cuenta con los get y set correspondientes para esos atributos.

Para el manejo de los colores decidí crear un enum el cual contiene los colores disponibles para la aplicación y seria el siguiente:

```ts
export enum colors {
  red = 'Red',
  green = 'Green',
  blue = 'Blue',
  yellow = 'Yellow'}
```

De esta manera el atributo color de la clase Note es de tipo colors que es el enum.

Por otro lado la clase User seria la siguiente:

```ts
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
```

Esta clase representa un usuario y tiene como atributos el nombre del usuario y un arreglo de notas de tipo Note para almacenar las notas de cada usuario. 

Esta clase también cuenta con los get y set correspondientes pero aparte tiene dos funciones que serian (addNote y removeNote), addNote seria para agregarle notas al usuario cuando se crean y remove para eliminar una nota existente del usuario.

Esta es la estructura y las clases con las que cuenta mi aplicación, ahora pasare a explicar el fichero note-app.ts el cual implementa las 3 herramientas antes mencionadas y hace uso de las dos clases anteriores.

Para empezar implemente los siguientes imports para el uso de las herramientas y clases:

```ts
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {readFile, writeFile} from 'fs';
import {User} from './user';
import {colors, Note} from './note';
```

Para el manejo de los usuarios y sus notas yo uso un vector de usuarios:

```ts
const users: User[] = [];
```

En este vector cargo al inicio de la ejecución la información de los JSON de los usuarios y sus notas para trabajar en el vector durante la ejecución de los comandos yargs y cuando termino las modificaciones vuelvo a pasar la información del vector actualizado a los JSON correspondientes.

La información de los usuarios y sus notas las guardo con la siguiente estructura:



A continuación explicare los comandos que implemente para el uso de Yargs que son:

Comando ADD:
```ts
/**
 * Add command
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Note User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note Color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    let Uexist: boolean = false;
    let Nexist: boolean = false;
    if (typeof argv.user === 'string') {
      for (let i = 0; i < users.length; i++) {
        if (argv.user === users[i].getName()) {
          Uexist = true;
          if (typeof argv.title === 'string') {
            for (let j = 0; j < users[i].getNotes().length; j++) {
              if (argv.title === users[i].getNotes()[j].getTitle()) {
                Nexist = true;
              }
            }
          }
        }
      }
      if (!Uexist) {
        const newUser = new User(argv.user, []);
        if (typeof argv.title === 'string') {
          const title: string = argv.title;
          if (typeof argv.body === 'string') {
            const body: string = argv.body;
            if (typeof argv.color === 'string') {
              if (argv.color === 'blue') {
                const note = new Note(title, body, colors.blue);
                newUser.addNote(note);
                users.push(newUser);
              }
              if (argv.color === 'green') {
                const note = new Note(title, body, colors.green);
                newUser.addNote(note);
                users.push(newUser);
              }
              if (argv.color === 'red') {
                const note = new Note(title, body, colors.red);
                newUser.addNote(note);
                users.push(newUser);
              }
              if (argv.color === 'yellow') {
                const note = new Note(title, body, colors.yellow);
                newUser.addNote(note);
                users.push(newUser);
              }
            }
          }
        }
      }
      if (Nexist) {
        console.log(chalk.red('Note title taken!'));
      } else {
        if (Uexist) {
          if (typeof argv.title === 'string') {
            const title: string = argv.title;
            if (typeof argv.body === 'string') {
              const body: string = argv.body;
              if (typeof argv.color === 'string') {
                const note = new Note(title, body, colors.blue);
                if (argv.color === 'green') {
                  note.setColor(colors.green);
                }
                if (argv.color === 'red') {
                  note.setColor(colors.red);
                }
                if (argv.color === 'yellow') {
                  note.setColor(colors.yellow);
                }
                for (let k = 0; k < users.length; k++) {
                  if (argv.user === users[k].getName()) {
                    users[k].addNote(note);
                  }
                }
              }
            }
          }
        }
        console.log(chalk.green('New note added!'));
        saveData(argv.user);
      }
    }
  },
});
```

Este comando recibe 4 parámetros de la linea de comandos que son: user, title, body y color. 

Lo que hace es 