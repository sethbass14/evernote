document.addEventListener("DOMContentLoaded", () => {
    Adapter.fetchNotes().then(noteData => noteData.forEach( note =>  {
      const thisNote = new Note(note);
      showNoteTitle(thisNote)
    })
  );


  const formDiv = document.getElementById('note-form-div')
  const noteShowDiv = document.getElementById('note-container')

  document.getElementById('note-titles').addEventListener('click', noteTitleListener)

  document.getElementById('note-new').addEventListener('click', getFormHandler(formDiv))

  formDiv.addEventListener('click', noteFormListener)

  noteShowDiv.addEventListener('click', showNoteListener)
});


function showNoteTitle(note) {
  const noteDiv = document.getElementById("note-titles")
  noteDiv.innerHTML += note.renderTitle()
}

function showNote(note) {
  const noteShowDiv = document.getElementById("note-container")
  noteShowDiv.innerHTML = note.renderAll()
}

function showNoteListener(event) {
  console.log(event.target.id)
  if (event.target.id === "delete") {
    event.preventDefault()
    const note = Note.noteByTitle(`${event.target.nextSibling.nextSibling.innerHTML}`)
    Adapter.deleteNote(note)
    console.log(note)
    debugger
    noteDelete(note)
    event.currentTarget.innerHTML = "<h1>POOF!</h1>"
    //TODO some deleting in the memory
  }
}

function noteDelete(note) {
  console.log(note)
  debugger
  document.getElementById(`note-${note.id}`).remove()
  // console.log(Note.all.find(noteObj => noteObj.id === note.id))
  // //TODO delete the note from memory
}

function noteTitleListener(event){
  if (event.target.id !== 'note-titles'){
    const targetNote = Note.noteByTitle(event.target.id)
    showNote(targetNote)
  }
}

function noteFormListener(event) {
  if (event.target.id === 'note-submit') {
    event.preventDefault()
    newNote()
    event.currentTarget.innerHTML = ''
  }
}

function newNote() {
  const noteTitle = document.getElementById('new-note-title').value
  const noteBody = document.getElementById('new-note-body').value
  console.log(noteTitle)
  console.log(noteBody)
  const notePromise = Adapter.postNewNote(noteTitle, noteBody)
  notePromise.then(noteObj => new Note(noteObj)).then(note => {
     showNoteTitle(note);
     showNote(note)
  })
}
