const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyJWT");

// Route to get all groups
router.get("/", async (req, res) => {
  try {
    const groups = await req.db.groups.findMany();
    res.send(groups);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a group by ID
router.get("/:group_id", verifyToken, async (req, res) => {
  const group_id = req.params.group_id;

  try {
    const group = await req.db.groups.findUnique({
      where: {
        group_id: group_id === "user" ? req.user.user_id : group_id,
      },
    });

    if (!group) {
      res.status(404).send("Group not found");
      return;
    }

    res.send(group);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
