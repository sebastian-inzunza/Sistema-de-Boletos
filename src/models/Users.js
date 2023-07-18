import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        name: {
            type: String,
        },
        pass: {
            type: String,
        },

    },
    {
        timestamps: true,
    }
);

export default model("Users", schema);
