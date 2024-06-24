import axios from "axios";
import { IUser } from "./types";

export const editUser: any = async (userId: any, user: IUser) => {
    try {
        const ADD_USER_URL = `https://gorest.co.in/public/v2/users/${userId}`
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender == 'other' ? 'male' : user.gender,
            status: user.status,
            field: new Date(),
            message: new Date()
        }
        const response = await axios.put(ADD_USER_URL, payload, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status == 200) {
            return response.data
        } else {
            return undefined
        }
    } catch (error) {
        console.log('err.message', error)
    }


}
