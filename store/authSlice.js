import {createSlice} from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


const reducers = {
    login(state,action){
        localStorage.setItem('user',action.payload.id)
        localStorage.setItem('role',action.payload.role)
        state.user = localStorage.getItem('user')
        state.role = localStorage.getItem('role')
    },
    logout(state,action){
        Cookies.remove('token')
        localStorage.clear()
        state.user = null
        state.role = null
        
          
    },
    setLoading(state,action){
        state.isLoading = action.payload
    }
}

const initialState = {
    user:null,
    role:null,
    isLoading:false
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers
})

export const authReducer = authSlice.reducer

export const authAction = authSlice.actions