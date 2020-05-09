import {Empleado, IEmpleado} from "../models/empleado.model";
import { Contrato } from '../models/contrato.model';

export class EmpleadoHelpers{
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

    contratoPorEmpleado(cli: IEmpleado):Promise<number>{
        console.log(cli._id);
        return new Promise<number>( resolve => {
            Contrato.aggregate([
                { "$match": { "Empleado": cli._id }}
            ],(err: Error, data: any)=>{
                if (err){
                    console.log(err.message);
                }
                resolve(data.length);
            })
        });
    }
};