const router = require("express").Router();
const Conversation = require("../models/Conversation");

//create conversation
router.post("/",async(req,res)=>{
    try{
        const conversation = await Conversation.create({
            members:[req.body.currentId , req.body.receiverId]
        })
        res.status(200).json(conversation)
    }catch(err){
       res.status(400).json(err)
    }
})

//get user conversation
router.get("/:userId",async (req,res) => {
    try{
    const conversations = await Conversation.find({members:{$in: [req.params.userId]}})
    res.status(200).json(conversations)
    }catch(err){
        res.status(400).json(err)
    }
})

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;