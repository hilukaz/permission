import {Request,Response} from 'express'
import { prismaClient } from '../databases/prismaClient'

export class ProductCategory{
    async criar(request:Request, response:Response){
        const{id_product,id_category}=request.body;

        const productCategory=await prismaClient.productCategory.create({
            data:{
                product: { connect: { id:Number(id_product) } },
                category: { connect: { id: Number(id_category) } },
            }
        })

        return response.json(productCategory)
    }
    async consultar(request:Request, response:Response){
        try {
            const productCategory = await prismaClient.productCategory.findMany({})
            return response.json(productCategory)
            
        } catch (error) {
            return response.json(error)
        }
            
    }    

    async atualizar(request:Request, response:Response){
        const{id}=request.params
        const{id_category,id_product}=request.body;

        let productCategory=await prismaClient.productCategory.findFirst({
            where:{
                id:Number(id)
            }
        })
        if(!productCategory){
            return response.json({
                error:"não existe o produto"
            })
        }

        productCategory=await prismaClient.productCategory.update({
            where:{
                id:Number(id)
            },
            data:{
                product: { connect: { id:Number(id_product) } },
                category: { connect: { id: Number(id_category) } },
            }
        })

        return response.json(productCategory)
    }    

    async deletar(request:Request, response:Response){
        const {id}=request.params
        const productCategory = await prismaClient.productCategory.delete({
            where: {
               id:Number(id)
            },
          }) 
        response.json("registro excluído")
    }

    async pesquisar(request:Request, response:Response){
        const{id}=request.params;

        const productCategory=await prismaClient.productCategory.findFirst({
            where:{
                id:Number(id)
            },
        })

        if(!productCategory){
            return response.json({
                error:"não existe o produto"
            })
        }

        return response.json(productCategory)
    }        
}