const User = require('../models/user');

class Authentication {
  static async GoogleUser(data) {
    const {
      name, email, picture, sub,
    } = data;

    let user = await User.findOne({
      method: 'google',
      'google.id': sub,
    });

    if (user && !user.avatar) {
      user.avatar = picture;
      await user.save();
    }

    if (!user) {
      user = new User({
        method: 'google',
        username: name,
        avatar: picture,
        google: {
          id: sub,
          email,
          displayName: name,
        },
      });
      user.save();
      console.log(`user created: ${user.name()}`);
    }

    return user;
  }
}

module.exports = Authentication;
