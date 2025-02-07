const categoryModel  = require('../models/categoryModel');


const add = (req, res) => {
    try {
        const { catname, catdescription } = req.body;
            if (!catname || !catdescription) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            categoryModel.insertUser(catname, catdescription);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Registration failed' });
        }

};

module.exports = { add };