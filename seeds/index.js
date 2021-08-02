const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/camp-explore', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'this place is worth for campining12345',
            author: '60fa59a0386edd4ae8b7d36d',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            price: 100,
            image: [
                {

                    url: 'https://res.cloudinary.com/dnrvxvqi5/image/upload/v1627717252/CampExplore/f8sxzvx5zrnuj8w6axxw.jpg',
                    filename: 'CampExplore/f8sxzvx5zrnuj8w6axxw'
                },
                {

                    url: 'https://res.cloudinary.com/dnrvxvqi5/image/upload/v1627717253/CampExplore/mo9cp6fa2frnv1tzqlu6.jpg',
                    filename: 'CampExplore/mo9cp6fa2frnv1tzqlu6'
                },
                {

                    url: 'https://res.cloudinary.com/dnrvxvqi5/image/upload/v1627717255/CampExplore/m7ur2zutk7rgtxejxyds.jpg',
                    filename: 'CampExplore/m7ur2zutk7rgtxejxyds'
                }

            ]
        });
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})