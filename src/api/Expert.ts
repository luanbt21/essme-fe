import axios from 'axios'
import { Expert } from '~/models/Expert'

const apiUrl = 'experts'

<<<<<<< Updated upstream
export const getExperts = async (size = 6, page = 0, sort = 'name', desc = false): Promise<Expert[]> => {
=======
export const getExperts = async (page = 0, size = 30, sort = 'name', asc = true): Promise<Expert[]> => {
>>>>>>> Stashed changes
    try {
        const res = await axios.get(apiUrl, {
            params: {
                page,
                size,
                sort,
<<<<<<< Updated upstream
                desc
=======
                asc
>>>>>>> Stashed changes
            }
        })
        return res.data
    } catch (error) {
<<<<<<< Updated upstream
        throw new Error('Failed to get news')
    }
}

// export const getExpertById = async (id: string): Promise<Expert | undefined> => {
//     try {
//         const res = await axios.get(`${apiUrl}/${id}`)
//         return res.data
//     } catch (error) {
//         throw new Error('Failed to load experts')
//     }
// }

// export const searchExperts = async (what: string): Promise<Expert[]> => {
//     try {
//         const res = await axios.get(`${apiUrl}/search`, { params: { what } })
//         return res.data
//     } catch (error) {
//         throw new Error('Failed to load experts')
//     }
// }

// export const fieldsExperts = async () => {
//     try {
//         const res = await axios.get(`${apiUrl}/field`)
//         return res.data
//     } catch (error) {
//         throw new Error()
//     }
// }

// export const deleteExpertById = async (id: string): Promise<boolean> => {
//     try {
//         const res = await axios.delete(`${apiUrl}/${id}`)
//         return res.status === 200
//     } catch (error) {
//         throw new Error('Failed to delete expert')
//     }
// }

// export const createExpert = async (expert: Expert): Promise<Expert | undefined> => {
//     try {
//         const res = await axios.post(apiUrl, expert)
//         return res.data
//     } catch (error) {
//         throw new Error('Failed to create expert')
//     }
// }

// export const updateExpertById = async (id: string, expert: Expert): Promise<Expert | undefined> => {
//     try {
//         const res = await axios.put(`${apiUrl}/${id}`, expert)
//         return res.data
//     } catch (error) {
//         throw new Error('Failed to update expert')
//     }
// }
=======
        throw new Error('Failed to load experts')
    }
}

export const getExpertById = async (id: string): Promise<Expert | undefined> => {
    try {
        const res = await axios.get(`${apiUrl}/${id}`)
        return res.data
    } catch (error) {
        throw new Error('Failed to load experts')
    }
}

export const searchExperts = async (what: string): Promise<Expert[]> => {
    try {
        const res = await axios.get(`${apiUrl}/search`, { params: { what } })
        return res.data
    } catch (error) {
        throw new Error('Failed to load experts')
    }
}

export const fieldsExperts = async () => {
    try {
        const res = await axios.get(`${apiUrl}/field`)
        return res.data
    } catch (error) {
        throw new Error()
    }
}

export const deleteExpertById = async (id: string): Promise<boolean> => {
    try {
        const res = await axios.delete(`${apiUrl}/${id}`)
        return res.status === 200
    } catch (error) {
        throw new Error('Failed to delete expert')
    }
}

export const createExpert = async (expert: Expert): Promise<Expert | undefined> => {
    try {
        const res = await axios.post(apiUrl, expert)
        return res.data
    } catch (error) {
        throw new Error('Failed to create expert')
    }
}

export const updateExpertById = async (id: string, expert: Expert): Promise<Expert | undefined> => {
    try {
        const res = await axios.put(`${apiUrl}/${id}`, expert)
        return res.data
    } catch (error) {
        throw new Error('Failed to update expert')
    }
}
>>>>>>> Stashed changes
