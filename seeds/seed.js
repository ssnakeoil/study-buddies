const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userdata.json');
const postData= require('./postData.json')
const commentData = require('./commentData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    const posts = await Post.bulkCreate(postData, {
        user_id: users.id,
        returning: true
    })
    for (const comment of commentData){
        await Comment.create ({
            ...comment,
            post_id: comment.post_id,
        })
    }
 
    process.exit(0);
};

seedDatabase();