import {Request,Response} from "express";
import {Cliente, ICliente} from "../models/cliente.model";
import {ClienteHelpers} from "../helpers/cliente.helpers"
import {MongooseDocument} from "mongoose";

export class ClienteService extends ClienteHelpers{
    public getAll(req: Request, res: Response){
        Cliente.find({}, (err: Error, Cliente: MongooseDocument)=>{
            if(err){
                res.status(401).send({successed:false, message: err.message});
            }
            res.status(200).json({successed:true, Clientes: Cliente });
        });
    }

    public async newOne(req: Request, res: Response){        
        const c = new Cliente(req.body);
        const old_c:any = await super.getCliente({Identificacion: c.Identificacion});

        console.log(c);
        console.log(req.body);

        if( old_c.length === 0 ){
            await c.save((err:Error, Cliente: ICliente)=>{
                if(err){
                    res.status(401).send({successed:false, message: err.message});
                }else{
                    res.status(200).json( Cliente? {successed:true, Cliente: Cliente } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false});
        } 
    }
    
    public async deleteOne(req:Request, res:Response){
        const cli: ICliente = await super.getCliente(req.body.id);
        const nCon: number = await super.contratosPorCliente(cli._id);

        if (cli === undefined){
            res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
        }else{
            if(nCon > 0){
                res.status(401).json({successed:false, message:"No puede eliminar este Cliente, tiene Contratos Registrados"});
            }else{
                Cliente.findByIdAndDelete(req.params.id,(err:Error)=>{
                    if(err){
                        res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                    }else{
                        res.status(200).json({successed:true,message:"El Cliente ha sido eliminado con exito"});
                    }
                });
            }
        }
        
    }

    public async getOne(req:Request, res:Response){
        const c: any = await super.getCliente({_id:req.params.id});
        res.status(200).json(c[0]);
    }

    public async updateOne(req:Request, res:Response){       
        const old_c:any = await super.getCliente({_id: req.params.id});
        
        if( old_c.length > 0 ){

            Cliente.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                if(err){
                    res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                }else{
                    res.status(200).json({successed:true,message:"El Cliente ha sido actualizado con exito"});
                }
            });

        }else{
            res.status(200).json({successed:false});
        } 
    }

    public async verifyClient(req: Request, res: Response){
        console.log(req.params);
        Cliente.findOne({$and: [{Correo: req.params.correo}, {Contraseña: req.params.contra}]}, (err: Error, cli: any)=>{
            if(err){
                res.status(401).json({successed:false, message: err.message});
            }else{
                res.status(200).json({successed:true, Cliente: cli});
                console.log({Cliente: cli});
            }
        })
    }
};