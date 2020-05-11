import {Vehiculo, IVehiculo} from "../models/vehiculo.model";
import { Bitacora, IBitacora } from '../models/bitacora.model';

export class VehiculoHelpers{
    getVehiculo(filtro:any):Promise<IVehiculo>{
        return new Promise<IVehiculo>( (resolve) =>{
            Vehiculo.find(filtro, (err:Error, Vehiculo:IVehiculo)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Vehiculo);
                }
            });
        });
    }
    bitacorasPorVehiculo(veh: any):Promise<number>{
        return new Promise<number>( resolve => {
            Bitacora.aggregate([
               {"$match": {Vehiculos: {$all: [veh]}} }
            ],(err: Error, data: any)=>{
                if (err){
                    console.log(err.message);
                }
                resolve(data.length);
            })
        });
    }
    bpv(filtro: any): Promise<number>{
        return new Promise<number>( resolve =>{
            Bitacora.find(filtro, (err:Error, bit: IBitacora[])=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(bit.length);
                }
            });
        });
    }

};