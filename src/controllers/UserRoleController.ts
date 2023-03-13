import {Request,Response} from 'express'
import { prismaClient } from '../databases/prismaClient'

export class UserRole{
    async criar(request:Request, response:Response){
        const{id_user,id_role}=request.body;

        const userRole=await prismaClient.userRole.create({
            data:{
                user: { connect: { id:Number(id_user) } },
                role: { connect: { id: Number(id_role) } },
            }
        })

        return response.json(userRole)
    }
    async consultar(request:Request, response:Response){
        try {
            const userRole = await prismaClient.userRole.findMany({})
            return response.json(userRole)
            
        } catch (error) {
            return response.json(error)
        }
            
    }    

    async atualizar(request:Request, response:Response){
        const{id}=request.params
        const{id_role,id_user}=request.body;

        let userRole=await prismaClient.userRole.findFirst({
            where:{
                id:Number(id)
            }
        })
        if(!userRole){
            return response.json({
                error:"não existe o produto"
            })
        }

        userRole=await prismaClient.userRole.update({
            where:{
                id:Number(id)
            },
            data:{
                user: { connect: { id:Number(id_user) } },
                role: { connect: { id: Number(id_role) } },
            }
        })

        return response.json(userRole)
    }    

    async deletar(request:Request, response:Response){
        const {id}=request.params
        const userRole = await prismaClient.userRole.delete({
            where: {
               id:Number(id)
            },
          }) 
        response.json("registro excluído")
    }

    async pesquisar(request:Request, response:Response){
        const{id}=request.params;

        const userRole=await prismaClient.userRole.findFirst({
            where:{
                id:Number(id)
            },
        })

        if(!userRole){
            return response.json({
                error:"não existe o produto"
            })
        }

        return response.json(userRole)
    }        
}