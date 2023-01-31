const router = require("express").Router();
const { Post } = require("../../models");
const { withAuth } = require("../../utils/auth");

//add withAuth before asynce once /login /logout is done
router.post("/", withAuth, async (req, res) => {
    console.log('POST /post')
    console.log(req.body)
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})




module.exports = router;
