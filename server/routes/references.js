const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const entity_id = req.query.entity_id;
    const type = req.query.type;

    try {
        let entitiesReferences;

        if (type === "individuals") {
            entitiesReferences = await req.db.entities_references.findMany({
                where: {
                    individual_id: parseInt(entity_id),
                },
            });
        } else if (type === "groups") {
            entitiesReferences = await req.db.entities_references.findMany({
                where: {
                    group_id: parseInt(entity_id),
                },
            });
        } else if (type === "organizations") {
            entitiesReferences = await req.db.entities_references.findMany({
                where: {
                    organization_id: parseInt(entity_id),
                },
            });
        }

        res.send(entitiesReferences);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
