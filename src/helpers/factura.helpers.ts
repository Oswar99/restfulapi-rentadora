import {Factura, IFactura} from "../models/factura.model";

export class FacturaHelpers{
    getFactura(filtro:any):Promise<IFactura>{
        return new Promise<IFactura>( (resolve) =>{
            Factura.find(filtro, (err:Error, Factura:IFactura)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Factura);
                }
            });
        });
    }
    
};