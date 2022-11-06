import mongoose, { Schema } from 'mongoose';

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true,// trim elimina los espacios en blanco
    },
    direccion: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    sintomas: {
        type: String,
        required: true
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario'
    },
},
    {
        timeStamps: true,
    }
);

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;