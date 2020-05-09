import {Request,Response} from "express";
import {Accesorio, IAccesorio} from "../models/accesorio.model";
import {AccesorioHelpers} from "../helpers/accesorio.helpers";
import {VehiculoHelpers} from "../helpers/vehiculo.helpers";
import {MongooseDocument} from "mongoose";

export class AccesorioService extends AccesorioHelpers{
    public getAll(req: Request, res: Response){
        Accesorio.find({}, (err: Error, Accesorio: MongooseDocument)=>{
            if(err){
                res.status(401).send(err.message);
            }
            res.status(200).json(Accesorio);
        });
    }

    public async newOne(req: Request, res: Response){        
        const c = new Accesorio(req.body);
        const old_c:any = await super.getAccesorio({No_Serie: c.No_Serie});

        console.log(c);
        console.log(req.body);

        if( old_c.length === 0){
            await c.save((err:Error, Accesorio: IAccesorio)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Accesorio? {successed:true, Accesorio: Accesorio } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false, message: "Verifique que el Accesorio no haya sido ingresado anteriormente."});
        }  
    }
    
    public async deleteOne(req:Request, res:Response){
        Accesorio.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
            }else{
                res.status(200).json({successed:true,message:"El Accesorio ha sido eliminado con exito"});
            }
        });
    }

    public async getOne(req:Request, res:Response){
        const c: any = await super.getAccesorio({_id:req.params.id});
        res.status(200).json(c[0]);
    }

    public async updateOne(req:Request, res:Response){       
        const old_c:any = await super.getAccesorio({_id: req.params.id});
        
        if( old_c.length === 0 ){
            res.status(200).json({successed:false});
        }else{
                Accesorio.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                    if(err){
                        res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                    }else{
                        res.status(200).json({successed:true,message:"El Accesorio ha sido actualizado con exito"});
                    }
                });
        } 
    }

};