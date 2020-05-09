import {Request,Response} from "express";
import {Contrato, IContrato} from "../models/contrato.model";
import {ContratoHelpers} from "../helpers/contrato.helpers";
import {MongooseDocument} from "mongoose";

export class ContratoService extends ContratoHelpers{
    public getAll(req: Request, res: Response){
        Contrato.find({}, (err: Error, Contrato: MongooseDocument)=>{
            if(err){
                res.status(401).send(err.message);
            }
            res.status(200).json(Contrato);
        });
    }

    public async newOne(req: Request, res: Response){        
        const c = new Contrato(req.body);
        const old_c:any = await super.getContrato({Contrato: c.Contrato});

        console.log(c);
        console.log(req.body);

        if( old_c.length === 0){
            await c.save((err:Error, Contrato: IContrato)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Contrato? {successed:true, Contrato: Contrato } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false, message: "Verifique que el Contrato no haya sido ingresado anteriormente."});
        }  
    }
    
    public async deleteOne(req:Request, res:Response){
        const con = await super.getContrato(req.params.id);
        const nFac: number = con? await super.contratosPorFactura(con) : 0;

        if(con == undefined){
            res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
        }else{
            if (nFac > 0){
                res.status(401).json({successed:false, message:"No puede eliminarse ya que otros objetos dependen de el."});
            }else{
                Contrato.findByIdAndDelete(req.params.id,(err:Error)=>{
                    if(err){
                        res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                    }else{
                        res.status(200).json({successed:true,message:"El Contrato ha sido eliminado con exito"});
                    }
                });
            }
        }
    }

    public async getOne(req:Request, res:Response){
        const c: any = await super.getContrato({_id:req.params.id});
        res.status(200).json(c[0]);
    }

    public async updateOne(req:Request, res:Response){       
        const old_c:any = await super.getContrato({_id: req.params.id});
        
        if( old_c.length === 0 ){

            Contrato.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                if(err){
                    res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                }else{
                    res.status(200).json({successed:true,message:"El Contrato ha sido actualizado con exito"});
                }
            });

        }else{
            res.status(200).json({successed:false});
        } 
    }

};