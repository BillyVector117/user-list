// slices/userSlice.js
import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import type { IGetAllUsers, IUser, UserSlice } from "./types";
import axios from "axios";

// api call
export const fetchUsers: any = createAsyncThunk(
    "users/getAllUsers",
    async (thunkApi) => {
        try {
            const response = await axios.get('https://gorest.co.in/public/v2/users')
            const data: IGetAllUsers[] = response.data;
            const mappingData = data.map((item) => {
                return {
                    ...item, avatar: item.gender == 'male' ? 'https://preview.redd.it/trying-to-come-up-with-a-new-avatar-for-my-various-social-v0-wby69l6e1lsb1.jpg?width=519&format=pjpg&auto=webp&s=61341c3ce447f8356da3146c1903395fc43d28dc' : 'https://play-lh.googleusercontent.com/hTqvbjIphBRFMzApP86RCGf-ljtFZ_Jaoeq49X31M_AIOJtiX7oIzpWQlsXBcoOIQA=w540-h302-rw'
                }
            })

            return mappingData;
        } catch (error) {
            console.log('err.message', error)
        }
    }
);

const initialState: UserSlice = {
    users: [],
    loading: false,
    value: 10,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        increment: (state) => {
            state.value++;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action) => {
            const userFound = state.users.find(user => user.id === action.payload)
            if (userFound) {
                state.users.splice(state.users.indexOf(userFound), 1)
            }

        },
        updateUser: (state, action) => {
            const { id, name, email, gender, status } = action.payload
            const foundUser = state.users.find(user => user.id == id)
            if (foundUser) {
                foundUser.name = name
                foundUser.email = email
                foundUser.gender = gender
                foundUser.status = status
            }

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = [...action.payload];
        });

        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true;
        });
    },
});

export const { increment, addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;