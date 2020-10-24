//Example for creating JSON Rest server....
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;

//middleware....
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

//GET(Reading), POST(Adding), PUT(Updating), DELETE(Deleting) data....
let user = []; //blank array...
let flag = 1;

function readData() {
    const filename = "data.json"; //new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    user = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "data.json";
    const jsonData = JSON.stringify(user);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/user", (req, res) => {
    readData();
    res.send(JSON.stringify(user));
})

app.get("/user/:id", (req, res) => {
    const userid = req.params.id;
    if (user.length == 0) {
        readData();
    }
    let foundRec = user.find((e) => e.userId == userid);
    if (foundRec == null)
        throw "User not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/user", (req, res) => {
    if (user.length == 0)
        readData(); //Fill the array if it is not loaded....
    let body = req.body;
    //iterate thro the collection
    for (let index = 0; index < user.length; index++) {
        let element = user[index];
        if (element.userId == body.userId) { //find the matching record
            element.userName = body.userName;
            element.userPhone = body.userPhone;
            element.userEmail = body.userEmail;
            element.userCity = body.userCity;
            saveData();
            res.send("User updated successfully");
        }
    }
    //update the data
    //exit the function....
})

app.post('/user', (req, res) => {
    if (user.length == 0)
        readData(); //Fill the array if it is not loaded....
    let body = req.body; //parsed data from the POST...



    for (let index = 0; index < user.length; index++) {
        let element = user[index];
        if (element.userName == body.userName) { //find the matching record
            res.send("User name already exists");
            flag = 0;
        }

    }


    if (flag >= 1) {
        user.push(body);
        saveData(); //updating to the JSON file...
        res.send("User added successfully");
    }

})
app.delete("/user/:id", (req, res) => {
    throw "Do it UR Self!!!!";
})

app.listen(1234, () => {
    console.log("Server available at 1234");
})