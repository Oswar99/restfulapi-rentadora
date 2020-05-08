import {Application} from "express";
import {EmpleadoService} from "../services/empleado.service";

export class EmpleadoController{
    private empleado_service: EmpleadoService;
    constructor(private app: Application){
        this.empleado_service = new EmpleadoService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/empleados").get(this.empleado_service.getAll);

        this.app.route("/empleado").post(this.empleado_service.newOne);

        this.app.route("/empleado/:id")
        .delete(this.empleado_service.deleteOne)
        .get(this.empleado_service.getOne)
        .put(this.empleado_service.updateOne);
        
    }
}