import {Application} from "express";
import { SucursalService } from "../services/sucursal.service"

export class SucursalController{
    private sucursal_service: SucursalService;
    constructor(private app: Application){
        this.sucursal_service = new SucursalService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/sucursales").get(this.sucursal_service.getAll);

        this.app.route("/sucursal").post(this.sucursal_service.newOne);

        this.app.route("/sucursal/:id")
        .delete(this.sucursal_service.deleteOne)
        .get(this.sucursal_service.getOne)
        .put(this.sucursal_service.updateOne);
        
    }
}