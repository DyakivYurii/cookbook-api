require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const AuthMiddleware = require('./middlewares/auth.middlewares');

const app = express();
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const recipeRouter = require('./routes/recipe.route');
const recipeChangesRouter = require('./routes/recipe-changes.route');

app.use(cors());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log(`This is my key`, process.env.SECRET_KEY);
app.use(authRouter);

app.use('/api/users/me', AuthMiddleware.protect);
app.use('/api/users/', userRouter);

app.use('/api/recipes/me', AuthMiddleware.protect);
app.use('/api/recipes/', recipeRouter);

app.use('/api/recipe-changes/', recipeChangesRouter);

const port = process.env.PORT || 4000;
const listen = () => {
  try {
    app.listen(port, () => {
      console.log(`Port: ${port}`);
    });
  } catch (error) {
    console.error(`We got an error`, error);
  }
};

module.exports = { listen };
