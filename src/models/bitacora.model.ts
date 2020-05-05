import mongoose from "mongoose";
import { IVehiculo } from "./vehiculo.model";

export interface IBitacora extends mongoose.Document{
    Inicio: Date;
    Final: Date;
    Estado: Number;
    Vehiculo: IVehiculo;
}

const bitacoraSchema = new mongoose.Schema({
    Inicio: {type: Date, required: true},
    Final: {type: Date, required: true},
    Estado: {type: Number, required: true},
    Vehiculo: {type: mongoose.Schema.Types.ObjectId, ref:"Vehiculo"}
});

export const Bitacora =  mongoose.model<IBitacora>("Bitacora", bitacoraSchema);