import {Application} from "express";
import {FacturaService} from "../services/factura.service";

export class FacturaController{
    private factura_service: FacturaService;
    constructor(private app: Application){
        this.factura_service = new FacturaService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/facturas").get(this.factura_service.getAll);

        this.app.route("/factura").post(this.factura_service.newOne);

        this.app.route("/factura/:id")
        .delete(this.factura_service.deleteOne)
        .get(this.factura_service.getOne)
        .put(this.factura_service.updateOne);
        
    }
}