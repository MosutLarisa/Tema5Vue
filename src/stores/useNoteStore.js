import { defineStore } from "pinia"
import axios from "axios"

export const useNoteStore = defineStore("note", {
  state: () => {
    return {
      notes: []
    }
  },

  actions: {
    fetchNotes() {
      axios.get("http://localhost:3000/api/notes").then(response => {
        this.notes = response.data
      })
    },

    addNote(newNote) {
      axios
        .post("http://localhost:3000/api/notes", newNote, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.notes.unshift(response.data)
        })
    },

    deleteNote(id) {
      axios
        .delete(`http://localhost:3000/api/notes/${id}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          this.notes = this.notes.filter(note => note.id !== id)
        })
    }
  }
})
