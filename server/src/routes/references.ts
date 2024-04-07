import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";

router.get("/", verifyToken, async (req, res) => {
  const entity_username = req.query.entity_username;

  try {
    const entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const entitiesReferences = await req.db.entities_references.findMany({
      where: {
        entity_id: entity.entity_id,
      },
    });

    res.send(entitiesReferences);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
