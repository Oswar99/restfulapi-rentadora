import {Bitacora, IBitacora} from "../models/bitacora.model";

export class BitacoraHelpers{
    getBitacora(filtro:any):Promise<IBitacora>{
        return new Promise<IBitacora>( (resolve) =>{
            Bitacora.find(filtro, (err:Error, Bitacora:IBitacora)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Bitacora);
                }
            });
        });
    }
};