let express = require("express");
let Joi = require("@hapi/joi");
let app = express();


app.use(express.json());
let port = process.env.PORT || 4900;


             // ******** All Players List **********//
let cricket = [
  {
    id: 1,
    name: "Rohit Sharma",
    position: "Opening-batsman",
  },
  {
    id: 2,
    name: "Virat Kohli",
    position: "onedown-batsman",
  },
  {
    id: 3,
    name: "M S Dhoni",
    position: "Wk-batsman",
  },
  {
    id: 4,
    name: "Hardik Pandya",
    position: "All-Rounder",
  },
];

app.get("/cricket", (req, res) => {
  res.send(cricket);
});


      //************ Access any of the player Info by Selecting id ************//
app.get("/cricket/:id", (req, res) => {
  let player = cricket.find((item) => item.id === parseInt(req.params.id));
  if (!player) {
    return res.status(404).send({ message: "Invalid player id" });
  }
  res.send(player);
});


        //**********  creating new profile of player ************//

app.post("/cricket/createcricket", (req, res) => {
  let data = {
    id: cricket.length + 1,
    name: req.body.name,
    position: req.body.position,
  };
  cricket.push(data);
  res.send(cricket);
})


        //************* update player Record *************//

app.put("/cricket/player/:id", (req, res) => {
  //step1:
  let player = cricket.find((item) => item.id === parseInt(req.params.id));
  if (!player) {
    return res.status(404).send({ message: "Invalid course id" });
  }

  //step2
  let schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    position:Joi.string().min(3).max(100).required(),
  });
  let result = schema.validate(req.body);
  // console.log(result);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  //step3
  player.name = req.body.name;
  player.position = req.body.position;
  res.send(cricket);
});


      //********* delete player record by id ************//

app.delete("/cricket/removecricket/:id", (req, res) => {
  //step1:
  let player = cricket.find((item) => item.id === parseInt(req.params.id));
  if (!player) {
    return res.status(404).send({ message: "Invalid course id" });
  }
  let index = cricket.indexOf(player);
  let data = cricket.splice(index, 1);
  res.send(cricket);
});
 


app.listen(port, () => console.log(`Your Port is Working on ${port}`));