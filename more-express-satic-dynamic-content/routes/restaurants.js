const crypto = require('crypto');
const express = require('express');

const resData = require('../utils/resturant-data');

const router = express.Router();

router.get('/restaurants', function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';

  
  const storedRestaurants = resData.getStoredRestaurants();

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }

  if (order === 'desc') {
    nextOrder = 'asc';
  } else {
    nextOrder = 'desc';
  }

  storedRestaurants.sort(function (resA,resB) {
    if ((order === 'asc' && resA.name > resB.name) || (order === 'desc' && resB.name > resA.name)) {
      return 1;
    }
    return -1;
  });

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder
  });
});

router.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

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
