import axios from 'axios'
import { Event } from '~/models/Event'
import { PageEntity } from '~/models/PageEntity'

const apiUrl = 'events'

export const searchEvents = async (what?: string, where?: string, page = 1, size = 20): Promise<PageEntity<Event>> => {
  try {
    const res = await axios.get(`${apiUrl}/search`, {
      params: {
        what,
        where,
        page,
        size
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get events')
  }
}

export const getEvents = async (limit = 20): Promise<Event[]> => {
  try {
    const res = await axios.get(apiUrl, {
      params: {
        limit
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
