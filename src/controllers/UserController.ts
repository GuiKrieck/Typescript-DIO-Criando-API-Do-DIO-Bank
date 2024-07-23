import {Request, Response} from 'express';
import { UserService } from '../services/UserService';



export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request:Request, response:Response) => {
        const user = request.body

        if(!user.name || !user.email){
            return response.status(400).json({message:"Bad request! Nome e/ou email obrigatórios"})
        }

        this.userService.createUser(user.name, user.email)
        return response.status(201).json({message: "User created"})   
    }

    getAllUsers = (request:Request, response:Response) => {

        const users = this.userService.getAllUsers()
        return response.status(200).json(users)
    }

    deleteUser = (request: Request, response:Response) => {
        const user = request.body
        const isUserDeleted = this.userService.deleteUser(user.email)
        if(!isUserDeleted){
            return response.status(400).json({message: "Usuário não encontrado no banco de dados"})
        }
        
        return response.status(201).json({message: "Usuário deletado com sucesso!"})
        
    }
}
