import { Request,Response } from "express"
import bcrypt from 'bcrypt'
import { prismaClient } from '../databases/prismaClient'
import jwt from 'jsonwebtoken'



export class SessionController{
    
    
    async login(request:Request, response:Response){
        const{email,password}=request.body;

        const User=await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(!User){
            return response.json({
                error:"E-mail ou senha inválidas"
            })
        }

        const verifyPass=await bcrypt.compare(password,User.password)
        if(!verifyPass){
            return response.json({
                error:"E-mail ou senha inválidas"
            })
        }

        

        const token=jwt.sign({id: User.id},process.env.JWT_PASS ?? "",{expiresIn:'1d'})//payload, key
        //payload: a variável que inteliga ao seu token
        return response.json({
            User:User,
            token:token
        })
    }   


}