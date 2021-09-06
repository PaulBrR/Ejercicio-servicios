import fs from "fs/promises";
import path from "path";
import faker from "faker";

class AcademloDb {

    static dbPath = path.resolve("db", "db.json");

    static findAll = async() => {
        try{
            let data = await fs.readFile(this.dbPath, "utf8");
            return JSON.parse(data);
        }catch(error){
            throw new Error("Hubo un error al tratar de obtener todos los registros de la DB");
        }
    }

    static findById = async(id) => {
        // Encontrat un elemento dentro del arreglo por su id
        const users = await this.findAll();
        // Encontart el id del usuario que coicide por el solicitado
        const userObj = users.find((users) => users.id === id); 
        //regresar el objeto de usuario
        return userObj;
    
        // try {
        //     let data = await fs.readFile(this.dbPath, "utf-8");
        //     let database = JSON.parse(data);
        //     return database.find(item => item.id === id);
        // } catch (error) {
        //     throw new Error("Hubo un error al tratar de obtener uno de los registros de la DB");
        // }
    }

    static create = async (obj) => {
        try {
            //obtener el arreglo de usuarios
            const users = await this.findAll();

            let nextId = users.length + 1;

            obj = {
                ...obj,
                id : nextId,
            }

            //Agregaremos el nuevo usaurio en el arreglo
            users.push(obj);
            //Escribimos sobre el archivo
            await fs.writeFile(this.dbPath, JSON.stringify(users));
            return obj;

        } catch (error) {
            console.log(error)
        }

        // try {
        //     let data = await this.findAll();
        //     let nextId = data.reduce((max, item) => item.id > max ? item.id : max, 0);


        //     const newObj = obj;
        //     newObj.id = nextId;

        //     data.push(newObj);
        //     await fs.writeFile(this.dbPath, JSON.stringify(data));

        //     return newObj;
        // } catch (error) {
        //     throw new Error(error);
        // }
    }

    static update = async(obj, id) => {
        try {
            // Obtener todos los usuarios
            const users = await this.findAll();
            //Buscar el indice donde se encuetra el usuario que queremos remplazar
            const index = users.findIndex((user) => user.id === id);
            if(index === -1){
                throw new Error("No existe el usuario en la base de datos");
            }
            //Remplazamos el elemento en el idice por el objeto que estamos reciviendo por parametro
            users[index] = obj;
            return obj;

        } catch (error) {
            throw new Error(error);
        }


        // try {
        //     //Obtener todos los usuarios
        //     let data = await this.findAll();
        //     // Buscar el indice donde se encuetra el usuario que queremos remplazar
        //     let index = data.findIndex(item => {return item.id === id } );
        //     if(index === -1){
        //         throw new Error("No existe el id en la DB");
        //     }
        //     // Remplazamos el elemento en el idice por el objeto que estamos reciviendo por parametro
        //     let newObj = {id, ...obj };
        //     data[index] = newObj 
        //     await fs.writeFile(this.dbPath, JSON.stringify(data));
        //     return newObj;
        // } catch (error) {
        //     throw new Error(error);
        // }
    }

    static delete = async(id) => {
        try {
            // Obtener todos los usuarios
            const users = await this.findAll();
            //Buscar el indice donde se encuetra el usuario que queremos remplazar
            const index = users.findIndex((user) => user.id === id);
            if(index === -1){
                throw new Error();
            }
            //Eliminar el usuario  
            users.splice(index, 1); 
            return true;

        } catch (error) {
            return false;
        }
        // try {
        //     let data = await this.findAll();
        //     let index = data.findIndex (item => item.id === id);
        //     if (index === -1){
        //         return false;
        //     }
        //     data.splice(index, 1);
        //     await fs.writeFile(this.dbPath, JSON.stringify(date));
        //     return true
        // } catch (error) {
        //     throw new Error(error);
        // }


    }

    static clear = async() => {
        try{
            await fs.writeFile(this.dbPath, JSON.stringify([]));
        }catch(error){
            throw new Error("Hubo un error al tratar de vaciar la DB");
        }
    }

    static populateDB = async(size) => {
        let userArr = [];
        for(let i = 0; i<size; i++){
            let userObj = {
                id: i + 1,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email().toLowerCase()
            };

            userArr.push(userObj);
        }

        try{
            await fs.writeFile(this.dbPath, JSON.stringify(userArr));
            return userArr;
        }catch(error){
            throw new Error("Hubo un error al insertar en la base de datos");
        }
    }

}

export default AcademloDb;