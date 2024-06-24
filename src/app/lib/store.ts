import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/app/lib/reducers/userSlice";


export function makeStore() {
    return configureStore({
        reducer: {
            user: userReducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });
}

export const store = makeStore();