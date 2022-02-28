import axios from 'axios'
import { __baseURL } from '~/constant'

export const createBackup = async (): Promise<string> => {
  try {
    const res = await axios.get('backup/create')
    return res.data
  } catch (error) {
    throw new Error('Failed to create backup file')
  }
}

export const restore = async (filename: string): Promise<boolean> => {
  try {
    const res = await axios.get(`restore/${filename}`)
    return res.data
  } catch (error) {
    throw new Error(`Failed to restore. File using: ${filename}`)
  }
}

export const listBackup = async (): Promise<string[]> => {
  try {
    const res = await axios.get('backup')
    return res.data
  } catch (error) {
    throw new Error('Failed to get list backup')
  }
}

export const downloadBackup = (filename: string) => {
  const link = document.createElement('a')
  link.href = `${__baseURL}/backup/download/${filename}`
  link.target = '_blank'
  link.click()
}

export const deleteBackup = async (filename: string): Promise<boolean> => {
  try {
    const res = await axios.delete(`backup/${filename}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to delete file')
  }
}
