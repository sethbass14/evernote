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

function removeForm() {
  const formDiv = document.getElementById('note-form-div')
  formDiv.innerHTML = ''
}


function noteTitleListener(event){
  if (event.target.id !== 'note-titles'){
    const targetNote = Note.noteByTitle(event.target.id)
    removeForm()
    showNote(targetNote)
  }
}

function noteFormListener(event) {
  if (event.target.id === 'note-submit') {
    event.preventDefault()
    newNote()
    event.currentTarget.innerHTML = ''
  } else if (event.target.id === 'edit-submit') {
    event.preventDefault()
    editNote(Note.noteById(parseInt(event.target.dataset.id)))
    event.currentTarget.innerHTML = ''
  }
}

//Look at all of this
function editNote(note) {
  const noteTitle = document.getElementById('edit-note-title').value
  const noteBody = document.getElementById('edit-note-body').value
  const noteH3 = document.getElementById(note.title)
  note.title = noteTitle
  note.body = noteBody
  noteH3.innerHTML = note.title
  noteH3.id = note.title
  Adapter.postUpdateNote(note, noteTitle, noteBody)
  showNote(note)
}

function newNote() {
  const noteTitle = document.getElementById('new-note-title').value
  const noteBody = document.getElementById('new-note-body').value
  const notePromise = Adapter.postNewNote(noteTitle, noteBody)
  notePromise.then(noteObj => new Note(noteObj)).then(note => {
     showNoteTitle(note);
     showNote(note)
  })
}
