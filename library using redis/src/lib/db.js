import { createClient } from 'redis';
import dotenv from 'dotenv'
dotenv.config()

const client = createClient({
    password: process.env.NEXT_PUBLIC_REDIS_PW,
    socket: {
        host:  process.env.NEXT_PUBLIC_REDIS_HOST,
        port: process.env.NEXT_PUBLIC_REDIS_PORT
    }
});

client.on("error",(err)=>{console.log(err);})

if(!client.isOpen){
     client.connect()
     
}

export {client}