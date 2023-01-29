const router = require('express').Router();
const userRoutes = require("./User-routes");
const postRoutes = require ("./Post-routes")
const commentRoutes = require('./Comment-routes');
const flashcardRoutes = require('./Flashcard-routes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/flashcards', flashcardRoutes);

module.exports = router;
