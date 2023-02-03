const router = require("express").Router();
const { Messages } = require("../../models");
const { withAuth } = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
    console.log('POST /get')
    console.log(req.session.user_id)
    try {
        const newMessage = Messages.findAll({ where: { receiver_id: req.session.user_id } }).then(function (user) {
            console.log(user)
            res.status(200).json(user);
        })


    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})
router.post("/send", withAuth, async (req, res) => {
    console.log('POST /post')
    console.log(req.body)
    try {
        const newMessage = await Messages.create({
            sender_id: req.session.user_id,
            receiver_id: 1,
            message: req.body.message,
        });
        console.log(newMessage)
        res.status(200).json(newMessage);

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

module.exports = router;