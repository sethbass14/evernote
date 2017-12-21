//Event Handlers deal with html that needs to be generated dynamically.
function getFormHandler(domElement) {
    return function newNoteForm(event) {
      if (!domElement.children.length) {
        const noteForm = document.createElement('form')
        noteForm.id = 'new-note-form'
        noteForm.innerHTML = '<label for="new-note-title">Note Title</label><input id="new-note-title" name="new-note-title" placeholder="title"></input><label for="note-body">Body</label><textarea for="new-note-body" id="new-note-body" name="new-note-body"></textarea><input type="submit" id="note-submit" value="Create New Note"></input>'
        domElement.appendChild(noteForm)
      } else {
        removeForm()
      }
  }
}

function noteTitleListener(domElement){
  return function(event){
    if (event.target.id !== 'note-titles'){
      const targetNote = Note.noteByTitle(event.target.id)
      removeForm()
      showNote(targetNote, domElement)
    }
  }
}

function noteFormListener(domElement) {
  return function(event) {
    if (event.target.id === 'note-submit') {
      event.preventDefault()
      newNote(domElement)
      event.currentTarget.innerHTML = ''
    } else if (event.target.id === 'edit-submit') {
      event.preventDefault()
      editNote(Note.noteById(parseInt(event.target.dataset.id)))
      event.currentTarget.innerHTML = ''
    }
  }
}

function newNote(domElement) {
  const noteTitle = document.getElementById('new-note-title').value
  const noteBody = document.getElementById('new-note-body').value
  const notePromise = Adapter.postNewNote(noteTitle, noteBody)
  notePromise.then(noteObj => new Note(noteObj)).then(note => {
     showNoteTitle(note);
     console.log(domElement)
     showNote(note, domElement)
  })
}


function showNote(note, domElement) {
  console.log(domElement)
  domElement.innerHTML = note.renderAll()
}
