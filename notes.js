const fs = require('fs');
const chalk = require('chalk');

function getNotes() {
    return "My personal notes!"
}

const addNote = function(title, body) {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    });

    if(duplicateNotes.length === 0){

        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);

        console.log('New note added!');
    } else {
        console.log('Note title taken!');
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const filteredNotes = notes.filter(function (note) {
        return note.title != title;
    });

    if (filteredNotes.length != notes.length){
        saveNotes(filteredNotes);
        
        const success = chalk.green.bold.inverse;
        console.log(success('Note removed!'));
    } else {
        const fail = chalk.red.bold.inverse;
        console.log(fail('Note not found!'));
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function () {
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
    removeNote: removeNote
}