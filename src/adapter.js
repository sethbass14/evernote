class Adapter {
  static fetchNotes() {
    return fetch('http://localhost:3000/api/v1/notes').then(resp => resp.json())
  }

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

  // TODO check out the arguments!
  static postUpdateNote(note, title, body) {
    return fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({body: body, title: title})
    }).then(resp => resp.json())
  }

  static deleteNote(note) {
    return fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
      method: 'DELETE'
    }).then(resp => resp.json())
  }

}
