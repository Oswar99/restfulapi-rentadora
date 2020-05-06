import mongoose from "mongoose";
import { ICliente } from "./cliente.model";
import { IVehiculo } from "./vehiculo.model";
import { IEmpleado } from "./empleado.model";
import { IAccesorio } from "./accesorio.model"

export interface IContrato extends mongoose.Document{
    Contrato: string;
    Fecha: string;
    Estado: number;
    AbonoPrevio: number;
    Empleado: IEmpleado;
    Cliente: ICliente;
    Vehiculos: [{"Vehiculo": IVehiculo}];
    Extras: [{"Accesorio": IAccesorio}];
}

const contratoSchema = new mongoose.Schema({
    Contrato: {type: String, required: true},
    Fecha: {type: String, required: true},
    Estado: {type: Number, required: true},
    AbonoPrevio: {type: Number, required: true},
    Empleado: {type: mongoose.Schema.Types.ObjectId, ref: "Empleado"},
    Cliente: {type: mongoose.Schema.Types.ObjectId, ref: "Cliente"},
    Vehiculos: [{"Vehiculo": {type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo"}}],
    Extras: [{"Accesorio": {type: mongoose.Schema.Types.ObjectId, ref: "Accesorio"}}]
});

export const Contrato =  mongoose.model<IContrato>("Contrato", contratoSchema);