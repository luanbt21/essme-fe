import axios from 'axios'
import { Experts } from '~/models/Experts'
import { PageEntity } from '~/models/PageEntity'
const apiUrl = 'experts'

export interface FieldsType {
  _id: string
  quantity: number
}

export const getExpertByUid = async (uid: string): Promise<Experts> => {
  try {
    const res = await axios.get(`${apiUrl}/uid/${uid}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to get Expert')
  }
}

export const deleteExpert = async (id: string): Promise<Experts> => {
  try {
    const res = await axios.delete(`${apiUrl}/uid/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Failed to delete Expert')
  }
}

export const getExpertstop = async (size = 6, page = 0): Promise<Experts[]> => {
  try {
    const res = await axios.get(`${apiUrl}/top`, {
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
export const getExperts = async (size = 50, page = 0): Promise<Experts[]> => {
  try {
    const res = await axios.get(`${apiUrl}/top`, {
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
export const getExperts1 = async (limit = 100, sortBy = 'research_area', asc = true): Promise<Experts[]> => {
  try {
    const res = await axios.get(apiUrl, {
      params: {
        limit,
        sortBy,
        asc
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get experts')
  }
}
export const searchExperts = async (
  what?: string,
  where?: string,
  page = 1,
  size = 100000
): Promise<PageEntity<Experts>> => {
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
    throw new Error('Failed to get experts')
  }
}

export const searchExperts1 = async (
  what?: string,
  radius = 5,
  page = 1,
  size = 100,
  asc = true
): Promise<PageEntity<Experts>> => {
  try {
    const res = await axios.get(`${apiUrl}/search`, {
      params: {
        what,
        radius,
        page: page - 1,
        size,
        asc
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get experts')
  }
}

export const whatSuggesten = async (
  what?: string,
  size = 10,
  lang = 'en'
): Promise<{ suggestion: { what: string } }> => {
  try {
    const res = await axios.get('https://api.vietsearch.org/api/suggestions/what', {
      params: {
        what,
        size,
        lang
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const whereSuggesten = async (
  where?: string,
  size = 10,
  lang = 'en'
): Promise<{ suggestion: { where: string } }> => {
  try {
    const res = await axios.get('https://api.vietsearch.org/api/suggestions/where', {
      params: {
        where,
        size,
        lang
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}
export const whatSuggestvi = async (
  what?: string,
  size = 10,
  lang = 'vi'
): Promise<{ suggestion: { what: string } }> => {
  try {
    const res = await axios.get('https://api.vietsearch.org/api/suggestions/what', {
      params: {
        what,
        size,
        lang
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const whereSuggestvi = async (
  where?: string,
  size = 10,
  lang = 'vi'
): Promise<{ suggestion: { where: string } }> => {
  try {
    const res = await axios.get('https://api.vietsearch.org/api/suggestions/where', {
      params: {
        where,
        size,
        lang
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}
export const fieldsExpertsen = async (lang = 'en'): Promise<FieldsType[]> => {
  try {
    const res = await axios.get(`${apiUrl}/field`, {
      params: {
        lang
      }
    })
    return res.data
  } catch (error) {
    throw new Error()
  }
}
export const fieldsExpertsvi = async (lang = 'vi'): Promise<FieldsType[]> => {
  try {
    const res = await axios.get(`${apiUrl}/field`, {
      params: {
        lang
      }
    })
    return res.data
  } catch (error) {
    throw new Error()
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
export const getRelatedExperts = async (id: string, limit = 10, skip = 0): Promise<Experts[]> => {
  try {
    const res = await axios.get(`${apiUrl}/${id}/related`, {
      params: {
        limit,
        skip
      }
    })
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
