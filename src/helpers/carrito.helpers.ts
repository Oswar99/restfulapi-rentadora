import { ICarrito, Carrito } from "../models/carrito.model";
import { ClienteHelpers } from "./cliente.helpers";
import { IVehiculo, Vehiculo } from "../models/vehiculo.model";

export class CarritoHelpers extends ClienteHelpers{
    
    getCarritos(filtro:any):Promise<ICarrito[]>{
        return new Promise<ICarrito[]>( (resolve) =>{
            Carrito.find(filtro, (err:Error, Carrito:ICarrito[])=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(Carrito);
                }
            });
        });
    }

    public async getPrecVeh(car: ICarrito[]){
        let total:number = 0;
        let i: number = 0;
        while(i < car.length){
            await Vehiculo.findById(car[i].Vehiculo,(err:Error, vehiculo: IVehiculo)=>{
                if(err){
                    console.log(err.message);
                }else{
                    total += vehiculo.Precio_Renta.valueOf()
                }
            });
        i++;
        }
        return total * 0.1;
    }
};

