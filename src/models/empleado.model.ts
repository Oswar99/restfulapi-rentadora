import mongoose from "mongoose";
import { ISucursal } from "./sucursal.model";

export interface IEmpleado extends mongoose.Document{
    Identidad: string;
    Nombre: string;
    Apellido: string;
    Cargo: string;
    Sucursal: ISucursal;
}

const empleadoSchema = new mongoose.Schema({
    Identidad: {type: String, required: true},
    Nombre: {type: String, required: true},
    Apellido: {type: String, required: true},
    Cargo: {type: String, required: true},
    Sucursal: {type: mongoose.Schema.Types.ObjectId, ref: "Sucursal"}
});

export const Empleado =  mongoose.model<IEmpleado>("Empleado", empleadoSchema);