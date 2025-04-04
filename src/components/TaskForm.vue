<template>
  <form @submit.prevent="handleSubmit" class="mb-8">
    <div class="mb-4">
      <label for="title" class="block text-gray-700 font-bold mb-2"
        >Title</label
      >
      <input
        type="text"
        id="title"
        v-model="title"
        required
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="mb-4">
      <label for="description" class="block text-gray-700 font-bold mb-2"
        >Description</label
      >
      <textarea
        id="description"
        v-model="description"
        required
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Add Task
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createTask } from '@/services/api'

const title = ref('')
const description = ref('')

const emit = defineEmits(['taskAdded'])

const handleSubmit = async () => {
  try {
    const newTask = await createTask({
      title: title.value,
      description: description.value,
    })
    emit('taskAdded', newTask)
    title.value = ''
    description.value = ''
  } catch (error) {
    console.error(error)
    alert('Failed to add task. Please try again.')
  }
}
</script>
