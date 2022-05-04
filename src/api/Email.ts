import axios from 'axios'
import { __baseURL } from '~/constant'

const apiUrl = 'mail'

export const sendMail = async (email: string): Promise<string> => {
    try {
        const res = await axios.get(`${apiUrl}`, {
            params: {
                email
            }
        })
        return res.data
    } catch (error) {
        throw new Error('Failed to send mail')
    }
}