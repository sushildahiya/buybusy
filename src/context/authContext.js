import React, { createContext, useContext,  useState } from 'react'

const authContext = createContext()
function useValueAuth(){
    return useContext(authContext)
}
function CustomAuthContext({children}) {
    const [authentication,setAuthentication] = useState()   

  return (
    <authContext.Provider value={{authentication,setAuthentication}}>
        {children}
    </authContext.Provider>
  )
}

export {useValueAuth}
export default CustomAuthContext