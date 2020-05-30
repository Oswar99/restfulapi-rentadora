import {Application} from "express";
import {CarritoService} from "../services/carrito.service";

export class CarritoController{
    private carrito_service: CarritoService;
    constructor(private app: Application){
        this.carrito_service = new CarritoService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/carrito").post(this.carrito_service.newOne);  
        
        this.app.route("/carrito/:id")
        .delete(this.carrito_service.deleteOne)
        .get(this.carrito_service.getCarrito);

        this.app.route("/carrito/valor/:id").get(this.carrito_service.getPrecio);
    }
}