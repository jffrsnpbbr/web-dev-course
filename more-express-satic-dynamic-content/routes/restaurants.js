const crypto = require('crypto');
const express = require('express');

const resData = require('../utils/resturant-data');

const router = express.Router();

router.get('/restaurants', function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();
  
  res.render('restaurants', { numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants });
});

router.get('/restaurants/:id', function(req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants()

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-details', { restaurant: restaurant });
    }
  }

  res.status(404).render('404');
});

router.get('/recommend', function (req, res) {
  res.render('recommend');
});

router.post('/recommend', function (req, res) {
  console.log('recommend post');
  const restaurant = req.body;
  restaurant.id = crypto.randomUUID();

  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);
  
  resData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

router.get('/confirm', function (req, res) {
  res.render('confirm');
});

module.exports = router;