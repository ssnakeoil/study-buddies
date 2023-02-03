const router = require("express").Router();
const { Flashcard } = require("../../models");
const { withAuth } = require("../../utils/auth");

//add withAuth before asynce once /login /logout is done
router.post("/", withAuth, async (req, res) => {
    console.log('POST /flashcard')
    console.log(req.body)
    try {
        const newFlashcard = await Flashcard.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newFlashcard);

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

// router.delete("/:id", withAuth, async (req, res) => {
//     try {
//       const flashData = await Flashcard.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!flashData) {
//         res.status(404).json({ message: "no flashcard with this id" });
//         return;
//       }
  
//       res.status(200).json(flashData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });



//when getting flashcards make it so user can only get their own flashcards.



module.exports = router;
