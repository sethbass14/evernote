document.addEventListener("DOMContentLoaded", () => {
    Adapter.fetchNotes().then(noteData => noteData.forEach( note =>  {
      const thisNote = new Note(note);
      showNoteTitle(thisNote)
    })
  );


  const formDiv = document.getElementById('note-form-div')
  // document.getElementById('note-titles').addEventListener('click', noteShowListener)
  document.getElementById('note-titles').addEventListener('click', noteShowListener)
  // Moved newNoteForm to evenhandlers.js
  // document.getElementById('note-new').addEventListener('click', event => newNoteForm(formDiv))
  document.getElementById('note-new').addEventListener('click', getFormHandler(formDiv))

  document.getElementById('note-form-div').addEventListener('click', noteFormListener)
});

function showNoteTitle(note) {
  const noteDiv = document.getElementById("note-titles")
  noteDiv.innerHTML += note.renderTitle()
}

function showNote(note) {
  const noteShowDiv = document.getElementById("note-container")
  noteShowDiv.innerHTML = note.renderAll()
}


function noteShowListener(event){
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
