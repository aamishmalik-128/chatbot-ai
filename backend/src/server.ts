import app from '../src/app'
import { connectToDataBase } from './db/connection';
//listner

const PORT = 5000;
connectToDataBase().then(()=>{
    app.listen(PORT,()=>console.log('Server is Open'))
}).catch((err)=>console.log(err))

