import {Request,Response} from "express";
import {Bitacora, IBitacora} from "../models/bitacora.model";
import {BitacoraHelpers} from "../helpers/bitacora.helpers";
import {MongooseDocument} from "mongoose";
import { IVehiculo } from "../models/vehiculo.model";

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
        const old_c:any = await super.getBitacora({Contrato: c.Contrato});

        console.log(c);
        console.log(req.body);

        if (old_c.length === 0) {
            await c.save((err:Error, Bitacora: IBitacora)=>{
                if(err){
                    res.status(401).send({successed:false, message: err.message});
                }else{
                    res.status(200).json( Bitacora? {successed:true, Bitacora: Bitacora } : {successed:false} );
                }            
            });
        }else{
            res.status(401).send({successed:false, message: "Ya ha sido registrada la bitacora de este Contrato"});
        }
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

    

    public async addVehiculo(req: Request, res: Response){
        Bitacora.update({_id: req.params.id}, {$push: req.body},(err: Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
            }else{
                res.status(200).json({successed:true,message:"Vehiculo agregado con exito"});
            }
        });
    }
    public async deleteVehiculo(req: Request, res: Response){
        Bitacora.update({_id: req.params.id}, {$pull: req.body},(err: Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
            }else{
                res.status(200).json({successed:true,message:"Vehiculo Eliminado con exito"});
            }
        });
    }

    public async findVehiculo(req: Request, res: Response){
        Bitacora.find({Vehiculos: {$all: [req.params.id]}},(err: Error, Bitacora: IBitacora[])=>{
            if(err){
                res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
            }else{
                res.status(200).json({successed:true, Bitacoras: Bitacora});
            }
        });
    }

};