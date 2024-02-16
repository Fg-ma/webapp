const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const entity_id = req.query.entity_id;
  const type = req.query.type;

  try {
    const entitiesReferences = await req.db.entities_references.findMany({
      where: {
        entity_id: entity_id,
      },
    });

    res.send(entitiesReferences);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
