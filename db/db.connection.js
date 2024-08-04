import mongoose from "mongoose"


const connectToDb = ()=>{
    mongoose.connect(process.env.dbConnection)
    .then(()=>{console.log("db is connected")})
    .catch((error)=>{console.error(error)})
}
export {connectToDb}