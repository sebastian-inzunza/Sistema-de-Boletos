import {connect} from "mongoose"
import {MONGOODB_URL} from "./config"

export const connectDB = async () =>{
    try{
        await connect(MONGOODB_URL)
        console.log("connect mongoose db")

    }catch(err){
        console.log(err)
    }
}

