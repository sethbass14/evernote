
 class Note {
    constructor(noteObj) {
      this.id = noteObj.id;
      this.title = noteObj.title;
      this.body = noteObj.body;
      Note.all.push(this);
    }

    renderAll() {
      return `<div class="note" id="note-${this.id}"> <h1>${this.title}</h1><p>${this.body}</p></div>`
    }

    renderTitle(){
      return `<div class="note-title" id="note-${this.id}"> <h3 id="${this.title}">${this.title}</h3></div>`
    }

    static noteByTitle(title) {
      return Note.all.find( note => note.title === title)
    }

  }

Note.all = [];
