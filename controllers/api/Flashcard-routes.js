const router = require("express").Router();
const {Flashcard} = require ("../../models");
const withAuth = require("../../utils/auth");

//add withAuth before asynce once /login /logout is done
router.post("/", withAuth, async(req,res) => {
    console.log('POST /flashcard')
    console.log(req.body)
    try {
        const newFlashcard = await Flashcard.create({
            ...req.body,
            user_id:req.session.user_id,
        });
        res.status(200).json(newFlashcard);

    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
})




module.exports = router;
