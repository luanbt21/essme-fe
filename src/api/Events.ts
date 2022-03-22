import axios from 'axios'
import { Event } from '~/models/Event'
import { PageEntity } from '~/models/PageEntity'

const apiUrl = 'events'

export interface TypeCount {
  _id: string
  quantity: number
}

export const getEventTypes = async (): Promise<TypeCount[]> => {
  try {
    const res = await axios.get(`${apiUrl}/type`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getEventTags = async (): Promise<TypeCount[]> => {
  try {
    const res = await axios.get(`${apiUrl}/tag`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const searchEvents = async (
  what?: string,
  where?: string,
  types?: string,
  tags?: string,
  page = 1,
  size = 6
): Promise<PageEntity<Event>> => {
  try {
    const res = await axios.get(`${apiUrl}/search`, {
      params: {
        what,
        where,
        types,
        tags,
        page: page - 1,
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
