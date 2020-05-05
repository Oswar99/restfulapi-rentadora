import mongoose from "mongoose";

export interface ISucursal extends mongoose.Document{
    Pais: string;
    Dep_Est: string;
    Ciudad: string;
    Direccion: string;
}

const sucursalSchema = new mongoose.Schema({
    Pais: {type: String, required: true},
    Dep_Est: {type: String, required: true},
    Ciudad: {type: String, required: true},
    Direccion: {type: String, required: true}
});

export const Sucursal = mongoose.model<ISucursal>("Sucursal", sucursalSchema);