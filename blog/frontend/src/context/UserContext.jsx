import { createContext, useEffect } from "react"
import { useState } from "react"
import { URL } from "../url"
import axios from "axios"
export const UserContext=createContext({}) 

export function UserContextProvider({children})
    {
        const [user,setuser]=useState(null)

        useEffect(()=>
        {
             getUser()
        },[])
        const getUser=async()=>
            {
                try
                {
                    const res=await axios.get(URL+"/api/auth/refetch",{withCredentials:true})
                    setuser(res.data)
                    
                }
                catch(err)
                {
                    console.log(err)
                }
            }
        return (<UserContext.Provider value={{user,setuser}}>
             {children}
        </UserContext.Provider>)
    }