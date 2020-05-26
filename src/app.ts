import express,{Application} from "express";

import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import {config} from "dotenv";
import {resolve} from "path"; 

import { MainController } from "./controllers/main.controller";
import { ClienteController } from "./controllers/cliente.controller";
import { SucursalController } from "./controllers/sucursal.controller";
import { EmpleadoController } from "./controllers/empleado.controller";
import { VehiculoController } from "./controllers/vehiculo.controller";
import { AccesorioController } from "./controllers/accesorio.controller";
import { ContratoController } from "./controllers/contrato.controller"
import { BitacoraController } from "./controllers/bitacora.controller";
import { FacturaController } from "./controllers/factura.controller";
import { UsuarioController } from "./controllers/usuario.controller";
import { CarritoController } from "./controllers/carrito.controller";

config({path: resolve(__dirname, "../.env")});

class App{
    public app: Application;

    public accesorioController: AccesorioController;
    public bitacoraController: BitacoraController;
    public clienteController: ClienteController;
    public contratoController: ContratoController;
    public empleadoController: EmpleadoController;
    public facturaController: FacturaController;
    public mainController: MainController;
    public sucursalController: SucursalController;
    public vehiculoController: VehiculoController;
    public usuarioController: UsuarioController;
    public carritoController: CarritoController;

    constructor(){
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        
        this.accesorioController = new AccesorioController(this.app);
        this.bitacoraController = new BitacoraController(this.app);
        this.clienteController = new ClienteController(this.app);
        this.contratoController = new ContratoController(this.app);
        this.empleadoController = new EmpleadoController(this.app);
        this.facturaController = new FacturaController(this.app);
        this.mainController = new MainController(this.app);
        this.sucursalController = new SucursalController(this.app);
        this.vehiculoController = new VehiculoController(this.app);
        this.usuarioController = new UsuarioController(this.app);
        this.carritoController = new CarritoController(this.app)
    }
    private setConfig(){
        this.app.use(bodyParser.json({limit:"50mb"}));
        this.app.use(bodyParser.urlencoded({limit:"50mb", extended:true}));
        this.app.use(cors());
    }
    private setMongoConfig(){
        mongoose.Promise = global.Promise;

        mongoose.connect(process.env.MNG_URL!, { useNewUrlParser:true, useUnifiedTopology: true }, (err: any) =>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Conexion Exitosa");
            }
        }); 
    }

}

export default new App().app;