import { NextFunction, Request,Response } from "express";
import { prismaClient } from '../databases/prismaClient'
import jwt from 'jsonwebtoken'

export const authMiddleware =async(request:Request,response: Response, next: NextFunction)=>{

    type jwtPayload={
        id:number
    }

    const{authorization}=request.headers
            
    if(!authorization){
        return response.json({error:"não autorizado"})
            
    }
        
    const token = authorization.split(' ')[1]
    console.log(token)

    try {
        const {id}=jwt.verify(token, process.env.JWT_PASS ?? "") as jwtPayload
        console.log(id)

        const User=await prismaClient.user.findFirst({
            where:{
                id:id
            }
        })

        if(!User){
            return response.json({error:"token inválido"})
        }

        next()//vai dizer que está tudo certo e vai prosseguir a função
        
    } catch (error) {
        return response.status(500).json({ message: 'Failed to authenticate token.' })
    }
        
}
//middleware, reutilização de código pra cada página