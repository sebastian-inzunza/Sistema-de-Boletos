import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        telefono: {
            type: String,
        },
        nombre: {
            type: String,
        },
        folio: {
            type: String,
        },
        boletos: {
            type: [{}] ,
        },
        estado: {
            type:String
        },
        fechaHora:{
            type: String
        }

    },
    {
        timestamps: true,
    }
);

export default model("Comprados", schema);
