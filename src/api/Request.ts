import axios from 'axios'
import { Request } from '~/models/Request'
import { PageEntity } from '~/models/PageEntity'


const apiUrl = 'requests'

export const getRequest = async (page = 1, size = 6, sort = 'createdAt', desc = false): Promise<PageEntity<Request>> => {
    try {
        const res = await axios.get(apiUrl, {
            params: {
                page: page - 1,
                size,
                sort,
                desc
            }
        })
        return res.data
    } catch (error) {
        throw new Error('Failed to get requests')
    }
}

export const getRequestById = async (id: string): Promise<Request> => {
    try {
        const res = await axios.get(`${apiUrl}/${id}`)
        return res.data
    } catch (error) {
        throw new Error('Failed to get request')
    }
}