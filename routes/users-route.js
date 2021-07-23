const express = require('express');
const User = require('../models/user');
const { AuthUser } = require('../services/middlewares');

const router = express.Router();

/**
 * Retrieve own account
 */
router.get('/me', AuthUser, async (req, res) => {
  const { id } = req.session.user;
  const user = await User.findById(id)
    .catch((e) => {
      console.log('error:', e.message);
      res.sendStatus(404);
    });
  res.json(user);
});

module.exports = router;
