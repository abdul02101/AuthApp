import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User{
    email: string;
    password: string;
}


interface UsersState {
    users: User[];
    user: User | null;
    message: string;
}



const initialState: UsersState = {
    users: [],
    user: null,
    message: 'Добро пожаловать !',
}

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<User>){
            state.users.push(action.payload)
        },
        loginUser(state, action: PayloadAction<User>){
            state.user = {...action.payload}
        },
        logoutUser(state,){
            state.user = null
        },
        changeUserPass(state, action: PayloadAction<User>){
            state.users.forEach(el => {
                if(el.email === action.payload.email){
                    el.password = action.payload.password
                    state.user = {...el}
                }
            })
            
        },
        getMessage(state, action: PayloadAction<string>){
            state.message = action.payload
        },
    },
})


export const { addUser, loginUser, logoutUser, changeUserPass,getMessage } = usersSlice.actions

export default usersSlice.reducer