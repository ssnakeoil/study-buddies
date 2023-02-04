const router = require("express").Router();
const { Messages } = require("../../models");
const { User } = require("../../models");
const { withAuth } = require("../../utils/auth");
const { Op } = require("sequelize");


router.get("/", withAuth, async (req, res) => {
    console.log('POST /get')
    try {
        const newMessage = await Messages.findAll({
            // limit: 1,
            raw: true,
            attributes: ['message'],
            where: {
                [Op.or]: [{ sender_id: req.session.user_id }, { receiver_id: req.session.user_id }]
            },
            order: [['created_at', 'ASC']],
            include: [{
                model: User,
                as: "sender",
                attributes: ['first_name']
            },
            {
                model: User,
                as: "receiver",
                attributes: ['first_name']
            }],
        })
        let arrangeMessages = [] // empty Object
        let sentOrReceive;
        newMessage.forEach(elem => {
            if (elem['sender.first_name'] == req.session.first_name) {
                sentOrReceive = 'sent';
            }
            else {
                sentOrReceive = 'received';
            }
            let singleMsg = {
                'message': elem.message,
                'sender': elem['sender.first_name'],
                'receiver': elem['receiver.first_name'],
                'sentOrReceive': sentOrReceive
            }
            arrangeMessages.push(singleMsg);

        });
        let bulk = JSON.stringify(arrangeMessages);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(bulk, null, 3));

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})
router.post("/send", withAuth, async (req, res) => {
    console.log('POST /chat/send')
    try {
        const adminId = await User.findOne({
            attributes: ['id'],
            where: { email: 'admin@gmail.com' }
        });
        const newMessage = await Messages.create({
            sender_id: req.session.user_id,
            receiver_id: adminId.id,
            message: req.body.message,
        })
        res.status(200).json({ sender: req.session.first_name });

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

module.exports = router;