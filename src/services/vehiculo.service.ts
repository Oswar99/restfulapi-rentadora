import {Request,Response} from "express";
import {Vehiculo, IVehiculo} from "../models/vehiculo.model";
import {VehiculoHelpers} from "../helpers/vehiculo.helpers";
import {MongooseDocument} from "mongoose";
import { sucursalHelpers } from "../helpers/sucursal.helpers";

export class VehiculoService extends VehiculoHelpers{
    public getAll(req: Request, res: Response){
        Vehiculo.find({}, (err: Error, Vehiculo: MongooseDocument)=>{
            if(err){
                res.status(401).send(err.message);
            }
            res.status(200).json(Vehiculo);
        });
    }

    public async newOne(req: Request, res: Response){        
        const c = new Vehiculo(req.body);
        const old_c:any = await super.getVehiculo({Placa: c.Placa});

        const suc_help:any = new sucursalHelpers();
        const suc:any = await suc_help.getSucursal({_id: c.Sucursal});

        console.log(c);
        console.log(req.body);

        if( old_c.length === 0 && !(suc.length === 0)){
            await c.save((err:Error, Vehiculo: IVehiculo)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Vehiculo? {successed:true, Vehiculo: Vehiculo } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false, message: "Verifique que el Vehiculo no haya sido ingresado anteriormente o que la Sucursal proporsionada sea valida"});
        } 
    }
    
    public async deleteOne(req:Request, res:Response){
        
        const veh = await super.getVehiculo(req.params.id);
        const nBita: number = veh? await super.bitacorasPorVehiculo(veh) : 0;

        if(veh == undefined){
            res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
        }else{
            if (nBita > 0){
                res.status(401).json({successed:false, message:"No puede eliminarse ya que otros objetos dependen de el."});
            }else{
                Vehiculo.findByIdAndDelete(req.params.id,(err:Error)=>{
                    if(err){
                        res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                    }else{
                        res.status(200).json({successed:true,message:"El Vehiculo ha sido eliminado con exito"});
                    }
                });
            }
        }
    }

    public async getOne(req:Request, res:Response){
        const c: any = await super.getVehiculo({_id:req.params.id});
        res.status(200).json(c[0]);
    }

    public async updateOne(req:Request, res:Response){       
        const old_c:any = await super.getVehiculo({_id: req.params.id});
        
        if( old_c.length > 0 ){

            Vehiculo.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                if(err){
                    res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                }else{
                    res.status(200).json({successed:true,message:"El Vehiculo ha sido actualizado con exito"});
                }
            });

        }else{
            res.status(200).json({successed:false});
        } 
    }

};