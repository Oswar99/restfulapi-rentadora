import mongoose from "mongoose";
import { IContrato } from "./contrato.model";

export interface IFactura extends mongoose.Document{
   Factura: string;
   RTN: string;
   Subtotal: number;
   Imp15: number;
   Imp4: number;
   Total: number;
   Contrato: IContrato;
}

const facturaSchema = new mongoose.Schema({
    Factura: {type: String, required: true},
    RTN: {type: String, required: true},
    Subtotal: {type: Number, required: true},
    Imp15: {type: Number, required: true},
    Imp4: {type: Number, required: true},
    Total: {type: Number, required: true},
    Contrato: {type: mongoose.Schema.Types.ObjectId, ref: "Contrato"}
});

export const Factura =  mongoose.model<IFactura>("Factura", facturaSchema);