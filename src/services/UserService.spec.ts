import { IUser, UserService } from "./UserService"

const mockDb: IUser[] = [
    {
        name:"Guilherme",
        email:"gui@dio.me"
    }
]

describe('UserService', () =>{
    
    const userService = new UserService(mockDb);
    const mockEmail = 'gui@dio.me'

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('Guilherme', 'gui@dio.me');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve retornar todo os usuário', () =>{
        const users = userService.getAllUsers();
        expect(users).toEqual(mockDb)
    })
    it('Deve retornar true caso encontre o usuário no banco de dados', () => {
        const response = userService.deleteUser(mockEmail)
        expect(response).toBeTruthy()
    })
    it('Deve retornar false caso não encontre o usuário no banco de dados', () => {
        const response = userService.deleteUser("email@invalido.me")
        expect(response).toBeFalsy()
    })
})