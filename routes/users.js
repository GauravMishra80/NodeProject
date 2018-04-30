const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User Login Route
router.get('/login', (req, res) => {
    res.send('User Login Succesfull');
    });
    
    // User Register Route
    router.get('/register', (req, res) => {
      res.send('User Register Succesfull');
      });
    

      