import axios from "axios";
import { useCallback, useState } from "react";
// import { authApi } from "../api/Auth";

const instance=axios.create({
    baseURL:'http://localhost:8000/api',
    withCredentials:true
})

export const useAxios=()=>{
    const [token,setToken]=useState('')
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)


    const sendRequest=useCallback(async (config,cb)=>{
        setLoading(true)
        setError(null)
        setToken('')
        try {
            if(token){
                config.headers={
                    Authorization:`Bearer ${token}`
                }
            }
            const result=await instance.request(config)
            if(result?.data && cb){
                cb(result.data.data)
            }
        } catch (error) {
            console.log(error)
            setError(error?.response?.data||error)
        }finally{
            setLoading(false)
        }
        
    },[token])
    return {error,loading,sendRequest}
}