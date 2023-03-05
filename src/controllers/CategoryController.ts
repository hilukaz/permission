import {Request,Response} from 'express'
import { prismaClient } from '../databases/prismaClient'

export class CategoryController{
    async criar(request:Request, response:Response){
        const{name}=request.body;

        const category=await prismaClient.category.create({
            data:{
                name
            }
        })

        return response.json(category)
    }

    async consultar(request:Request, response:Response){
        try {
            const category = await prismaClient.category.findMany({})
            return response.json(category)
            
        } catch (error) {
            return response.json(error)
        }
            
    }    

    async atualizar(request:Request, response:Response){
        const{id}=request.params
        const{name}=request.body;

        let category=await prismaClient.category.findFirst({
            where:{
                id:Number(id)
            }
        })
        if(!category){
            return response.json({
                error:"não existe o produto"
            })
        }

        category=await prismaClient.category.update({
            where:{
                id:Number(id)
            },
            data:{
                name
            }
        })

        return response.json(category)
    }    

    async deletar(request:Request, response:Response){
        const {id}=request.params
        const category = await prismaClient.category.delete({
            where: {
               id:Number(id)
            },
          }) 
        response.json("registro excluído")
    }


    async pesquisar(request:Request, response:Response){
        const{id}=request.params;

        const category=await prismaClient.category.findFirst({
            where:{
                id:Number(id)
            }
        })

        if(!category){
            return response.json({
                error:"não existe o produto"
            })
        }

        return response.json(category)
    }    
}