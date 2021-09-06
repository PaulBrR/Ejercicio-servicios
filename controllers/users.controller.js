import { request, response } from "express";
import db from "../services/db.services.js";

export const getUsers = async(request, response, next) => {
    //Obtener la lista de usuarios
    try {
        const users = await db.findAll();
        //Responder al cliente con una respuesta de tipo json
        response.json(users);
    } catch (error) {
        //En caso de error envíar hacía el middleware de manejo de errores
        next(error);
    }
}

export const getUsersById = async(request, response, next) => {
    //Obtener la lista de usuarios
    try {
        const {id} = request.params;
        const users = await db.findById(parseInt(id));
        //Responder al cliente con una respuesta de tipo json
        response.json(users);
    } catch (error) {
        //En caso de error envíar hacía el middleware de manejo de errores
        next(error);
    }
}