import {Request, Response} from "express";
import {ICarrito, Carrito} from "../models/carrito.model";
import { ICliente } from "../models/cliente.model";
import { MongooseDocument } from "mongoose";
import { CarritoHelpers } from "../helpers/carrito.helpers";
import { IVehiculo, Vehiculo } from "../models/vehiculo.model";

export class CarritoService extends CarritoHelpers{

    public async newOne(req: Request, res: Response){        
        const c = new Carrito(req.body);
        
        await c.save((err:Error, Carrito: ICarrito)=>{
            if(err){
                res.status(401).send({successed:false, message: err.message});
            }else{
                res.status(200).json( Carrito? {successed:true, Carrito: Carrito } : {successed:false} );
            }            
        });      
    }

    public async deleteOne(req:Request, res:Response){
        
        Carrito.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
            }else{
                res.status(200).json({successed:true,message:"El Carrito ha sido eliminado con exito"});
            }
        });
        
    }

    public async getCarrito(req:Request, res: Response){
        const c: ICliente = await super.getCliente({_id: req.params.id});

        Carrito.find({Cliente: c},(err:Error, carrito: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(carrito);
            }
            
        });
    }

    public async getPrecio(req:Request, res: Response){
        const c: ICliente = await super.getCliente({_id: req.params.id});
        const car: ICarrito[] = await super.getCarritos({Cliente: c});
        const total: number = await super.getPrecVeh(car);
        res.status(200).json({Precio: total});
    }
}