import { prismaClient } from '../databases/prismaClient'
import { Request, Response } from "express";

export class UserAccess {
  async criar(request: Request, response: Response) {
    const { id_user, id_role,id_permission} = request.body;

    const userRole=await prismaClient.userRole.create({
      data:{
          user: { connect: { id:Number(id_user) } },
          role: { connect: { id: Number(id_role) } },
      }
    })

    const userPermission=await prismaClient.userPermission.create({
      data:{
        user:{connect:{id:Number(id_user)}},
        permission:{connect:{id:Number(id_permission)}}
      }
    })

  
    if (userPermission instanceof Error) {
      return response.status(400).json(userPermission.message);
    }
    
    if (userRole instanceof Error) {
      return response.status(400).json(userRole.message);
    }

    const userACL=await prismaClient.user.findFirst({
      where:{
        id:Number(id_user)
        
      },
      include: {
        UserPermission:true,
        UserRole:true
      },
    })

    return response.json(userACL)
    // const results = await prismaClient.rolePermission.create({
    //     user: { connect: { id:Number(id_user) } },
    //     permissions:{connect:{id:Number(id_permission)}},
    // });


  }
}