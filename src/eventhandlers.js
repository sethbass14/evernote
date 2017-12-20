//Event Handlers deal with html that needs to be generated dynamically. 

function newNoteForm(domElement) {
  const noteForm = document.createElement('form')
  noteForm.id = 'new-note-form'
  noteForm.innerHTML = '<label for="new-note-title">Note Title</label><input id="new-note-title" name="new-note-title" placeholder="title"></input><label for="note-body">Body</label><textarea for="new-note-body" id="new-note-body" name="new-note-body"></textarea><input type="submit" id="note-submit" value="Create New Note"></input>'
  domElement.appendChild(noteForm)
}
