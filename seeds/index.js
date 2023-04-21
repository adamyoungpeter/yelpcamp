const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 50);
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis laoreet elit. Vivamus mauris nisi, aliquam malesuada scelerisque eget, tincidunt sed felis. Suspendisse iaculis augue et nisl ultricies tristique sed quis felis. Donec dapibus, nisi at sollicitudin finibus, ligula velit consectetur tortor, in rutrum leo augue sed urna. Aenean facilisis consequat quam id aliquam. Aliquam molestie dolor at nunc interdum, eget ultrices nulla ullamcorper. In vehicula, mi eu pulvinar vestibulum, justo nibh egestas mi, a fringilla sapien nunc feugiat massa.In sit amet sapien in mauris interdum vehicula sit amet ac ex. Nam mollis metus purus, quis pellentesque massa sagittis eget. Aenean fermentum bibendum diam id ullamcorper. Nullam bibendum blandit elit, et egestas nibh varius nec. Suspendisse ultrices libero vel urna convallis, vitae finibus erat viverra. Duis tincidunt augue ut tincidunt mattis. Vestibulum pharetra efficitur nibh. Duis a condimentum dolor, in blandit nisl. Duis ac turpis a mauris tincidunt tempor. Vivamus porta ante id facilisis blandit. Aliquam pharetra turpis dolor, eget commodo tortor pulvinar at.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
