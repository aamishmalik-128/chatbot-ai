import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const loginUser = async (email: string, password: string) => {
  console.log("Sending request...");

  const res = await api.post(
    "http://localhost:5000/api/v1/user/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  console.log(res);

  return res.data;
};

export const checkAuthStatus = async()=>{
  const res = await api.get('/user/auth-status')
  if(res.status!=200){
    throw new Error ("Unable to authenticate")
  }
  const data = await res.data;
  return data
}
export const sendChatRequest = async (message:string)=>{
  const res = await api.post('/chat/new',{message})
   if(res.status!=200){
    throw new Error ("Unable to send Chat")
  }
  const data = await res.data;
  return data
}
export const signupUser = async (name: string, email: string, password: string) => {
  const res = await api.post("/user/signup", { name, email, password });
  if (res.status !== 200) {
    throw new Error("Unable to signup");
  }
  return res.data;
};