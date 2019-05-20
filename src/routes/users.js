const router = require('express').Router();

// /api/users/
router
  .route('/')
  .post((req, res) => {})
  .get((req, res) => {
    res.send({ name: 'Yurii' });
  })
  .put((req, res) => {})
  .delete((req, res) => {});

router
  .route('/:id')
  .post((req, res) => {})
  .get((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {});

module.exports = router;
