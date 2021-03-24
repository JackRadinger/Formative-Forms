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
  const { firstName, lastName, email, password, confirmedPassword } = req.body;
  const errors = [];

  if(!firstName) {
    errors.push('Please provide a first name.')
  }

  if(!lastName) {
    errors.push('Please provide a last name.')
  }

  if(!email) {
    errors.push('Please provide an email.')
  }

  if(!password) {
    errors.push('Please provide a password.')
  }

  if(password !== confirmedPassword){
    errors.push('The provided values for the password and password confirmation fields did not match.')
  }

  if(errors.length > 0) {
    res.render('create-form', { errors, firstName, lastName, email, password })
    return;
  }
  const user = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(user);
  res.redirect("/");

})

app.get("/create-interesting", csrfProtection, (req, res) => {
  res.render('create-interesting', { csrfToken: req.csrfToken()  })
});

app.post("/create-interesting", (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword, age, favoriteBeatle, iceCream } = req.body;
  const errors = [];

  if(!firstName) {
    errors.push('Please provide a first name.')
  }

  if(!lastName) {
    errors.push('Please provide a last name.')
  }

  if(!email) {
    errors.push('Please provide an email.')
  }

  if(!password) {
    errors.push('Please provide a password.')
  }

  if(password !== confirmedPassword){
    errors.push('The provided values for the password and password confirmation fields did not match.')
  }

  if(!age) {
    errors.push('age is required')
  }

  if(favoriteBeatle === 'Scooby-Doo'){
    errors.push('favoriteBeatle must be a real Beatle member')
  }

  if(favoriteBeatle === ''){
    errors.push('favoriteBeatle is required')
  }

  if(age > 120 || age < 0){
    // console.log(typeof age)
    errors.push('age must be a valid age')
  }

  if(!parseInt(age)) {
    errors.push('age must be a valid age')
  }


  if(errors.length > 0) {
    res.render('create-interesting', { errors, firstName, lastName, email, password, age, iceCream  })
    return;
  }

  if(iceCream === 'on') {
    var iceCreamVal = 'true';
  }


  const user = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    favoriteBeatle: req.body.favoriteBeatle,
    likesIceCream: iceCreamVal
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
