import {Request,Response} from "express";
import {Sucursal, ISucursal} from "../models/sucursal.model";

import {MongooseDocument} from "mongoose";
import { sucursalHelpers } from "../helpers/sucursal.helpers"

export class SucursalService extends sucursalHelpers{
    public getAll(req: Request, res: Response){
        Sucursal.find({}, (err: Error, Sucursal: MongooseDocument)=>{
            if(err){
                res.status(401).send(err.message);
            }
            res.status(200).json(Sucursal);
        });
    }

    public async newOne(req: Request, res: Response){ 

        const c = new Sucursal(req.body);
        console.log(c);

        await c.save((err:Error, Sucursal: ISucursal)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json( Sucursal? {successed:true, Sucursal: Sucursal } : {successed:false} );
            }            
        });
    }
    
    public async deleteOne(req:Request, res:Response){

        const suc = await super.getSucursal(req.params.id);
        const nEmp: number = suc? await super.empleadosPorSucursal(suc) : 0;
        const nVeh: number = suc? await super.vehiculosPorSucursal(suc) : 0;

        if(suc == undefined){
            res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
        }else{
            if (nEmp > 0 || nVeh > 0){
                res.status(401).json({successed:false, message:"No puede eliminarse ya que otros objetos dependen de el."});
            }else{
                Sucursal.findByIdAndDelete(req.params.id,(err:Error)=>{
                    if(err){
                        res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                    }else{
                        res.status(200).json({successed:true,message:"El Sucursal ha sido eliminado con exito"});
                    }
                });
            }
        }    
    }
    
    public async getOne(req:Request, res:Response){
        const c: any = await super.getSucursal({_id:req.params.id});
        res.status(200).json(c[0]);
    }

    public async updateOne(req:Request, res:Response){       
        const old_c:any = await super.getSucursal({_id: req.params.id});
        
        if( old_c.length > 0 ){

            Sucursal.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                if(err){
                    res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                }else{
                    res.status(200).json({successed:true,message:"El Sucursal ha sido actualizado con exito"});
                }
            });

        }else{
            res.status(200).json({successed:false});
        } 
    }

};