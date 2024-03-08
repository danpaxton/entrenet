const express = require("express");
const dbo = require("../db/conn");
const userRoutes = require("express").Router();

const { createSecretToken } = require("../util/SecretToken");

resourceRoutes.route("/signup").get((req, res) => {
 let db_connect = dbo.getDb();
 db_connect
   .collection("users")
   .find({})
   .toArray()
   .then(data => {
        
     res.json(data);
   });
});