import axios from 'axios'
import { Question } from '~/models/Question'

const apiUrl = 'questions'

export const getQuestion = async (limit = 3, sort = 'createdAt', desc = false): Promise<Question[]> => {
    try {
        const res = await axios.get(apiUrl, {
            params: {
                limit,
                sort,
                desc
            }
        })
        return res.data
    } catch (error) {
        throw new Error('Failed to get questions')
    }
}

export const getQuestionById = async (id: string): Promise<Question> => {
    try {
        const res = await axios.get(`${apiUrl}/${id}`)
        return res.data
    } catch (error) {
        throw new Error('Failed to get Question')
    }
}

export const getQuestionByCustomerID = async (customerID: string): Promise<Question[]> => {
    try {
        const res = await axios.get(`${apiUrl}/byCustomerId/${customerID}`)
        return res.data
    } catch (error) {
        throw new Error('Failed to get Question')
    }
}