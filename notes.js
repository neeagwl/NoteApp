const fs=require("fs");
const chalk=require("chalk");

const readNote=(title)=>{
    const notes=loadNotes();
    const foundNote=notes.find(note=>note.title===title);
    debugger
    if(foundNote){
        console.log(chalk.inverse(foundNote.title));
        console.log(chalk.yellow.inverse(foundNote.body));
    }else{
        console.log(chalk.red.inverse("Note not found!"))
    }
}

const listNotes=()=>{
    const notes=loadNotes();
    if(notes.length===0){
        console.log(chalk.red.inverse("No Note found!"))
    }else{
        console.log(chalk.blue.inverse("Your Notes-"));
        notes.forEach(note => {
            console.log(chalk.cyan.inverse(note.title));
        });
    }
}

const addNote=function(title,body){
    const notes=loadNotes();
    const duplicateNote=notes.find(note=>note.title===title);
    if(!duplicateNote){
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("Successfully added a new note!"));
    }
    else{
        console.log(chalk.red.inverse("Title aready in use!"))
    }
}

const removeNote=(title)=>{
    const notes=loadNotes();
    const allNotes=notes.filter(note=>note.title!==title);
    if(allNotes.length===notes.length){
        console.log(chalk.red.inverse("Note not found!"));
    }else{
        saveNotes(allNotes);
        console.log(chalk.green.inverse("Successfully removed the note!"))
    }
}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync("notes.json");
        const dataJSON= dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}

const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes);
    fs.writeFileSync("notes.json",dataJSON);
}

module.exports={
    readNote,
    addNote,
    removeNote,
    listNotes
}