import axios from "axios";

export const getUserById: any = async (userId: string) => {
    try {
        const GET_USER_URL = `https://gorest.co.in/public/v2/users/${userId}`
        const response = await axios.get(GET_USER_URL);
        if (response.status == 200) {
            return response.data
        } else {
            return undefined
        }
    } catch (error) {
        console.log('err.message', error)
    }


}
