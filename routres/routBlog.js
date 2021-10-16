const express = require('express');
const jwt = require("jsonwebtoken");
const verifyToken = require('../verifyToken/verifyToken.js')
const router = express.Router();
const mysql = require('mysql');

const config = {
  host: 'sql4.freemysqlhosting.net',
  user: 'sql4444727',
  password: '9kYNfevp2u',
  database: 'sql4444727'
};


const pool = mysql.createPool(config);



router.get("/posts", (req, res) => {
  ////////console

  pool.query('SELECT * FROM Posts', (error, result) => {
    if (error) throw error;

    res.send(result);

  })
})





//////////////////////////////////////add like for user //////////////////////////////////
router.post('/like', verifyToken.verifyToken, (req, res) => {

  const { postId } = req.body;
  pool.query(`SELECT Likes.like
    
    FROM Posts left JOIN Likes
    ON Posts.id = Likes.postId 
    where Posts.id="${postId}" and userId="${req.authData.id}";
    
    
    ;`, (error, res1) => {
    if (error) throw error;
    console.log(res1)
    if (res1.length == 0) {

      pool.query(`INSERT INTO  Likes (userId,postId) VALUES ('${req.authData.id}','${postId}')`, (error, result) => {

        if (error) {
          res.status(500).send(error);
          return;
        }
        res.send(result);

      })
    } else {
      pool.query(`DELETE FROM Likes WHERE postId='${postId}' and userId='${req.authData.id}';
        `, (error, result) => {

        if (error) {
          res.status(500).send(error);
          return;
        }
        res.send(result);

      })

    }

  })

})





//////////////////////comments //////////////////////////////////////////
router.post('/comment', verifyToken.verifyToken, (req, res) => {

  const { postId, comment } = req.body;
  pool.query(`Insert into Comments (comment,userId,postId) VALUES ('${comment}','${req.authData.id}','${postId}')`, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    pool.query(`select firstName from Users where id='${req.authData.id}'`, (err2, result2) => {
      if (err2) {
        res.status(500).send(err);
        return;
      }

      res.send(result2);

    })
  })


})




//////////////////////get comment ////////////////////////


router.get("/comments/:id", (req, res) => {
  let id = req.params.id;
  pool.query(`SELECT comment,postId,firstName,Comments.id
          FROM Comments 
          INNER JOIN Users 
          ON Comments.userId = Users.id
          where postId='${id}' 
          `, (error, result) => {
    if (error) throw error;

    res.send(result);
    console.log(result)

  })
})

//////////////////////get comment ////////////////////////




////////////////// likes in blog

router.post('/likes', verifyToken.verifyToken, (req, res) => {

  console.log(req.authData.id)
  pool.query(`SELECT postId
      FROM Posts
      LEFT JOIN Likes
      ON Posts.id = Likes.postId
      where Likes.like='like' and  Likes.userId='${req.authData.id}'`, (error, result) => {
    if (error) throw error;

    res.send(result);

  })

});
//////////////////post for all likes in blog




module.exports = router




