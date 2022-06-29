const express = require('express');
const rescue = require('express-rescue');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routers/index');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/products', rescue(router.productsRouter));
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;