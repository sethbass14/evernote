class Adapter {
  static fetchNotes() {
    return fetch('http://localhost:3000/api/v1/notes').then(resp => resp.json())
  }

  // TODO Take off this last bit after testing
  static postNewNote(title, body) {
    return fetch('http://localhost:3000/api/v1/notes', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({body: body, title: title})
    }).then(resp => resp.json())
  }

  // TODO take off the last of instantiation
  // TODO check out the arguments!
  static postUpdateNote(title, body) {
    return fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({body: body, title: title})
    }).then(resp => resp.json()).then(noteObj => new Note(noteObj))
  }

  static deleteNote(note) {
    fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
      method: 'DELETE'
    })
  }

}
