import mongoose from "mongoose";
import { IVehiculo } from "./vehiculo.model";

export interface IAccesorio extends mongoose.Document{
   No_Serie: string;
   Nombre: string;
   Descripcion: string;
   Costo: number;
   Vehiculos: IVehiculo[];
}

const accesorioSchema = new mongoose.Schema({
    No_Serie: {type: String, required: true},
    Nombre: {type: String, required: true},
    Descripcion: {type: String, required: true},
    Costo: {type: Number, required: true},
    Vehiculos: [{type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo"}]
});

export const Accesorio =  mongoose.model<IAccesorio>("Accesorio", accesorioSchema);