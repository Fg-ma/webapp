import express from "express";
const router = express.Router();

// Get collection names and ids from entity id
router.get("/collections_names", async (req, res) => {
  const entity_username = req.query.entity_username;

  try {
    const entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const collections = await req.db.collections.findMany({
      where: {
        entity_id: entity.entity_id,
      },
      distinct: ["collection_id"],
    });

    res.send(collections);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get collection from collection_id
router.get("/:collection_id", async (req, res) => {
  const collection_id = req.params.collection_id;

  try {
    const collections = await req.db.collections_content.findMany({
      where: {
        collection_id: collection_id,
      },
      include: {
        content: true,
      },
    });

    const collectionsData = [];

    for (const collection of collections) {
      if (collection.content.content_type === 1) {
        const content_data = await req.db.sheets.findUnique({
          where: {
            sheet_id: collection.content_id,
          },
        });

        collectionsData.push({
          ...collection,
          content_data: { ...content_data },
        });
      } else if (collection.content.content_type === 2) {
        const content_data = await req.db.images.findUnique({
          where: {
            image_id: collection.content_id,
          },
        });

        collectionsData.push({
          ...collection,
          content_data: { ...content_data },
        });
      } else if (collection.content.content_type === 3) {
        const content_data = await req.db.videos.findUnique({
          where: {
            video_id: collection.content_id,
          },
        });

        collectionsData.push({
          ...collection,
          content_data: { ...content_data },
        });
      }
    }

    res.send(collectionsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Set a collection's sheet as pinned or not pinned
router.put("/collections_content_pinned", async (req, res) => {
  const { relation_id, pinned, date_pinned } = req.body;

  try {
    const result = await req.db.collections_content.update({
      where: {
        collections_content_id: relation_id,
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

// Get a sheet by collections_content_id
router.get(
  "/collection_sheet_by_collections_content_id/:collections_content_id",
  async (req, res) => {
    const collections_content_id = req.params.collections_content_id;

    try {
      const collectionContent = await req.db.collections_content.findUnique({
        where: {
          collections_content_id: collections_content_id,
        },
        include: {
          content: true,
        },
      });

      const sheetContent = await req.db.sheets.findUnique({
        where: {
          sheet_id: collectionContent.content_id,
        },
      });

      const collectionSheetData = {
        ...collectionContent,
        content_data: { ...sheetContent },
      };

      res.send(collectionSheetData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get a video by collections_content_id
router.get(
  "/collection_video_by_collections_content_id/:collections_content_id",
  async (req, res) => {
    const collections_content_id = req.params.collections_content_id;

    try {
      const collectionContent = await req.db.collections_content.findUnique({
        where: {
          collections_content_id: collections_content_id,
        },
        include: {
          content: true,
        },
      });

      const videoContent = await req.db.videos.findUnique({
        where: {
          video_id: collectionContent.content_id,
        },
      });

      const collectionVideoData = {
        ...collectionContent,
        content_data: { ...videoContent },
      };

      res.send(collectionVideoData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get a image by collections_content_id
router.get(
  "/collection_image_by_collections_content_id/:collections_content_id",
  async (req, res) => {
    const collections_content_id = req.params.collections_content_id;

    try {
      const collectionContent = await req.db.collections_content.findUnique({
        where: {
          collections_content_id: collections_content_id,
        },
        include: {
          content: true,
        },
      });

      const imageContent = await req.db.images.findUnique({
        where: {
          image_id: collectionContent.content_id,
        },
      });

      const collectionImageData = {
        ...collectionContent,
        content_data: { ...imageContent },
      };

      res.send(collectionImageData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
