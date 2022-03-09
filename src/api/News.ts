import axios from 'axios'
import { News } from '~/models/News'
import { PageEntity } from '~/models/PageEntity'

const apiUrl = 'news'

export const searchNewss = async (what?: string, where?: string, page = 1, size = 20): Promise<PageEntity<News>> => {
  try {
    const res = await axios.get(`${apiUrl}/search`, {
      params: {
        what,
        where,
        page: page - 1,
        size
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get events')
  }
}

export const getNews = async (size = 6, page = 0): Promise<News[]> => {
  try {
    const res = await axios.get(apiUrl, {
      params: {
        page,
        size
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get news')
  }
}

export const getNewsHome = async (limit = 9): Promise<News[]> => {
  try {
    const res = await axios.get(apiUrl, {
      params: {
        limit
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get news')
  }
}

export const getNewsById = async (id: any): Promise<News> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to get news')
  }
}

export const createNews = async (news: News): Promise<News> => {
  try {
    const res = await axios.post(apiUrl, news)
    return res.data
  } catch (error) {
    throw new Error('Failed to create news')
  }
}

export const deleteNews = async (id: string) => {
  try {
    const res = await axios.delete(`${apiUrl}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to delete news')
  }
}

export const updateNews = async (id: string, news: News): Promise<News> => {
  try {
    const res = await axios.put(`${apiUrl}/${id}`, news)
    return res.data
  } catch (error) {
    throw new Error('Failed to update news')
  }
}
