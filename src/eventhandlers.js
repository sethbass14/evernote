//Event Handlers deal with html that needs to be generated dynamically.
function getFormHandler(domElement) {
    return function newNoteForm(event) {
      if (!domElement.children.length) {
        const noteForm = document.createElement('form')
        noteForm.id = 'new-note-form'
        noteForm.innerHTML = '<label for="new-note-title">Note Title</label><input id="new-note-title" name="new-note-title" placeholder="title"></input><label for="note-body">Body</label><textarea for="new-note-body" id="new-note-body" name="new-note-body"></textarea><input type="submit" id="note-submit" value="Create New Note"></input>'
        domElement.appendChild(noteForm)
      } else {
        domElement.innerHTML = ''
      }
  }
}

// function showNoteListener(event) {
//   if (event.target.id === "delete") {
//     event.preventDefault()
//     //TODO Should the code below be abstracted to take an id
//     const note = Note.noteByTitle(`${event.target.nextSibling.nextSibling.innerHTML}`)
//     Adapter.deleteNote(note).then(json => {
//       Note.all = Note.all.filter(note =>
//         //TODO abstract the code aboe the list method
//         note.id !== json.id
//       )
//     })
//     noteDelete(note)
//     event.currentTarget.innerHTML = "<h1>POOF!</h1>"
//   }
// }
