<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Task List</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="mb-4 p-4 border rounded-lg">
        <h3 class="text-xl font-semibold">{{ task.title }}</h3>
        <p class="text-gray-600">{{ task.description }}</p>
        <div class="mt-2">
          <button
            @click="toggleTaskCompletion(task)"
            :class="[
              'px-3 py-1 rounded-lg',
              task.isCompleted ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white',
            ]"
            :disabled="task.isCompleted"
          >
            {{ task.isCompleted ? 'Is Completed' : 'Mark as completed' }}
          </button>
        </div>

        <div class="mt-2">
          <button
            @click="deleteTask(task.id)"
            :class="['px-3 py-1 rounded-lg', 'bg-yellow-500 text-white']"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { deleteTask, getTasks, updateTask } from '@/services/api'

const tasks = ref([])

const fetchTasks = async () => {
  try {
    tasks.value = await getTasks()
  } catch (error) {
    console.error(error)
    alert('Failed to fetch tasks. Please try again.')
  }
}

const toggleTaskCompletion = async (task: {
  id: string
  isCompleted: boolean
  title: string
  description: string
}) => {
  try {
    const updatedTask = await updateTask(task.id, { isCompleted: !task.isCompleted })

    const index = tasks.value.findIndex((t) => t.id === updatedTask.id)

    if (index !== -1) {
      tasks.value[index] = updatedTask
    }
  } catch (error) {
    console.error(error)
    alert('Failed to update task. Please try again.')
  }
}

onMounted(fetchTasks)

defineExpose({ fetchTasks })
</script>
