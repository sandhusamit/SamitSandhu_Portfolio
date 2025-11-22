// const express = require("express");
import express from "express"; //we got babel 
const assetsRouter = express.Router();
const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/; // You can add other image formats
const videoRegex = /\/.+\.(mp4|ogv)$/
assetsRouter.get(imageRegex, (req, res) => {
const filePath = req.path;
res.redirect(303, `http://localhost:3000/src${filePath}`);
});
assetsRouter.get(videoRegex, (req, res) => {
const filePath = req.path;
res.redirect(303, `http://localhost:3000/src${filePath}`);
});
// module.exports = router;
export default assetsRouter; // babel again