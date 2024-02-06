const express = require("express");
const router = express.Router();

// Get collection names and ids from entity id
router.get("/collections_names", async (req, res) => {
    const id = parseInt(req.query.id, 10);
    const type = req.query.type;

    try {
        let collections;

        if (type === "individuals") {
            collections = await req.db.collections.findMany({
                where: {
                    individual_id: id,
                },
                distinct: ["collection_id"],
            });
        } else if (type === "groups") {
            collections = await req.db.collections.findMany({
                where: {
                    group_id: id,
                },
                distinct: ["collection_id"],
            });
        } else if (type === "organizations") {
            collections = await req.db.collections.findMany({
                where: {
                    organization_id: id,
                },
                distinct: ["collection_id"],
            });
        }

        res.send(collections);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Get collection from collection_id
router.get("/:collection_id", async (req, res) => {
    const collection_id = parseInt(req.params.collection_id, 10);

    try {
        const collectionDetails = await req.db.$transaction([
            req.db.collections_sheets.findMany({
                where: {
                    collection_id: collection_id,
                },
                include: {
                    sheets: true,
                },
            }),
            req.db.collections_videos.findMany({
                where: {
                    collection_id: collection_id,
                },
                include: {
                    videos: true,
                },
            }),
            req.db.collections_images.findMany({
                where: {
                    collection_id: collection_id,
                },
                include: {
                    images: true,
                },
            }),
        ]);

        const result = collectionDetails
            .flatMap((item) =>
                item.map((relation) => {
                    return {
                        collection_id: relation.collection_id,
                        collections_sheets_id:
                            relation.collections_sheets_id || null,
                        collections_videos_id:
                            relation.collections_videos_id || null,
                        collections_images_id:
                            relation.collections_images_id || null,
                        collection_name: relation.collection_name,
                        date_added: relation.date_added,
                        pinned: relation.pinned,
                        date_pinned: relation.date_pinned,
                        ...relation.sheets,
                        ...relation.videos,
                        ...relation.images,
                    };
                })
            )
            .filter(Boolean);

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Set a collection's sheet as pinned or not pinned
router.put("/collections_sheets_pinned", async (req, res) => {
    const { relation_id, pinned, date_pinned } = req.body;

    try {
        const result = await req.db.collections_sheets.update({
            where: {
                collections_sheets_id: relation_id,
            },
            data: {
                pinned: pinned,
                date_pinned: date_pinned,
            },
        });

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Set a collection's video as pinned or not pinned
router.put("/collections_videos_pinned", async (req, res) => {
    const { relation_id, pinned, date_pinned } = req.body;

    try {
        const result = await req.db.collections_videos.update({
            where: {
                collections_videos_id: relation_id,
            },
            data: {
                pinned: pinned,
                date_pinned: date_pinned,
            },
        });

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Set a collection's image as pinned or not pinned
router.put("/collections_images_pinned", async (req, res) => {
    const { relation_id, pinned, date_pinned } = req.body;

    try {
        const result = await req.db.collections_images.update({
            where: {
                collections_images_id: relation_id,
            },
            data: {
                pinned: pinned,
                date_pinned: date_pinned,
            },
        });

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
