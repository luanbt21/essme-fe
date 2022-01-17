import axios from 'axios'
import { Event } from '~/models/Event'

const apiUrl = 'events'

export const searchEvents = async (what = '', where = ''): Promise<Event[]> => {
  try {
    const res = await axios.get(`${apiUrl}/search`, {
      params: {
        what,
        where
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get events')
  }
}

export const getEvents = async (size = 6, page = 0): Promise<Event[]> => {
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

export const getEventsById = async (id: string): Promise<Event> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to get events')
  }
}

export const createEvents = async (events: Event): Promise<Event> => {
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

export const updateEvents = async (id: string, events: Event): Promise<Event> => {
  try {
    const res = await axios.put(`${apiUrl}/${id}`, events)
    return res.data
  } catch (error) {
    throw new Error('Failed to update events')
  }
}
