import {Cliente, ICliente} from "../models/cliente.model";
import { Contrato } from '../models/contrato.model';

export class ClienteHelpers{
    getCliente(filtro:any):Promise<ICliente>{
        return new Promise<ICliente>( (resolve) =>{
            Cliente.find(filtro, (err:Error, Cliente:ICliente)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Cliente);
                }
            });
        });
    }

    contratosPorCliente(cli: ICliente):Promise<number>{
        console.log(cli._id);
        return new Promise<number>( resolve => {
            Contrato.aggregate([
                { "$match": { "Cliente": cli._id }}
            ],(err: Error, data: any)=>{
                if (err){
                    console.log(err.message);
                }
                resolve(data.length);
            })
        });
    }
};