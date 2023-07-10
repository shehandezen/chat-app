const express = require("express");
const Chat = require("../db/models/chat");
const {getData} = require("../dbOperations")

const router = express.Router()

router.get("/:email", async(req, res)=>{
  try{ const data = await getData(
      {
        $or: [
          { creater: req.params.email },
          {  user: req.params.email },
        ],
      },
      Chat
    );
    res.status(200).json({
      status: "success",
      data: { data },
    });
}catch(error){
    console.log(error)
    res.status(500).json({
      status: "failed",
      data: { error },
    });
}
})


module.exports = router