<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Task List</h2>
    <div class="grid grid-cols-3 gap-4 mb-4 font-bold">
      <div>Title</div>
      <div>Description</div>
      <div class="flex justify-end">Actions</div>
    </div>
    <ul class="list-none space-y-8">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex justify-between items-center mb-2">
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
              @click="deleteTaskFromList(task.id)"
              :class="['px-3 py-1 rounded-lg', 'bg-yellow-500 text-white']"
            >
              Delete
            </button>
          </div>
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

const deleteTaskFromList = async (taskId: string) => {
  await deleteTask(taskId)

  tasks.value = tasks.value.filter((task) => task.id !== taskId)
}

onMounted(fetchTasks)

defineExpose({ fetchTasks })
</script>
