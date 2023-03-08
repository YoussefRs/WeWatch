const { db } = require('../dbCONFIG/db')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const path = require('path')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination : function (req, file, callback) {
    callback(null, './uploads')
  },
  filename : function (req, file, callback) {
    console.log(file)
    callback(null, file.filename + "-" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

module.exports = {
  RegisterUser: ((req, res) => {
    
    
    upload.single('pic')(req, res, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error uploading file' });
      } 
      let imageUrl;
        if (req.file && req.file.filename) {
          imageUrl = `http://${req.hostname}:5000/login/${req.file.filename}`;
        } else {
          imageUrl = null;
}
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ message: 'Error hashing password' });
        }
  
        db.query(
          'INSERT INTO users (username, email, password, profilepic) VALUES (?, ?, ?, ?)',
          [username, email, hash, imageUrl], 
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).send({ message: 'Error creating user' });
            } else {
              return res.status(201).send({message : "user created succesfully"});
            }
          }
        );
      });
    });
  }),

    UserLogin:((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
      
        db.query(
          "SELECT * FROM users WHERE email = ?;",
          email,
          (err, result) => {
            if (err) {
                res.status(500).send({ err: err });
            }
      
            if (result.length > 0) {
              bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                  req.session.user = result;
                  res.status(200).send({info : result, loggedIn : "true"});
                } else {
                    res.status(200).send({ message: "Wrong email/password combination!" });
                }
              });
            } else {
                res.status(404).send({ message: "User doesn't exist" });
            }
          }
        );
      }),

    LoginStatus : ((req, res) => {
        if (req.session.user) {
          res.send({ loggedIn: true, user: req.session.user });
        } else {
          res.send({ loggedIn: false });
        }
      }),

    UserLogout : ((req, res) => {
        if (req.session) {
          req.session.destroy()
          res.clearCookie('userId')
          return res.status(200).json({ msg: 'logging you out' })
        } else {
          return res.status(404).json({ msg: 'no user to log out!' })
        }
      }),

    
}