const express = require('express');
const controllerLivros = require('./controllers/controllerLivros');
const controllerUsuario = require('./controllers/controllerUsuario');
const controllerAutor = require('./controllers/controllerAutor');
const multer = require('multer');
const uploadConfigCapa = require('../config/uploadCapa');
const uploadConfigDoc = require('../config/uploaddoc');
const controllersCategoria = require('./controllers/controllersCategoria');

const router = express.Router();
const upload1 = multer(uploadConfigCapa);
const upload2 = multer(uploadConfigDoc);


router.get('/', (req, res) => {
    res.render("index");
})
/*************************Todas rotas dos utilizadores do sistema**************** */

router.get('/api/usuario', controllerUsuario.Usuario);
router.post('/api/usuario', controllerUsuario.CadastrarUsuario);
router.post('/api/auth', controllerUsuario.autenticarUsuario);


/*************************Todas rotas dos do livro**************** */
router.post('/api/livro', upload1.single('capa'), controllerLivros.CadastrarLivros);
router.post('/api/up-document', upload2.single('doc'), controllerLivros.UploadFile);
router.get('/api/documento', controllerLivros.listarDocumento);
router.get('/api/livro', controllerLivros.listarTodos);
router.get('/api/livro/:id', controllerLivros.listarUm);
router.get('/api/livro/categoria/:id', controllerLivros.listarCategoria);

router.put('/api/livro-update/:id', controllerLivros.atualizarLivro);
router.delete('/api/livro-delete/:id', controllerLivros.deletarLivro);

router.post('/api/categoria', controllersCategoria.CadastrarCategoria);
router.get('/api/categoria', controllersCategoria.listarTodos);
router.get('/api/categoria/:id', controllersCategoria.listarUm);
router.get('/api/categoria-update/:id', controllersCategoria.atualizarLivro);
router.get('/api/categoria-delete/:id', controllersCategoria.deletarLivro);
/*************************Todas rotas de autor**************** */
router.post('/api/autor', upload1.single('foto_autor'), controllerAutor.CadastrarAutor);
router.get('/api/autor', controllerAutor.listarTodos);



/*************************Todas rotas Extras**************** */
module.exports = router;