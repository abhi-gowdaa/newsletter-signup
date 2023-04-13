const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}))

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  firstname = req.body.fname;
  lastname = req.body.lname;
  email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname

      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us13.api.mailchimp.com/3.0/lists/91d769fdcb";

  const options = {
    method: "POST",
    auth: "oreoooooooooo:26db58f349de6b9ac514cc9e3394b7dc-us13"
  }

  const request = https.request(url, options, function(response) {

    response.on("data", function(data) {
      console.log(JSON.parse(data));

    })
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/sucess.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  })

  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req, res) {
  res.redirect("/");
})
app.listen(3000, function() {
  console.log("server started at the port 3000");
})


//url "https://us12.api.mailchimp.com/3.0/lists/3943320603"
// api key: 26db58f349de6b9ac514cc9e3394b7dc-us13
//uniq id:3943320603
