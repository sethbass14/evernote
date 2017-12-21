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

function showNoteListener(event) {
  event.preventDefault()
  const note = Note.noteById(parseInt(event.target.dataset.noteId))
  console.log(note)
  if (event.target.id === "delete") {
    Adapter.deleteNote(note).then(json => Note.deleteNoteMemory(json))
    document.getElementById(`note-${note.id}`).remove()
    removeForm()
    event.currentTarget.innerHTML = "<h1>POOF!</h1>"
  } else if (event.target.id ==="edit" && !document.getElementById('note-form-div').children.length) {
    renderEditForm(note)
  }
}

function renderEditForm(note) {
   const formDiv = document.getElementById('note-form-div')
   const noteForm = document.createElement('form')
   noteForm.id = 'new-note-form'
   noteForm.dataset.id = note.id
   noteForm.innerHTML = `<label for="edit-note-title">Note Title</label><input id="edit-note-title" name="new-note-title" value="${note.title}"></input><label for="note-body">Body</label><textarea for="edit-note-body" id="edit-note-body" name="edit-note-body">${note.body}</textarea><input type="submit" id="edit-submit" data-id="${note.id}"value="Edit Note"></input>`
   formDiv.appendChild(noteForm)
 }
