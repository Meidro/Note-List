import {Note} from './types'

class NoteList {
   getNotes() {
      const storageNotes = localStorage.getItem('notes')
      if (storageNotes) return JSON.parse(storageNotes)
   }
   setNotes(notes: Note[]) {
      localStorage.setItem('notes', JSON.stringify(notes))
   }
   getCurrentNote() {
      const storageCurrentNote = localStorage.getItem('currentNote')
      if (storageCurrentNote) {
         return JSON.parse(storageCurrentNote)
      }
   }
   setCurrentNote(currentNote: Note) {
      localStorage.setItem('currentNote', JSON.stringify(currentNote))
   }
}

export const storage = new NoteList()
