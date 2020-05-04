import mongoose from "mongoose";

export interface ICliente extends mongoose.Document{
    Identificacion: string;
    Nombre: string;
    Edad: string;
    Sexo: string;
    VenLic: string;
};

const clienteSchema = new mongoose.Schema({
    Identificacion : {type: String, required: true},
    Nombre : {type: String, required: true},
    Edad : {type: String, required: true},
    Sexo : {type: String, required: true},
    VenLic : {type: String, required: true}
});

export const Cliente = mongoose.model<ICliente>("Cliente", clienteSchema);