import {Request,Response} from "express";
import {Factura, IFactura} from "../models/factura.model";
import {FacturaHelpers} from "../helpers/factura.helpers"
import {MongooseDocument} from "mongoose";

export class FacturaService extends FacturaHelpers{
    public getAll(req: Request, res: Response){
        Factura.find({}, (err: Error, Factura: MongooseDocument)=>{
            if(err){
                res.status(401).send(err.message);
            }
            res.status(200).json(Factura);
        });
    }

    public async newOne(req: Request, res: Response){        
        const c = new Factura(req.body);
        const old_c:any = await super.getFactura({Factura: c.Factura});

        console.log(c);
        console.log(req.body);

        if( old_c.length === 0 ){
            await c.save((err:Error, Factura: IFactura)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Factura? {successed:true, Factura: Factura } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false});
        } 
    }
    
    public async deleteOne(req:Request, res:Response){
        Factura.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
            }else{
                res.status(200).json({successed:true,message:"La Factura ha sido eliminado con exito"});
            }
        });
    }

    public async getOne(req:Request, res:Response){
        const c: any = await super.getFactura({_id:req.params.id});
        res.status(200).json(c[0]);
    }

    public async updateOne(req:Request, res:Response){       
        const old_c:any = await super.getFactura({_id: req.params.id});
        
        if( old_c.length === 0 ){

            Factura.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                if(err){
                    res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                }else{
                    res.status(200).json({successed:true,message:"La Factura ha sido actualizado con exito"});
                }
            });

        }else{
            res.status(200).json({successed:false});
        } 
    }

};