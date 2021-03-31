//Import the dependencies
const express = require('express');
const mongoose = require('mongoose');
//Creating a Router
var router = express.Router();
//Link
const Course = mongoose.model('Crud');
const Game = require('../models/Game')

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file.originalname)
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        console.log(file.originalname)
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

//Router Controller for READ request
router.get('/', (req, res) => {
    res.render("Skate/courseAddEdit", {
        viewTitle: "Creat a skateboard"
    });
});

//Router Controller for UPDATE request
router.post('/', upload.single('img'), (req, res) => {
    try {
        if (req.body._id == '') {

            insertIntoMongoDB(req, res);
        }
        else {
            updateIntoMongoDB(req, res);
        }
    } catch (error) {
        console.error(error);
    }



});

//Creating function to insert data into MongoDB
function insertIntoMongoDB(req, res) {

    var course = new Course();
    course.Style = req.body.Style;
    course.Brand = req.body.Brand;
    course.Length = req.body.Length;
    course.Material = req.body.Material;
    course.Picture = req.file.originalname;
    course.save((err, doc) => {

        if (!err)
            res.redirect('course/list');
        else
            console.log('Error during record insertion : ' + err);
    });



}

//Creating a function to update data in MongoDB
function updateIntoMongoDB(req, res) {
    Course.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('course/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("Skate/courseAddEdit", {
                    //Retaining value to be displayed in the child view
                    viewTitle: 'Update Skatebos Details',
                    employee: req.body
                });
            }
            else
                console.log('Error during updating the record: ' + err);
        }
    });
}

//Router to retrieve the complete list of available skateboards
router.get('/list', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            res.render("Skate/list", {
                list: docs
            });
        }
        else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    }).lean();
});

//Router to retrieve the G A M E
router.get('/game', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            res.render("Skate/game", {
                list: docs
            });
        }
        else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    }).lean();
});

router.post('/game', async (req, res) => {
    console.log(req.body)
    const newScore = new Game()
    newScore.name = req.body.name
    newScore.score = req.body.scorevalue

    await newScore.save()

    res.send('Score ingresado')
})

//Router to retrieve the Scoreboard
router.get('/scoreboard', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            res.render("Skate/Score", {
                list: docs
            });
        }
        else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    }).lean();
});


//Creating a function to implement input validations
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'courseName':
                body['courseNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

//Router to update a course using it's ID
router.get('/:id', (req, res) => {
    Course.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("Skate/courseAddEdit", {
                viewTitle: "Update skateboard Details",
                course: doc
            });
        }
    });
});

//Router Controller for DELETE request
router.get('/delete/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/course/list');
        }
        else { console.log('Failed to Delete Course Details: ' + err); }
    });
});

module.exports = router;