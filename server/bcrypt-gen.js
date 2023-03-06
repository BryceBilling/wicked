const bcrypt = require("bcrypt");

const saltRounds = 10;
const plaintextPassword = "BryceBilling";

bcrypt.genSalt(saltRounds, (err, salt) => {
  bcrypt.hash(plaintextPassword, salt, (err, hash) => {
    if (err) {
      console.error(err);
    } else {
      console.log(hash);
      // Store hash in database or use it as needed
    }
  });
});
