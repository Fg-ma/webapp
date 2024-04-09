import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import { Entity, EntityReferences } from "@FgTypes/types";

router.get("/", verifyToken, async (req, res) => {
  const entity_username = req.query.entity_username;

  try {
    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const entityReferences: EntityReferences[] =
      await req.db.entities_references.findMany({
        where: {
          entity_id: entity.entity_id,
        },
      });

    const returningEntityReferences = entityReferences.map((reference) => ({
      reference_id: reference.reference_id,
      title: reference.title,
      author: reference.author,
      url: reference.url,
    }));

    res.send(returningEntityReferences);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
