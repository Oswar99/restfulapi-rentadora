import { Empleado } from "../models/empleado.model";
import {Sucursal, ISucursal} from "../models/sucursal.model";

export class sucursalHelpers{
    getSucursal(filtro:any):Promise<ISucursal>{
        return new Promise<ISucursal>( (resolve) =>{
            Sucursal.find(filtro, (err:Error, Sucursal:ISucursal)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Sucursal);
                }
            });
        });
    }

    empleadosPorSucursal(suc: ISucursal):Promise<number>{
        console.log(suc._id);
        return new Promise<number>( resolve => {
            Empleado.aggregate([
                { "$match": { "Sucursal": suc._id }}
            ],(err: Error, data: any)=>{
                if (err){
                    console.log(err.message);
                }
                resolve(data.length);
            })
        });
    }
};
