import { NextFunction, Request,Response } from "express";
import { prismaClient } from '../databases/prismaClient'

export function can (permissionRoutes:number[]){

    return async(request:Request,response: Response, next: NextFunction)=>{

    
    const existPermissions=permissionRoutes.every(//pega uma variável (array) que antecede o método e aplica uma função de condinção para cada valor do array, retorna bolean
    //o item se torna um valor do array 
      item=>request.user.permissions?.includes(item)//pega a permission e verifica se ela está incluida no array 
      )// essa const inteira tem o objetivo de comparar array com outro array
    
        if (!existPermissions) {
          return(response.status(403).json({
            message:"Usuário não tem permissão"
          }))
        }
        
      return next();

    // const userPermission = await prismaClient.user.findMany({
    //   where:{
    //     id:Number(id)
    //   },
    //   select:{
    //     UserPermission:{
    //       select:{
    //         permission:{
    //           select:{
    //             name: true
                
    //           }
    //         }
    //       }
    //     }
    //   }
        
    // })
    // if(!userPermission){
    //   return response.status(400).json("permission não existe")
    // }
    // if(userPermission){
    //   return response.json(userPermission)
    // }
    // console.log(permissionRoutes)

    // if(userPermission == permissionRoutes){
    //   return response.status(400).json("permission não adquirido")
    // }

    
  }
};

export function is (rolesRoutes:number[]){
  
  return async(request:Request,response: Response, next: NextFunction)=>{

    
    const existRoles=rolesRoutes.every(item=>request.user.roles?.includes(item))//compara array

    if (!existRoles) {
      return(response.status(403).json({
        message:"Usuário não tem role"
      }))
    }

  return next();
  }
}
