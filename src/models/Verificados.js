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
      type: [{}],
    },
    fechaHora: {
      type: String,
    },
    fechaComprado: {
      type: String,
    },

    estado: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Verificados", schema);
