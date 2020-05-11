import {Request,Response} from "express";
import {Bitacora, IBitacora} from "../models/bitacora.model";
import {BitacoraHelpers} from "../helpers/bitacora.helpers";
import {VehiculoHelpers} from "../helpers/vehiculo.helpers";
import {MongooseDocument} from "mongoose";

export class BitacoraService extends BitacoraHelpers{
    public getAll(req: Request, res: Response){
        Bitacora.find({}, (err: Error, Bitacora: MongooseDocument)=>{
            if(err){
                res.status(401).send({successed:false, message: err.message});
            }
            res.status(200).json({successed:true, Bitacoras: Bitacora });
        });
    }

    public async newOne(req: Request, res: Response){        
        const c = new Bitacora(req.body);

        console.log(c);
        console.log(req.body);

        await c.save((err:Error, Bitacora: IBitacora)=>{
            if(err){
                res.status(401).send({successed:false, message: err.message});
            }else{
                res.status(200).json( Bitacora? {successed:true, Bitacora: Bitacora } : {successed:false} );
            }            
        });
    }
    
    public async deleteOne(req:Request, res:Response){
        Bitacora.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
            }else{
                res.status(200).json({successed:true,message:"La Bitacora ha sido eliminado con exito"});
            }
        });
    }

    public async getOne(req:Request, res:Response){
        const c: any = await super.getBitacora({_id:req.params.id});
        res.status(200).json(c[0]);
    }

    public async updateOne(req:Request, res:Response){       
        const old_c:any = await super.getBitacora({_id: req.params.id});
        
        if( old_c.length > 0 ){

            Bitacora.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                if(err){
                    res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                }else{
                    res.status(200).json({successed:true,message:"La Bitacora ha sido actualizado con exito"});
                }
            });

        }else{
            res.status(200).json({successed:false});
        } 
    }

};