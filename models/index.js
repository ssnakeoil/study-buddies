const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Flashcard = require("./Flashcard");
const Messages = require("./Messages");
module.exports = { User, Post, Comment, Flashcard, Messages };

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

User.hasMany(Flashcard, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Post.belongsTo(User, {
    foreignKey: "user_id",
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
});

Flashcard.belongsTo(User, {
    foreignKey: "user_id",
});

Messages.belongsTo(User, {
    as: "sender",
    foreignKey: "sender_id",
});
Messages.belongsTo(User, {
    as: "receiver",
    foreignKey: "receiver_id",
});
