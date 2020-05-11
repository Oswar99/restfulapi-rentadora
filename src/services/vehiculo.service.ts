import {Request,Response} from "express";
import {Vehiculo, IVehiculo} from "../models/vehiculo.model";
import {VehiculoHelpers} from "../helpers/vehiculo.helpers";
import {MongooseDocument} from "mongoose";
import { sucursalHelpers } from "../helpers/sucursal.helpers";

export class VehiculoService extends VehiculoHelpers{
    public getAll(req: Request, res: Response){
        Vehiculo.find({}, (err: Error, Vehiculo: MongooseDocument)=>{
            if(err){
                res.status(401).send({successed:false, message: err.message});
            }
            res.status(200).json({successed:true, Vehiculos: Vehiculo });
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
                    res.status(401).send({successed:false, message: err.message});
                }else{
                    res.status(200).json( Vehiculo? {successed:true, Vehiculo: Vehiculo } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false, message: "Verifique que el Vehiculo no haya sido ingresado anteriormente o que la Sucursal proporsionada sea valida"});
        } 
    }
    
    public async deleteOne(req:Request, res:Response){
        
        const nBit: number = await super.bpv({Vehiculos: {$all: [req.params.id]}});

        if( nBit > 0 ){
            res.status(401).json({successed:false, message:"El Vehiculo esta relacionado con Bitacoras"});
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

    public async getOne(req:Request, res:Response){
        const c: any = await super.getVehiculo({_id:req.params.id});
        res.status(200).json({successed:true, Vehiculo: c}) 
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