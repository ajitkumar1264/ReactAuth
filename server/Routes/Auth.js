const express = require("express");
const jwtoken = require("jsonwebtoken");
const secretKey = "hardikvaghela";
const router = express.Router();
const bcrypt = require("bcryptjs");
const Connect = require("../DB/connect");
const token = require("../Middleware/token");

//post create user

router.post("/regi", async (req, res) => {
  var user = req.body;
  console.log(user);
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(user.password, salt);
  const RegiData = [user.name, user.email, newPassword];
  Connect.query(
    "insert into createUser (name,email,password) values(?)",
    [RegiData],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: true,Register:true, data: rows });
      }
    }
  );
});

//post request login
router.post("/send", (req, res) => {
  const user = req.body;
  const LoginData = [user.email, user.password];

  Connect.query(
    "select * from createUser where email=?",
    [user.email],
    async (err, rows) => {
      if (err) {
        res.json({ success: false, error: err.message });
      } else {
        if (rows.length > 0) {
          console.log(rows[0].password);

          const valid = await bcrypt.compare(user.password, rows[0].password);

          if (valid) {
            jwtoken.sign(
              user,
              secretKey,
              { expiresIn: "1day" },
              (err, token12) => {
                if (err) {
                  res.json({ error: err.message });
                } else {
                  res.cookie("JsonwebToken", token12, {
                    expiresIn: new Date(new Date().getTime() + 30 * 60 * 1000),
                  });
                  res.header(
                    "Access-Control-Allow-Origin",
                    "http://localhost:3000"
                  );
                  res.header("Access-Control-Allow-Credentials", "true");
                  res.json({ success: token12,login:true });
                }
              }
            );
          } else {
            res.json({ success: false, err:"pass", message: "password not matched" });
          }
        } else {
          res.json({ success: false, err:"Uexists", message: "sorry but use not exits" });
        }
      }
    }
  );
  console.log(req.body);
});

router.get("/getUser", token, async(req, res) => {
  try {
    const token = req.auth;
    console.log("the midleware work correctly and");
    res.json({ token: token, message: "all work correctly",IsToken:true });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
