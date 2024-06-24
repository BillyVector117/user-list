import axios from "axios";
import { INewUser } from "./types";

export const createUser: any = async (data: INewUser) => {
    try {
        const ADD_USER_URL = 'https://gorest.co.in/public/v2/users'
        const payload = {
            ...data,
            field: new Date(),
            status: "active",
            message: new Date()
        }
        const response = await axios.post(ADD_USER_URL, payload, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status == 201) {
            return response.data
        } else {
            return undefined
        }
    } catch (error) {
        console.log('err.message', error)
        return false
    }


}
