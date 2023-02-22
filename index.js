const dotenv = require('dotenv').config();

const express = require('express');
const paginationMiddleware = require('./src/middleware/paginationMiddleware');
const routers = require('./src/routes/routers');
const notFound = require('./src/middleware/notFound');
const errorHandler = require('./src/middleware/errorHandler');
const log = require('./src/middleware/log');
const { sequelize } = require('./src/models');

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(log);
// app.use(express.static('./src/storage/uploads'));
app.use(paginationMiddleware);
app.use(routers);
app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('🚧 ➤➤➤ Connection has been established successfully.');
    console.log(`🖥️  ➤➤➤ Server berjalan di http://localhost:${port}`);
  } catch (error) {
    console.error('🚫 ➤➤➤ Unable to connect to the database:', error);
  }
});

// npx sequelize model:create --name produk  --attributes namaProduk:string,deskripsiProduk:string,hargaProduk:int,stokProduk:int,ratingProduk:string
