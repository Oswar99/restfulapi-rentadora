import mongoose from "mongoose";
import {ISucursal} from "./sucursal.model"

export interface IVehiculo extends mongoose.Document{
    Placa: string;
    Tipo: string;
    Marca: string;
    Modelo: string;
    Color: string;
    No_Serie: string;
    Precio_Renta: Number;
    Sucursal: ISucursal;
}

const vehiculoSchema = new mongoose.Schema({
    Placa : {type: String, required: true},
    Tipo : {type: String, required: true},
    Marca : {type: String, required: true},
    Modelo : {type: String, required: true},
    Color : {type: String, required: true},
    No_Serie : {type: String, required: true},
    Precio_Renta: {type: Number, required: true},
    Sucursal: {type: mongoose.Schema.Types.ObjectId, ref: "Sucursal"}
});

export const Vehiculo = mongoose.model<IVehiculo>("Vehiculo", vehiculoSchema);