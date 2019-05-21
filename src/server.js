const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const app = express();
const userRouter = require('./routes/user.route');
const recipeRouter = require('./routes/recipes.route');
const recipeChangesRouter = require('./routes/recipe-changes.route');

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/users/', userRouter);
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
