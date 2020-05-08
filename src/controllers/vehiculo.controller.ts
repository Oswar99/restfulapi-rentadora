import {Application} from "express";
import {VehiculoService} from "../services/vehiculo.service";

export class ClienteController{
    private vehiculo_service: VehiculoService;
    constructor(private app: Application){
        this.vehiculo_service = new VehiculoService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/vehiculos").get(this.vehiculo_service.getAll);

        this.app.route("/vehiculo").post(this.vehiculo_service.newOne);

        this.app.route("/vehiculo/:id")
        .delete(this.vehiculo_service.deleteOne)
        .get(this.vehiculo_service.getOne)
        .put(this.vehiculo_service.updateOne);
        
    }
}