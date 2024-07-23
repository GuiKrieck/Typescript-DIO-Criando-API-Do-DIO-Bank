export interface IUser {
    name: string
    email: string
}

const db = [
    {
        name: "Guilherme",
        email:"gui@dio.me"
    }
]

export class UserService {
    db: IUser[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name:string, email:string) =>{
        const user = {
            name,
            email
        }
        this.db.push(user)
        console.log("DB atualizado", this.db)   
    }

    getAllUsers = () =>{
        return this.db
    }

    deleteUser = (email:string):boolean => {

        const newUserDb = this.db.filter((user) => user.email !== email)

        if(newUserDb.length < this.db.length){
            this.db = newUserDb
            console.log('Usuário excluído com sucesso! DB atualizado', this.db)
            return true
        } else {
            console.log('Usuário não encontrado no Bando de dados.')
            return false
        }
    }
}