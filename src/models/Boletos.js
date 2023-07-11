import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        numero: {
            type: Number,

        },
        activo: {
            type: Boolean,
        }
    },
    {
        timestamps: true,
    }
);

export default model("Boletos", schema);
