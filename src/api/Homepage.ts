import axios from 'axios'
import { Homepage } from '~/models/Homepage'

const apiUrl = 'homepage'

export const getHomepage = async (): Promise<Homepage> => {
    try {
        const res = await axios.get(apiUrl, {
            params: {
            }
        })
        return res.data
    } catch (error) {
        throw new Error('Failed to get experts')
    }
}