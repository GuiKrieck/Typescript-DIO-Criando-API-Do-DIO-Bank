import { UserService } from "../services/UserService";
import { UserController } from "./UserController"
import { makeMockRequest } from "../__mocks__/mockResquest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";


describe('UserController', () => {
    
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers:jest.fn(),
        deleteUser: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService);
    const spyGetAllUsers = jest.spyOn(userController, 'getAllUsers')

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body:{
                name:"Guilherme",
                email:"gui@dio.me"
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: "User created"})
    });
    it('Deve retornar um erro ao tentar criar um novo usuário sem preencher o nome ou o e-mail', () =>{
        const mockRequest = {
            body:{}
        } as Request
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest , mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message:"Bad request! Nome e/ou email obrigatórios"})
    });

    it('Deve verificar se a função getAllUsers esta sendo chamada',() =>{
        const mockRequest = {
            body:{
                name:"Guilherme",
                email:"gui@dio.me"
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(spyGetAllUsers).toHaveBeenCalled()
    })

    it('Deve deletar um usuário da base de dados', () => {
        const mockRequest = {
            body:{
                name:"Guilherme",
                email:"gui@dio.me"
            }
        } as Request
        const mockResponse = makeMockResponse();
        (mockUserService.deleteUser as jest.Mock).mockReturnValue(true);
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({message: "Usuário deletado com sucesso!"})
    })

    it('Deve retornar um status 400 caso não encontre o usuário no banco de dados', () => {
        const mockRequest = {
            body:{
                name:"Guilherme",
                email:"gui@text.me"
            }
        } as Request
        const mockResponse = makeMockResponse();
        (mockUserService.deleteUser as jest.Mock).mockReturnValue(false);
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: "Usuário não encontrado no banco de dados"})
    })
})