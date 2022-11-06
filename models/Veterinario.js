import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,// para que el email de registro sea único
        trim: true,
    },
    telefono: {
        type: String,
        default: null,// No es obligatorio que carguen el número de teléfono
        trim: true,// trim elimina los espacios en blanco
    },
    direccion: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,// No es obligatorio porque no todos os veterinarios tienen un sitio web
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
});

veterinarioSchema.pre('save', async function (next) {    
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;

