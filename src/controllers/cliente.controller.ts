import {Application} from "express";
import {ClienteService} from "../services/cliente.service";

export class ClienteController{
    private cliente_service: ClienteService;
    constructor(private app: Application){
        this.cliente_service = new ClienteService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/clientes").get(this.cliente_service.getAll);

        this.app.route("/cliente").post(this.cliente_service.newOne);

        this.app.route("/cliente/:id")
        .delete(this.cliente_service.deleteOne)
        .get(this.cliente_service.getOne)
        .put(this.cliente_service.updateOne);
        
    }
}