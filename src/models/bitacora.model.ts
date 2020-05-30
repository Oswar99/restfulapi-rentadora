import mongoose from "mongoose";
import { IVehiculo } from "./vehiculo.model";
import { IContrato } from "./contrato.model";

export interface IBitacora extends mongoose.Document{
    Contrato: IContrato;
    Inicio: Date;
    Final: Date;
    Estado: Number;
}

const bitacoraSchema = new mongoose.Schema({
    Contrato: {type: mongoose.Schema.Types.ObjectId, ref:"Contrato"},
    Inicio: {type: Date, required: true},
    Final: {type: Date, required: true},
    Estado: {type: Number, required: true},
});

export const Bitacora =  mongoose.model<IBitacora>("Bitacora", bitacoraSchema);