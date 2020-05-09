import {Application} from "express";
import {ContratoService} from "../services/contrato.service";

export class ContratoController{
    private contrato_service: ContratoService;
    constructor(private app: Application){
        this.contrato_service = new ContratoService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/contratos").get(this.contrato_service.getAll);

        this.app.route("/contrato").post(this.contrato_service.newOne);

        this.app.route("/contrato/:id")
        .delete(this.contrato_service.deleteOne)
        .get(this.contrato_service.getOne)
        .put(this.contrato_service.updateOne);
        
    }
}