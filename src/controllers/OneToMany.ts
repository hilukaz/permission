import {Request,Response} from 'express'
import { prismaClient } from '../databases/prismaClient'

export class CreateProductToMany{
    async handle(request:Request, response:Response){
        const{name,bar_code,price,id_category}=request.body;

        const product=await prismaClient.product.create({//não terminado
            
            data:{
                bar_code,
                name,
                price,       
                ProductCategory:{
                    connect:{
                        id:id_category
                    }
                }
            }
        })

      

        return response.json(product)
    }    
}
  /* produz o mesmo resultado acima, porém esse já é conectado com uma relação N:N, e não 1:N
  const product=await prismaClient.!!!!productCategory!!!!.create({ 
            data:{
                product:{
                    create:{          
                        bar_code,
                        name,
                        price,       
                    }    
                },
                category:{
                    connect:{
                        id:id_category
                    }
                }
            }
        })*/