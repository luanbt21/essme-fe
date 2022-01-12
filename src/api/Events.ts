import axios from 'axios'
import { Events } from '~/models/Events'

const apiUrl = 'events'

export const getEvents = async (size = 6, page = 0): Promise<Events[]> => {
  try {
    const res = await axios.get(apiUrl, {
      params: {
        page,
        size
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get events')
  }
}

export const getEventsById = async (id: string): Promise<Events> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to get events')
  }
}

export const createEvents = async (events: Events): Promise<Events> => {
  try {
    const res = await axios.post(apiUrl, events)
    return res.data
  } catch (error) {
    throw new Error('Failed to create events')
  }
}

export const deleteEvents = async (id: string) => {
  try {
    const res = await axios.delete(`${apiUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to delete events')
  }
}

export const updateEvents = async (id: string, events: Events): Promise<Events> => {
  try {
    const res = await axios.put(`${apiUrl}/${id}`, events)
    return res.data
  } catch (error) {
    throw new Error('Failed to update events')
  }
}
