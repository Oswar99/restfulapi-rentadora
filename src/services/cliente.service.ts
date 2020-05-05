import {Request,Response} from "express";
import {Cliente, ICliente} from "../models/cliente.model";
import {MongooseDocument} from "mongoose";

class ClienteHelpers{
    getCliente(filtro:any):Promise<ICliente>{
        return new Promise<ICliente>( (resolve) =>{
            Cliente.find(filtro, (err:Error, Cliente:ICliente)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Cliente);
                }
            });
        });
    }
};

export class ClienteService extends ClienteHelpers{
    public getAll(req: Request, res: Response){
        Cliente.find({}, (err: Error, Cliente: MongooseDocument)=>{
            if(err){
                res.status(401).send(err.message);
            }
            res.status(200).json(Cliente);
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
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Cliente? {successed:true, Cliente: Cliente } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false});
        } 
    }
    
    public async deleteOne(req:Request, res:Response){
        Cliente.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
            }else{
                res.status(200).json({successed:true,message:"El Cliente ha sido eliminado con exito"});
            }
        });
    }

    public async getOne(req:Request, res:Response){
        const c: any = await super.getCliente({_id:req.params.id});
        res.status(200).json(c[0]);
    }

    public async updateOne(req:Request, res:Response){       
        const old_c:any = await super.getCliente({_id: req.params.id});
        
        if( old_c.length === 0 ){

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

};