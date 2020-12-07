const router = require('express').Router();
let Password = require('../models/password.model');

router.route('/').get((req, res) => {
  Password.find()
    .then(password => res.json(password))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const date = Date.parse(req.body.date);

  const newPassword = new Password({
    username,
    email,
    password,
    date,
  });

  newPassword.save()
  .then(() => res.json('Password added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Password.findById(req.params.id)
    .then(password => res.json(password))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Password.findByIdAndDelete(req.params.id)
    .then(() => res.json('Password deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Password.findById(req.params.id)
    .then(password => {
      password.username = req.body.username;
      password.email = req.body.email;
      password.password = req.body.password;
      password.date = Date.parse(req.body.date);

      password.save()
        .then(() => res.json('Password updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;