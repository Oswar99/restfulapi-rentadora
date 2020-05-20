import mongoose from "mongoose";
import { IEmpleado } from "./empleado.model";

export interface IUsuario extends mongoose.Document{
    Usuario: string;
    Contraseña: string;
    Empleado: IEmpleado;
}

const usuarioSchema = new mongoose.Schema({
    Usuario: {type: String, required: true},
    Contraseña: {type: String, required: true},
    Empleado: {type: mongoose.Schema.Types.ObjectId, ref: "Empleado"}
});

export const Usuario =  mongoose.model<IUsuario>("Usuario", usuarioSchema);