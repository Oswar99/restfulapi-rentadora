import {Application} from "express";
import {BitacoraService} from "../services/bitacora.service";

export class BitacoraController{
    private bitacora_service: BitacoraService;
    constructor(private app: Application){
        this.bitacora_service = new BitacoraService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/bitacoras").get(this.bitacora_service.getAll);

        this.app.route("/bitacora").post(this.bitacora_service.newOne);

        this.app.route("/bitacora/:id")
        .delete(this.bitacora_service.deleteOne)
        .get(this.bitacora_service.getOne)
        .put(this.bitacora_service.updateOne);
        
    }
}