import express,{Application} from "express";

import {MainController} from "./controllers/main.controller";

import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import {config} from "dotenv";
import {resolve} from "path"; 

config({path: resolve(__dirname, "../.env")});

class App{
    public app: Application;
    public mainController: MainController;

    constructor(){
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        
        this.mainController = new MainController(this.app);
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