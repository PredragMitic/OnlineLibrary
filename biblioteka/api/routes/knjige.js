const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Knjiga = require('../modules/knjiga.js');

router.post('/', function(req,res,next){
    const knjiga = new Knjiga({
        _id: new mongoose.Types.ObjectId(),
        knjiga: req.body.knjiga,
        autor: req.body.autor
    });

    knjiga.save(function(err,result){
        if(err){
            return res.status(500).json({reason: err});
        }
        res.status(201).json({
            poruka: "Knjiga je dodata",
            kreirano: result
        });
    });

});


router.get('/', function(req,res,next){

    Knjiga.find({}, function(err, result){
        if(err){
            return res.status(500).json({reason: err});
        }

        res.status(200).json({
            rezultat: result
        })
    })
})

router.get('/autor/:autor', function(req,res,next){
    let autor = req.params.autor;

    Knjiga.find({autor:autor}, {knjiga}, function(err,result){
        if(err){
            return res.status(500).json({resan: err});
        }
        res.status(200).json({rezultat:result})
    }).populate('knjiga', {knjiga:1}).sort({knjiga:-1});
});

router.delete(`/:knjiga`, function(req,res,next){
    let naziv = req.params.knjiga;

    Knjiga.find({knjiga:naziv}, function(err, result){
        if(err){
            return res.status(500).json({resan: err});
        }
        else{
            Knjiga.deleteMany({_id : result[0]._id}, function(err){
                if(err){
                    return res.status(500).json({resan: err});
                }

                res.status(200).json({poruka: "Obrisali smo"});
            });
        }
    })
})

module.exports = router;