import {Cliente, ICliente} from "../models/cliente.model";

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
};