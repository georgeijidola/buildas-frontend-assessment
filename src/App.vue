<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Task Manager</h1>
    <TaskForm @taskAdded="handleTaskAdded" />
    <TaskList ref="taskList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'

const taskList = ref(null)

const handleTaskAdded = () => {
  if (taskList.value) {
    taskList.value.fetchTasks()
  }
}
</script>
