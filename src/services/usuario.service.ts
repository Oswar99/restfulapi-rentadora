import {Request,Response} from "express";
import {Usuario, IUsuario} from "../models/usuario.model";
import { EmpleadoHelpers } from "../helpers/empleado.helpers";
import { MongooseDocument } from "mongoose";

export class UsuarioService extends EmpleadoHelpers{
    
    public async newOne(req: Request, res: Response){        
        const c = new Usuario(req.body);
        const old_c:any = await super.getEmpleado({_id: c.Empleado});

        console.log(c);
        console.log(req.body);

        if( old_c.length > 0 ) {
            await c.save((err:Error, Usuario: IUsuario)=>{
                if(err){
                    res.status(401).send({successed:false, message: err.message});
                }else{
                    res.status(200).json( Usuario? {successed:true, Usuario: Usuario } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false, message: "Verifique que el Usuario no haya sido ingresado anteriormente."});
        }
        
    }

    public getAll(req: Request, res: Response){
        Usuario.find({}, (err: Error, Usuario: MongooseDocument)=>{
            if(err){
                res.status(401).send({successed:false, message: err.message});
            }
            res.status(200).json({successed:true, Empleados: Usuario });
        });
    }
}