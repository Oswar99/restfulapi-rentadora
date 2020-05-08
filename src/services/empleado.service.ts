import {Request,Response} from "express";
import {Empleado, IEmpleado} from "../models/empleado.model";
import {MongooseDocument} from "mongoose";

class EmpleadoHelpers{
    getEmpleado(filtro:any):Promise<IEmpleado>{
        return new Promise<IEmpleado>( (resolve) =>{
            Empleado.find(filtro, (err:Error, Empleado:IEmpleado)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Empleado);
                }
            });
        });
    }
};

export class EmpleadoService extends EmpleadoHelpers{
    public getAll(req: Request, res: Response){
        Empleado.find({}, (err: Error, Empleado: MongooseDocument)=>{
            if(err){
                res.status(401).send(err.message);
            }
            res.status(200).json(Empleado);
        });
    }

    public async newOne(req: Request, res: Response){        
        const c = new Empleado(req.body);
        const old_c:any = await super.getEmpleado({Identidad: c.Identidad});

        console.log(c);
        console.log(req.body);

        if( old_c.length === 0 ){
            await c.save((err:Error, Empleado: IEmpleado)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Empleado? {successed:true, Empleado: Empleado } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false});
        } 
    }
    
    public async deleteOne(req:Request, res:Response){
        Empleado.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
            }else{
                res.status(200).json({successed:true,message:"El Empleado ha sido eliminado con exito"});
            }
        });
    }

    public async getOne(req:Request, res:Response){
        const c: any = await super.getEmpleado({_id:req.params.id});
        res.status(200).json(c[0]);
    }

    public async updateOne(req:Request, res:Response){       
        const old_c:any = await super.getEmpleado({_id: req.params.id});
        
        if( old_c.length === 0 ){

            Empleado.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                if(err){
                    res.status(401).json({successed:false, message:"Ocurrio un Error, contacte a soporte tecnico en caso de persistir"});
                }else{
                    res.status(200).json({successed:true,message:"El Empleado ha sido actualizado con exito"});
                }
            });

        }else{
            res.status(200).json({successed:false});
        } 
    }

};