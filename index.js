const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Omelet",
      level: "Amateur Chef",
      ingredients: ["2 eggs", "1 ham slice", "1 cheese slice", "salt to taste"],
      cuisine: "French",
      dishType: "main_course",
      image:
        "https://food-images.files.bbci.co.uk/food/recipes/cheeseomelette_80621_16x9.jpg",
      duration: 10,
      creator: "Chef James",
    }).then((res) => {
      console.log("New recipe add, with the title: " + res.title);
    });
  })
  .then(() => {
    // multi data insert
    return Recipe.insertMany(data);
  })
  .then((title) => {
    title.forEach((element) => {
      console.log(element.title);
    });
  })
  .then(() => {
    console.log("Insert multi data successful");
  })
  .then(() => {
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
      console.log("Recipe deleted successful");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.connection.close().then(() => {
      console.log("disconnected!🤺 successful");
    });
  });
