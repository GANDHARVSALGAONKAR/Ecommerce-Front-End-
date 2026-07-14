import { createContext, useEffect, useState } from "react";

export const LoginContext=createContext()

export const LoginProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [token,setToken]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false)

    useEffect(()=>{
        const storedUser=JSON.parse(localStorage.getItem("user"));
       const storedToken= localStorage.getItem("token");

       if(storedUser && storedToken)
       {
        setUser(storedUser);
        setToken(storedToken);
        setIsAuthenticated(true);
       }
    },[])

    const login=(token,user)=>{
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(user))
        setUser(user);
        setToken(token);
    }

    const logout=()=>{
        localStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
    };

    return <LoginContext.Provider value={{login,logout,user,token,isAuthenticated}}>
        {children}
    </LoginContext.Provider>

}