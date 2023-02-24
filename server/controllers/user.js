const { db } = require('../dbCONFIG/db')
const bcrypt = require("bcrypt");
const saltRounds = 10;


module.exports = {
    RegisterUser:((req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
      
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
      
          db.query(
            "INSERT INTO users (username, email, password) VALUES (?,?,?)",
            [username, email, hash],
            (err, result) => {
              if (err) {
                res.send(err)
              } else {
                res.send({message : "user created!!"})
              }
            }
          );
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
          res.status(200).send({info : req.session.user, loggedIn : "true"});
        } else {
          res.send({ loggedIn: false });
        }
      }),

    UserLogout : ((req, res) => {
        if (req.session) {
          req.session.destroy()
          res.clearCookie('userId',{path: '/' })
          return res.status(200).json({ msg: 'logging you out' })
        } else {
          return res.status(404).json({ msg: 'no user to log out!' })
        }
      }),

    UploadImage : ((req, res) => {
      if (!req.file) {
          console.log("No file upload");
      } else {
          console.log(req.file.filename)
          var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
          var insertData = "INSERT INTO users(image)VALUES(?)"
          db.query(insertData, [imgsrc], (err, result) => {
              if (err) throw err
              console.log("file uploaded")
          })
      }
  })
    
}