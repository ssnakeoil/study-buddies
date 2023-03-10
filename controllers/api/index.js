const router = require('express').Router();
const userRoutes = require("./User-routes");
const postRoutes = require("./Post-routes")
const commentRoutes = require('./Comment-Routes');
const flashcardRoutes = require('./Flashcard-routes');
const chat = require('./MessagesRoutes');
const adminChatRoutes = require('./AdminChatRoutes')
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/flashcards', flashcardRoutes);
router.use('/chat', chat);
router.use('/chat/admin', adminChatRoutes);
module.exports = router;
