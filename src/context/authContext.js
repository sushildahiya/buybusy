import React, { createContext, useContext,  useEffect,  useState } from 'react'

const authContext = createContext()
function useValueAuth(){
    return useContext(authContext)
}
function CustomAuthContext({children}) {
    const [authentication,setAuthentication] = useState()   

    useEffect(()=>{
        const user=localStorage.getItem('user')
        if(user){
          setAuthentication(JSON.parse(user))
        }
    }
    ,[])

    const handleAuthentication =(data)=>{
      setAuthentication(data)
      localStorage.setItem('user',JSON.stringify(data))
    }

  return (
    <authContext.Provider value={{authentication,handleAuthentication}}>
        {children}
    </authContext.Provider>
  )
}

export {useValueAuth}
export default CustomAuthContext