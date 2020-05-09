import {Contrato, IContrato} from "../models/contrato.model";
import { IFactura, Factura } from '../models/factura.model';

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

    contratosPorFactura(con: IContrato):Promise<number>{
        console.log(con._id);
        return new Promise<number>( resolve => {
            Factura.aggregate([
                { "$match": { "Contrato": con._id }}
            ],(err: Error, data: any)=>{
                if (err){
                    console.log(err.message);
                }
                resolve(data.length);
            })
        });
    }
};