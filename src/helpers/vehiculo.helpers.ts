import {Vehiculo, IVehiculo} from "../models/vehiculo.model";

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
};