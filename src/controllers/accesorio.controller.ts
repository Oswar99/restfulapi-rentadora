import {Application} from "express";
import {AccesorioService} from "../services/accesorio.service";

export class AccesorioController{
    private accesorio_service: AccesorioService;
    constructor(private app: Application){
        this.accesorio_service = new AccesorioService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/accesorios").get(this.accesorio_service.getAll);

        this.app.route("/accesorio").post(this.accesorio_service.newOne);

        this.app.route("/accesorio/:id")
        .delete(this.accesorio_service.deleteOne)
        .get(this.accesorio_service.getOne)
        .put(this.accesorio_service.updateOne);
        
    }
}