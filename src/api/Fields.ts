import axios from 'axios'
import { Fields } from '~/models/Fields'

const apiUrl = 'homepage/fields'

export const getFields = async (): Promise<Fields[]> => {
  try {
    const res = await axios.get(apiUrl, {

    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get fields')
  }
}

export const getFieldsById = async (id: string): Promise<Fields> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to get fields')
  }
}

export const createFields = async (fields: Fields): Promise<Fields> => {
  try {
    const res = await axios.post(apiUrl, fields)
    return res.data
  } catch (error) {
    throw new Error('Failed to create fields')
  }
}

export const deleteFields = async (id: string) => {
  try {
    const res = await axios.delete(`${apiUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to delete fields')
  }
}

export const updateFields = async (id: string, fields: Fields): Promise<Fields> => {
  try {
    const res = await axios.put(`${apiUrl}/${id}`, fields)
    return res.data
  } catch (error) {
    throw new Error('Failed to update fields')
  }
}
