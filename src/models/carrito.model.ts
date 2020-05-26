import mongoose from "mongoose";
import { ICliente } from "./cliente.model";
import { IVehiculo } from "./vehiculo.model";

export interface ICarrito extends mongoose.Document{
    Cliente: ICliente;
    Vehiculo: IVehiculo;
}

const carritoSchema = new mongoose.Schema({
    Cliente: {type: mongoose.Schema.Types.ObjectId, ref:"Cliente"},
    Vehiculo: {type: mongoose.Schema.Types.ObjectId, ref:"Vehiculo"}
});

export const Carrito =  mongoose.model<ICarrito>("Carrito", carritoSchema);