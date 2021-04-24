/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import {colors, Note} from '../src/note';
import {User} from '../src/user';


describe('Note App Tests:', () => {
  // Notes
  const RedNote = new Note('Red Note', 'This is a red note', colors.red);
  const GreenNote = new Note('Green Note', 'This is a green note', colors.green);

  // User
  const Dany = new User('Dany', [RedNote]);

  // Note Tests
  it('RedNote.getTitle() returns value Red Note', () => {
    expect(RedNote.getTitle()).to.be.equal('Red Note');
  });
  it('RedNote.getBody() returns value This is a red note', () => {
    expect(RedNote.getBody()).to.be.equal('This is a red note');
  });
  it('RedNote.getColor() returns value Red', () => {
    expect(RedNote.getColor()).to.be.equal('Red');
  });

  // User tests
  it('Dany.getName() returns value Dany', () => {
    expect(Dany.getName()).to.be.equal('Dany');
  });
  it('Dany.getNotes() returns value [RedNote]', () => {
    expect(Dany.getNotes()).to.deep.equal([RedNote]);
  });
  it('Dany.addNote(GreenNote) and Dany.getNotes() returns value [RedNote, GreenNote]', () => {
    Dany.addNote(GreenNote);
    expect(Dany.getNotes()).to.deep.equal([RedNote, GreenNote]);
  });
  it('Dany.removeNote(RedNote) and Dany.getNotes() returns value [RedNote, GreenNote]', () => {
    Dany.removeNote(RedNote);
    expect(Dany.getNotes()).to.deep.equal([GreenNote]);
  });
});
