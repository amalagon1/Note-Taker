const util = require("util");
const fs = require("fs");
const { v1: uuidv1 } = require('uuid');
// const uuidv1 = require("uuid/v1");
const readFileAsync = util.promisify(fs.readFile);

class Store {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(note) {
        return fs.writeFileSync("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            console.log(notes);
            let jsonParsedNotes;

            try {
                jsonParsedNotes = [].concat(JSON.parse(notes));
            } catch (error) {
                jsonParsedNotes = [];
            }
            return jsonParsedNotes
        })
    }
    addNotes(note) {
        let {
            title, text
        } = note;
        let newNote = { title, text, id: uuidv1() };

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((modifiedNotes) => this.write(modifiedNotes))
            .then(() => newNote);

    }
    deleteNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));

    }
}
module.exports = new Store();