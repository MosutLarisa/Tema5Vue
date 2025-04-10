<script setup>
import { onMounted } from "vue"
import { useNoteStore } from "../stores/useNoteStore"
import NoteCard from "../components/NoteCard.vue"
import axios from "axios"

const noteStore = useNoteStore()

onMounted(() => {
    noteStore.fetchNotes()
})

const handleDelete = (id) => {
    noteStore.deleteNote(id)
        .then(() => {
            console.log("Note deleted!");
        })
        .catch((err) => {
            console.error("Delete failed", err);
        });
}

</script>

<template>
    <main class="flex-1 p-6">
        <h1 class="mb-4 text-xl font-semibold">Note Lists</h1>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NoteCard v-for="note in noteStore.notes" :key="note.id" :note="note" @delete="handleDelete" />
        </div>
    </main>
</template>