import mongoose from "mongoose";
import { ICliente } from "./cliente.model";
import { IEmpleado } from "./empleado.model";
import { IAccesorio } from "./accesorio.model"

export interface IContrato extends mongoose.Document{
    Fecha: string;
    Estado: number;
    AbonoPrevio: number;
    Empleado: IEmpleado;
    Cliente: ICliente;
}

const contratoSchema = new mongoose.Schema({
    Fecha: {type: String, required: true},
    Estado: {type: Number, required: true},
    AbonoPrevio: {type: Number, required: true},
    Empleado: {type: mongoose.Schema.Types.ObjectId, ref: "Empleado"},
    Cliente: {type: mongoose.Schema.Types.ObjectId, ref: "Cliente"},
});

export const Contrato =  mongoose.model<IContrato>("Contrato", contratoSchema);