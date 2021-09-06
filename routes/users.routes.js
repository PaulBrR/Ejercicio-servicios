import {Router} from 'express';
import {getUsers, getUsersById} from "../controllers/users.controller.js";
//middleware enrutador (Router)

const routes = Router();

//GET, PSOT, PUT, DELETE

routes.get("/users", getUsers);
routes.get("/users/:id", getUsersById);
routes.post("/users");
routes.put("/users/:id");
routes.delete("/users/:id");

export default routes;