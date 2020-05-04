import {Application} from "express";
import {ClienteService} from "../services/cliente.service";

export class ClienteController{
    private Language_service: ClienteService;
    constructor(private app: Application){
        this.Language_service = new ClienteService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/clientes").get(this.Language_service.getAll);

        this.app.route("/cliente").post(this.Language_service.newOne);

        this.app.route("/cliente/:id")
        .delete(this.Language_service.deleteOne)
        .get(this.Language_service.getOne)
        .put(this.Language_service.updateOne);
        
    }
}