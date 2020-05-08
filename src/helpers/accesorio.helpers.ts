import {Accesorio, IAccesorio} from "../models/accesorio.model";

export class AccesorioHelpers{
    getAccesorio(filtro:any):Promise<IAccesorio>{
        return new Promise<IAccesorio>( (resolve) =>{
            Accesorio.find(filtro, (err:Error, Accesorio:IAccesorio)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Accesorio);
                }
            });
        });
    }
};