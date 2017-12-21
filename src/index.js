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

//Move this to eventhandlers.js
function showNoteListener(event) {
  if (event.target.id === "delete") {
    event.preventDefault()
    //TODO Should the code below be abstracted to take an id
    const note = Note.noteByTitle(`${event.target.nextSibling.nextSibling.innerHTML}`)
    Adapter.deleteNote(note).then(json => {
      Note.all = Note.all.filter(note =>
        //TODO abstract the code aboe the list method
        note.id !== json.id
      )
    })
    noteDelete(note)
    event.currentTarget.innerHTML = "<h1>POOF!</h1>"
  }
}

function noteDelete(note) {
  document.getElementById(`note-${note.id}`).remove()
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
