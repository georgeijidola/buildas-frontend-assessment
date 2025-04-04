import axios from 'axios'
import { getIpAddress } from './get-ip'

const API_URL = 'http://localhost:3000/api/v1' // Replace with your NestJS API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createTask = async (task: { title: string; description: string }) => {
  try {
    const ipAddress = await getIpAddress()

    const response = await api.post('tasks', task, {
      params: {
        ipAddress,
      },
    })

    return response.data
  } catch (error) {
    console.log('error =>', error)

    throw new Error('Failed to create task')
  }
}

export const getTasks = async () => {
  try {
    const ipAddress = await getIpAddress()

    const response = await api.get('/tasks', {
      params: {
        ipAddress,
      },
    })

    return response.data
  } catch (error) {
    console.log('error =>', error)

    throw new Error('Failed to fetch tasks')
  }
}

export const updateTask = async (id: string, task: { isCompleted: boolean }) => {
  try {
    const ipAddress = await getIpAddress()

    const response = await api.patch(`/tasks/${id}`, task, {
      params: {
        ipAddress,
      },
    })

    return response.data
  } catch (error) {
    console.log('error =>', error)

    throw new Error('Failed to update task')
  }
}

export const deleteTask = async (id: string) => {
  try {
    const ipAddress = await getIpAddress()

    const response = await api.delete(`tasks/${id}`, {
      params: {
        ipAddress,
      },
    })

    return response.data
  } catch (error) {
    console.log('error =>', error)

    throw new Error('Failed to delete task')
  }
}
