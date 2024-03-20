import { jwtDecode } from "jwt-decode";
import {createContext, useEffect, useState } from "react"


   export const UserContext = createContext();

    // eslint-disable-next-line react/prop-types
    const UserContextProvaider = ({children})=>{
        const[userToken , setUserToken] = useState(localStorage.getItem("userToken"));
        const[userName , setUserName] = useState(null);
       // eslint-disable-next-line react-hooks/exhaustive-deps
       const getUserData = ()=>{
          if(userToken!=null){
            const decode = jwtDecode(userToken) ;
            setUserName(decode.userName)
        }
       };
        useEffect(()=>{
        getUserData()
        }, [getUserData, userToken]);
        
        return <UserContext.Provider value={{userName , setUserToken , setUserName}}>
            {children}
        </UserContext.Provider>;
    }

    export default UserContextProvaider;
