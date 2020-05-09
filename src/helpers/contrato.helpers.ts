import {Contrato, IContrato} from "../models/contrato.model";

export class ContratoHelpers{
    getContrato(filtro:any):Promise<IContrato>{
        return new Promise<IContrato>( (resolve) =>{
            Contrato.find(filtro, (err:Error, Contrato:IContrato)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Contrato);
                }
            });
        });
    }
};