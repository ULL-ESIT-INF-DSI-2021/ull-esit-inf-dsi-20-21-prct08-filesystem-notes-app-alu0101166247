/* eslint-disable max-len */
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {readFile, writeFile} from 'fs';
import {User} from './user';
import {colors, Note} from './note';

const users: User[] = [];

/**
 * Funcion que muestra en pantalla las notas de un usuario
 * @param user Usuario
 */
function printNotes(user: User) {
  const notes: Note[] = user.getNotes();
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].getColor() === colors.blue) {
      console.log(chalk.blue(notes[i].getTitle()));
    }
    if (notes[i].getColor() === colors.green) {
      console.log(chalk.green(notes[i].getTitle()));
    }
    if (notes[i].getColor() === colors.red) {
      console.log(chalk.red(notes[i].getTitle()));
    }
    if (notes[i].getColor() === colors.yellow) {
      console.log(chalk.yellow(notes[i].getTitle()));
    }
  }
}

/**
 * Funcion para dar formato JSON a una nota
 * @param note Nota a dar formato
 * @returns String con la nota en formato JSON
 */
function jsonFormat(note: Note): string {
  let output: string = '';
  output += '{\n';
  output += '   \"Title\": \"' + note.getTitle() + '\",\n';
  output += '   \"Body\": \"' + note.getBody() + '\",\n';
  output += '   \"Color\": \"' + note.getColor() + '\"\n';
  output += '}\n';
  return output;
}

/**
 * Funcion que guarda un registro con los usuarios existentes
 * @returns String con el formato del registro
 */
function saveUsersFormat(): string {
  let output: string = '';
  for (let i = 0; i < users.length; i++) {
    if (i === users.length-1) {
      output += users[i].getName() + ' ' + users[i].getNotes().length;
    } else {
      output += users[i].getName() + ' ' + users[i].getNotes().length + '\n';
    }
  }
  return output;
}

/**
 * Funcion que actualiza el JSON del usuario modificado
 * @param user Usuario
 */
function saveData(user: string) {
  for (let i = 0; i < users.length; i++) {
    if (user === users[i].getName()) {
      const shell = require('shelljs');
      const fs = require('fs');
      const dir = 'notes/' + users[i].getName();
      if (fs.existsSync(dir)) {
        shell.rm('-r', 'notes/' + users[i].getName());
      }
      shell.mkdir('-p', 'notes/' + users[i].getName());
      for (let j = 0; j < users[i].getNotes().length; j++) {
        writeFile('notes/' + user + '/' + j + '.json', jsonFormat(users[i].getNotes()[j]), (err) => {
          if (err) {
            console.log(chalk.red('ERROR'));
          }
        });
      }
      writeFile('notes/users.txt', saveUsersFormat(), (err) => {
        if (err) {
          console.log(chalk.red('ERROR'));
        }
      });
    }
  }
}

/**
 * Funcion que carga en un vector todos los usuarios y sus notas de los JSON
 */
function loadDB() {
  readFile('notes/users.txt', (err, data) => {
    if (err) {
      console.log(chalk.red('Users.txt not found!'));
    } else {
      const usersTxt = data.toString().split(/[' ''\n']/);
      for (let i = 0; i < usersTxt.length; i++) {
        const NUser = new User(usersTxt[i], []);
        for (let j = 0; j < Number(usersTxt[i+1]); j++) {
          readFile('notes/' + usersTxt[i] + '/' + j + '.json', (_err, dat) => {
            const dataTxt = dat.toString().split('\"');
            let k = 1;
            const note = new Note('', '', colors.blue);
            k+=2;
            note.setTitle(dataTxt[k]);
            k+=4;
            note.setBody(dataTxt[k]);
            k+=4;
            if (dataTxt[k] === colors.blue) {
              note.setColor(colors.blue);
            }
            if (dataTxt[k] === colors.green) {
              note.setColor(colors.green);
            }
            if (dataTxt[k] === colors.red) {
              note.setColor(colors.red);
            }
            if (dataTxt[k] === colors.yellow) {
              note.setColor(colors.yellow);
            }
            NUser.addNote(note);
          });
        }
        users.push(NUser);
        i++;
      }
    }
  });
}

/**
 * Funcion de Delay
 * @param ms Milisegundos
 * @returns Wait
 */
function delay(ms: number) {
  return new Promise( (resolve) => setTimeout(resolve, ms) );
}

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

/**
 * List Command
 */
yargs.command({
  command: 'list',
  describe: 'List user notes',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      let flag: boolean = false;
      for (let i = 0; i < users.length; i++) {
        if (argv.user === users[i].getName()) {
          flag = true;
          console.log(chalk.green('Your notes:'));
          printNotes(users[i]);
        }
      }
      if (!flag) {
        console.log(chalk.red('User not found'));
      }
    }
  },
});

/**
 * Modify command
 */
yargs.command({
  command: 'modify',
  describe: 'Modify a note',
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
      if (typeof argv.title === 'string') {
        if (typeof argv.body === 'string') {
          if (typeof argv.color === 'string') {
            for (let i = 0; i < users.length; i++) {
              if (argv.user === users[i].getName()) {
                Uexist = true;
                for (let j = 0; j < users[i].getNotes().length; j++) {
                  if (argv.title === users[i].getNotes()[j].getTitle()) {
                    Nexist = true;
                    // logic
                    const note = new Note(argv.title, argv.body, colors.blue);
                    if (argv.color === 'green') {
                      note.setColor(colors.green);
                    }
                    if (argv.color === 'red') {
                      note.setColor(colors.red);
                    }
                    if (argv.color === 'yellow') {
                      note.setColor(colors.yellow);
                    }
                    users[i].removeNote(users[i].getNotes()[j]);
                    users[i].addNote(note);
                  }
                }
              }
            }
            if (!Uexist) {
              console.log(chalk.red('User not found'));
            } else {
              if (!Nexist) {
                console.log(chalk.red('Note not found'));
              } else {
                console.log(chalk.green('Updated note!'));
                saveData(argv.user);
              }
            }
          }
        }
      }
    }
  },
});

/**
 * remove Command
 */
yargs.command({
  command: 'remove',
  describe: 'Remove note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      let flag: boolean = false;
      for (let i = 0; i < users.length; i++) {
        if (argv.user === users[i].getName()) {
          if (typeof argv.title === 'string') {
            for (let j = 0; j < users[i].getNotes().length; j++) {
              if (argv.title === users[i].getNotes()[j].getTitle()) {
                users[i].removeNote(users[i].getNotes()[j]);
                flag = true;
                console.log(chalk.green('Note removed!'));
              }
            }
          }
        }
      }
      if (!flag) {
        console.log(chalk.red('User or Note not found'));
      }
      saveData(argv.user);
    }
  },
});

/**
 * Read Command
 */
yargs.command({
  command: 'read',
  describe: 'Read note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      let Nexist: boolean = false;
      for (let i = 0; i < users.length; i++) {
        if (argv.user === users[i].getName()) {
          if (typeof argv.title === 'string') {
            for (let j = 0; j < users[i].getNotes().length; j++) {
              if (argv.title === users[i].getNotes()[j].getTitle()) {
                Nexist = true;
                if (users[i].getNotes()[j].getColor() === colors.blue) {
                  console.log(chalk.blue(users[i].getNotes()[j].getTitle()));
                  console.log(chalk.blue(users[i].getNotes()[j].getBody()));
                }
                if (users[i].getNotes()[j].getColor() === colors.green) {
                  console.log(chalk.green(users[i].getNotes()[j].getTitle()));
                  console.log(chalk.green(users[i].getNotes()[j].getBody()));
                }
                if (users[i].getNotes()[j].getColor() === colors.red) {
                  console.log(chalk.red(users[i].getNotes()[j].getTitle()));
                  console.log(chalk.red(users[i].getNotes()[j].getBody()));
                }
                if (users[i].getNotes()[j].getColor() === colors.yellow) {
                  console.log(chalk.yellow(users[i].getNotes()[j].getTitle()));
                  console.log(chalk.yellow(users[i].getNotes()[j].getBody()));
                }
              }
            }
          }
        }
      }
      if (!Nexist) {
        console.log(chalk.red('Note not found'));
      }
    }
  },
});

/**
 * Main
 */
(async () => {
  loadDB();
  await delay(500);
  yargs.parse();
})();
