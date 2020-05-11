import {Vehiculo, IVehiculo} from "../models/vehiculo.model";
import { Bitacora } from '../models/bitacora.model';

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
    bitacorasPorVehiculo(veh: IVehiculo):Promise<number>{
        console.log(veh._id);
        return new Promise<number>( resolve => {
            Bitacora.find({ Vehiculos: { $all: [veh._id] } }, (err: Error, data: any)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(data.length)
                }
            });
        });
    }
};