const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "My personal notes!"
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {

        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        const success = chalk.green.bold.inverse;
        console.log(success('New note added!'));
    } else {
        const fail = chalk.red.bold.inverse;
        console.log(fail('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const filteredNotes = notes.filter((note) => note.title != title);

    if (filteredNotes.length != notes.length) {
        saveNotes(filteredNotes);

        const success = chalk.green.bold.inverse;
        console.log(success('Note removed!'));
    } else {
        const fail = chalk.red.bold.inverse;
        console.log(fail('Note not found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bold.inverse("Your notes:"))
    notes.forEach(note => console.log(note.title));
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch (e) {
        return [];
    }
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}