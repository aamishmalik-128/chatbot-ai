import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { checkAuthStatus, loginUser, signupUser } from "../helpers/api-communicator";

type User ={
    name:string;
    email:string
}

type UserAuth={
    isLoggedIn:boolean;
    user: User | null;
    login:(email:string,password:string)=>Promise<void>
    signup:(name:string,email:string,password:string)=>Promise<void>
    logout:()=>Promise<void>
}
const AuthConext = createContext<UserAuth | null>(null);

export const AuthProvider = ({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn]=useState(false);

    useEffect(()=>{
        //fetch is the user's cookies are valid then skip login
        async function checkStatus(){
            const data = await checkAuthStatus()
            if(data){
                setUser({email:data.email,name:data.name})
                setIsLoggedIn(true)

            }
        }
        checkStatus()
    },[])

    const login=async(email:string,password:string)=>{
        const data = await loginUser(email,password);
        if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true)
        }
    }
    const signup = async (name: string, email: string, password: string) => {
  const data = await signupUser(name, email, password);
  if (data) {
    setUser({ email: data.email, name: data.name });
    setIsLoggedIn(true);
  }
};
  
    const logout=async()=>{

    }

    const value ={
        user,
        isLoggedIn,login,logout,signup
    };
    return(
        <AuthConext.Provider value={value}>
            {children}
        </AuthConext.Provider>
    )

}


export const useAuth =()=>useContext(AuthConext);