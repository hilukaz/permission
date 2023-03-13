import {Request,Response} from 'express'
import { prismaClient } from '../databases/prismaClient'

export class RoleController{
    async criar(request:Request, response:Response){
        const{name, description}=request.body;

        const role=await prismaClient.role.create({
            data:{
                name, 
                description
            }
        })

        return response.json(role)
    }

    async consultar(request:Request, response:Response){
        try {
            const role = await prismaClient.role.findMany({})
            return response.json(role)
            
        } catch (error) {
            return response.json(error)
        }
            
    }    

    async atualizar(request:Request, response:Response){
        const{id}=request.params
        const{name}=request.body;

        let role=await prismaClient.role.findFirst({
            where:{
                id:Number(id)
            }
        })
        if(!role){
            return response.json({
                error:"não existe o produto"
            })
        }

        role=await prismaClient.role.update({
            where:{
                id:Number(id)
            },
            data:{
                name
            }
        })

        return response.json(role)
    }    

    async deletar(request:Request, response:Response){
        const {id}=request.params
        const role = await prismaClient.role.delete({
            where: {
               id:Number(id)
            },
          }) 
        response.json("registro excluído")
    }


    async pesquisar(request:Request, response:Response){
        const{id}=request.params;

        const role=await prismaClient.role.findFirst({
            where:{
                id:Number(id)
            }
        })

        if(!role){
            return response.json({
                error:"não existe o produto"
            })
        }

        return response.json(role)
    }    
}