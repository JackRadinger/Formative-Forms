const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use(express.urlencoded());
app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

app.get("/", (req, res) => {
  res.render('index', { users } )
});

app.get("/create", csrfProtection, (req, res) => {
  res.render('create-form', { csrfToken: req.csrfToken()  })
});

app.post("/create", (req, res) => {
  const user = {
    // csrfToken: req.csrfToken(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(user);
  res.redirect("/");

})

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
