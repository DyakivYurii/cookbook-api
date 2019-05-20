const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const app = express();
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const recipeChangesRouter = require('./routes/recipe-changes');

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/users/', usersRouter);
app.use('/api/recipes/', recipesRouter);
app.use('/api/recipe-changes/', recipeChangesRouter);

const port = process.env.PORT || 3000;
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
