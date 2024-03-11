const router = require("express").Router();
const Message = require("../models/Message");

//create  message
router.post("/", async (req, res) => {
    try {
      const message = await Message.create(req.body);
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get conversation
  router.get("/:conversationId", async (req, res) => {
    try {
      const message = await Message.find({conversationId:req.params.conversationId});
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err);
    }
  });






module.exports = router;