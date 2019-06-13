const express = require('express');
const router= express.Router();

const courses = [
    { id: 1, name: 'node' },
    { id: 2, name: 'angular' },
    { id: 1, name: 'java' },
];
// get requests


app.get('/', (req, res) => {
    res.send(courses);
});

app.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send('Id not found');
    }
    else {
        res.send(course);
    }
});

// app.get('/api/posts/:year/:month',(req,res) =>{
//     res.send(req.params);
// });

// app.get('/api/posts/:year/:month',(req,res) =>{
//     res.send(req.query);
// });

// post requests

app.post('/', (req, res) => {

    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// put requests

app.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send('Id not found');

    }

    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: joi.string().min(3).required()
    };
    return joi.validate(course, schema);
}

// delete
app.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Id not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

module.exports = router;