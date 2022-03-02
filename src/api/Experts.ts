import axios from 'axios'
import { Experts } from '~/models/Experts'

const apiUrl = 'experts'

export const getExperts = async (size = 6, page = 0): Promise<Experts[]> => {
  try {
    const res = await axios.get(apiUrl, {
      params: {
        page,
        size
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get experts')
  }
}

export const getExpertsById = async (id: string): Promise<Experts> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to get experts')
  }
}

export const createExperts = async (experts: Experts): Promise<Experts> => {
  try {
    const res = await axios.post(apiUrl, experts)
    return res.data
  } catch (error) {
    throw new Error('Failed to create experts')
  }
}

export const deleteExperts = async (id: string) => {
  try {
    const res = await axios.delete(`${apiUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to delete experts')
  }
}

export const updateExperts = async (id: string, experts: Experts): Promise<Experts> => {
  try {
    const res = await axios.put(`${apiUrl}/${id}`, experts)
    return res.data
  } catch (error) {
    throw new Error('Failed to update experts')
  }
}
