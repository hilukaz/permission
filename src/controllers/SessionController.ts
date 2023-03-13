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
            },
            include:{
                UserPermission: {
                    select:{
                        id_permission: true
                    }
                },
                UserRole:{
                    select:{
                        id_role:true
                    }
                }
            }
        })
        console.log(User)

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

        

        const token=jwt.sign({//passsando o id,permission,role pra dentro do token
            id: User.id,
            permissions: User.UserPermission.map(item=>item.id_permission),//map: pega cada valor do array, e aplica um método a cada um deles 
            roles:User.UserRole.map(item=>item.id_role)//vai passar como parâmetro roles que vai ser atribuida pelo id_role que está dentro da tabela UserRole
        },process.env.JWT_PASS ?? "",{expiresIn:'1d'})//payload, key
        //payload: a variável que inteliga ao seu token
        return response.json({
            User:User,
            token:token
        })
    }   


}