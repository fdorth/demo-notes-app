const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
  try {
    const databuffer = fs.readFileSync('notes.json');
    const dataJSON = databuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if(!duplicateNote) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.bgGreen('New note added!'));
  } else {
    console.log(chalk.bgRed('Note title taken!'));
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title); 

  if (notes.length > notesToKeep.length) {
    console.log(chalk.bgGreen('Note removed'))
  } else {
    console.log(chalk.bgRed('Note not found'))
  }

  saveNotes(notesToKeep);
}

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bgBlue('Your notes:'));
  console.log('---------');
  notes.forEach(note => {
    console.log(`Title - ${note.title}`)  
  });
}

const readNote = (title) => {
  const notes = loadNotes();
  const searchedNote = notes.find(note => note.title === title);

  if (searchedNote) {
    console.log(chalk.bgGreen('Note found!'));
    console.log(`Title: ${searchedNote.title}`);
    console.log(`Body: ${searchedNote.body}`);
  } else {
    console.log(chalk.bgRed('Note not found!'));
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};