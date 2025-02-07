const db = require('../config/db');

// Function to insert a new user
const insertUser = async (name, email, password) => {
    try {
      const [result] = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
      );
      return result;
    } catch (error) {
      throw error;
    }
  };

  const findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                reject(err); // Reject on database error
            } else if (results.length === 0) {
                resolve(null); // Resolve null if no user found
            } else {
                resolve(results[0]); // Resolve with first matching user
            } 
        });
    });
};
  
  module.exports = { insertUser, findUserByEmail };