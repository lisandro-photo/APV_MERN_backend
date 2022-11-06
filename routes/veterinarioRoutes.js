import express from "express";
import { 
    registrar, 
    perfil, 
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword    
} from "../controllers/veterinarioController.js";// Conecta con el controlador que envía las vistas
import checkAuth from "../middleware/authMiddleware.js";


const router = express.Router();

// Área Pública
router.post('/', registrar);// esta url equivale a /api/veterinarios y envía la vista registrar
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
// router.get('/olvide-password/:token', comprobarToken);
// router.post('/olvide-password/:token', nuevoPassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);// Esto hace lo mismo que las dos rutas escritas arriba

// Área Privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword)

export default router;