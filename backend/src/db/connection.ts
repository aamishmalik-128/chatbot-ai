import mongoose from 'mongoose'

 async function connectToDataBase(){
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if(!mongoUrl){
            throw new Error("MONGODB_URL is not defined in .env")
        }
        await mongoose.connect(mongoUrl)
        console.log("Mongo Db connected")
    } catch (error) {
        console.log(error)
        throw new Error("Cannot connect to MongoDB")
    }
}

async function disconnectFromDataBase(){
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error)
        throw new Error("Culdnot Disconnect from MongoDb")
        
    }
}


export  {connectToDataBase,disconnectFromDataBase}