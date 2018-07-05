const express = require('express');
const router = express.Router();
const placeDB = require('../db/placeDB');

router.post('/',function(req,res){
    placeDB.addPlace(req.body)
    .then((result) => {
        res.status(200).end(result);
    }).catch((err)=>{res.status(500).end(err);})
});

router.get('/',function(req,res){
    placeDB.getPlaces(req.body)
        .then((result)=>{
            res.status(200).end(result);
        }).catch((err)=>{
            res.status(500).end(err);
        });
});

router.get('/nearest',function(req,res){
    placeDB.findNearestLoc(-91.9612747,41.0132949).then((result)=>{
        res.status(200).end(result);
    }).catch((err)=>{
        res.status(500).end(err);
    });
});

router.get('/:id',function(req,res){
    placeDB.getPlace(req.params.id).then((result) =>{
        res.status(200).end(result);
    }).catch((err)=>{
        res.status(500).end(err);
    });
});

module.exports=router;