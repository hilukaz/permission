import {Request,Response} from 'express'
import { prismaClient } from '../databases/prismaClient'
import bcrypt from 'bcrypt'

export class UserController{
    async criar(request:Request, response:Response){
        const{name,password, email, company}=request.body;

        const User=await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(User){
            return response.json({
                error:"Esta conta já foi criada"
            })
        }

        const hashPassword=await bcrypt.hash(password,10)

        const user=await prismaClient.user.create({
            data:{
                name,
                email,
                password:hashPassword,
                company
            }
            
        })
    

        return response.json(user)
    }
    
    async consultar(request:Request, response:Response){
        try {
            const User = await prismaClient.user.findMany({})
            return response.json(User)
            
        } catch (error) {
            return response.json(error)
        }
            
    }    
/*
    async atualizar(request:Request, response:Response){
        const{id}=request.params
        const{name,bar_code,price}=request.body;

        let User=await prismaClient.user.findFirst({
            where:{
                id:Number(id)
            }
        })
        if(!User){
            return response.json({
                error:"não existe o produto"
            })
        }

        User=await prismaClient.user.update({
            where:{
                id:Number(id)
            },
            data:{
                name,
                price,
            }
        })

        return response.json(User)
    }    

    async deletar(request:Request, response:Response){
        const {id}=request.params
        const User = await prismaClient.user.delete({
            where: {
               id:Number(id)
            },
          }) 
        response.json("registro excluído")
    }

    async pesquisar(request:Request, response:Response){
        const{id}=request.params;

        const User=await prismaClient.user.findFirst({
            where:{
                id:Number(id)
            },
            include:{
                UserCategory:true,
            }
        })

        if(!User){
            return response.json({
                error:"não existe o produto"
            })
        }

        return response.json(User)
    }    */
}