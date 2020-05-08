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

config({path: resolve(__dirname, "../.env")});

class App{
    public app: Application;
    public mainController: MainController;
    public clienteController: ClienteController;
    public sucursalController: SucursalController;
    public empleadoController: EmpleadoController;
    public vehiculoController: VehiculoController;

    public accesorioController: AccesorioController;


    constructor(){
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        
        this.mainController = new MainController(this.app);
        this.clienteController = new ClienteController(this.app);
        this.sucursalController = new SucursalController(this.app);
        this.empleadoController = new EmpleadoController(this.app);
        this.vehiculoController = new VehiculoController(this.app);

        this.accesorioController = new AccesorioController(this.app);
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