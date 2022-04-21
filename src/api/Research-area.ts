import axios from 'axios'
import { ResearchArea } from '~/models/Research-area'

const apiUrl = 'research_area'

export const getField = async (): Promise<ResearchArea[]> => {
  try {
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    throw new Error('Failed to get field')
  }
}

export const searchField = async (name: string): Promise<ResearchArea> => {
  try {
    const res = await axios.get(`${apiUrl}/search`, {
      params: {
        name
      }
    })
    return res.data
  } catch (error) {
    throw new Error('Failed to get field')
  }
}
