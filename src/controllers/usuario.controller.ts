import {Application} from "express";
import {UsuarioService} from "../services/usuario.service";

export class UsuarioController{
    private Usuario_Service: UsuarioService;
    constructor(private app: Application){
        this.Usuario_Service = new UsuarioService();
        this.routes();
    }
    private routes(){
            
        this.app.route("/usuarios").get(this.Usuario_Service.getAll);
        this.app.route("/usuario").post(this.Usuario_Service.newOne);
        
    }
}