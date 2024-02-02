const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
const request = require("request");
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const Email = req.body.eMail;
    
    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/020878075d?skip_duplicate_check=<SOME_BOOLEAN_VALUE>";

    const options = {
        method: "POST",
        auth: "jad1:48995042bdbdade74b41d0c441b80882-us21"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }

        
        
        response.on("data", function (data) {
       

            })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || port, () =>{
    console.log("Server running on port 3000. ");
});


//API key
//48995042bdbdade74b41d0c441b80882-us21

//Audiance id
//020878075d