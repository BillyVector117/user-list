import axios from "axios";

export const removeUser: any = async (userId: any) => {
    try {
        const ADD_USER_URL = `https://gorest.co.in/public/v2/users/${userId}`
        const response = await axios.delete(ADD_USER_URL, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status == 204) {
            return true
        } else {
            return undefined
        }
    } catch (error) {
        console.log('err.message', error)
    }


}
