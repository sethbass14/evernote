document.addEventListener("DOMContentLoaded", () => {
    Adapter.fetchNotes().then(noteData => noteData.forEach( note =>  {
      const thisNote = new Note(note);
      showNoteTitle(thisNote)
    })
  );


  const formDiv = document.getElementById('note-form-div')
  const noteShowDiv = document.getElementById('note-container')

  document.getElementById('note-titles').addEventListener('click', noteTitleListener(noteShowDiv))

  document.getElementById('note-new').addEventListener('click', getFormHandler(formDiv))

  // Abstract this to the eventhandlers file
  formDiv.addEventListener('click', noteFormListener(noteShowDiv))
  // Abstract this to the eventhandles file
  noteShowDiv.addEventListener('click', showNoteListener)
});


function showNoteTitle(note) {
  const noteDiv = document.getElementById("note-titles")
  noteDiv.innerHTML += note.renderTitle()
}

// function showNote(note) {
//   const noteShowDiv = document.getElementById("note-container")
//   noteShowDiv.innerHTML = note.renderAll()
// }

//Move this to eventhandlers.js
function showNoteListener(event) {
  const note = Note.noteById(parseInt(event.target.dataset.noteId))
  console.log(note)
  if (event.target.id === "delete") {
    event.preventDefault()
    console.log(note)
    //TODO Should the code below be abstracted to take an id
    Adapter.deleteNote(note).then(json => {
      Note.all = Note.all.filter(note =>
        //TODO abstract the code aboe the list method
        note.id !== json.id
      )
    })
    noteDelete(note)
    removeForm()
    event.currentTarget.innerHTML = "<h1>POOF!</h1>"
  } else if (event.target.id ==="edit" && !document.getElementById('note-form-div').children.length) {
    event.preventDefault()
    renderEditForm(note)
  }
}

function removeForm() {
  const formDiv = document.getElementById('note-form-div')
  formDiv.innerHTML = ''
}

function renderEditForm(note) {
     const formDiv = document.getElementById('note-form-div')
     const noteForm = document.createElement('form')
     noteForm.id = 'new-note-form'
     noteForm.dataset.id = note.id
     noteForm.innerHTML = `<label for="edit-note-title">Note Title</label><input id="edit-note-title" name="new-note-title" value="${note.title}"></input><label for="note-body">Body</label><textarea for="edit-note-body" id="edit-note-body" name="edit-note-body">${note.body}</textarea><input type="submit" id="edit-submit" data-id="${note.id}"value="Edit Note"></input>`
     formDiv.appendChild(noteForm)
 }

function noteDelete(note) {
  document.getElementById(`note-${note.id}`).remove()
}

// function noteTitleListener(event){
//   if (event.target.id !== 'note-titles'){
//     const targetNote = Note.noteByTitle(event.target.id)
//     removeForm()
//     showNote(targetNote)
//   }
// }

// function noteFormListener(event) {
//   if (event.target.id === 'note-submit') {
//     event.preventDefault()
//     newNote()
//     event.currentTarget.innerHTML = ''
//   } else if (event.target.id === 'edit-submit') {
//     event.preventDefault()
//     editNote(Note.noteById(parseInt(event.target.dataset.id)))
//     event.currentTarget.innerHTML = ''
//   }
// }

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
