import {
  Collection,
  CollectionsContent,
  Entity,
  Image,
  Sheet,
  Video,
} from "@FgTypes/types";
import express from "express";
const router = express.Router();

// Get collection names and ids from entity username
router.get("/collections_names", async (req, res) => {
  const entity_username = req.query.entity_username;

  try {
    if (!entity_username) return;

    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const collections: Collection[] = await req.db.collections.findMany({
      where: {
        entity_id: entity.entity_id,
      },
      distinct: ["collection_id"],
    });

    const returningCollection = collections.map((collection) => ({
      collection_id: collection.collection_id,
      collection_name: collection.collection_name,
    }));

    res.send(returningCollection);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get collection from collection_id
router.get("/:collection_id", async (req, res) => {
  const collection_id = req.params.collection_id;

  try {
    const collections: CollectionsContent[] =
      await req.db.collections_content.findMany({
        where: {
          collection_id: collection_id,
        },
        include: {
          content: true,
        },
      });

    const collectionsData = [];

    for (const collection of collections) {
      if (collection.content?.content_type === 1) {
        const contentData: Sheet = await req.db.sheets.findUnique({
          where: {
            sheet_id: collection.content_id,
          },
        });

        const author: Entity = await req.db.entities.findUnique({
          where: {
            entity_id: contentData.sheet_author_id,
          },
        });

        const { sheet_author_id, ...returningContentData } = contentData;

        collectionsData.push({
          ...collection,
          content_data: {
            ...returningContentData,
            sheet_author_username: author.entity_username,
          },
        });
      } else if (collection.content?.content_type === 2) {
        const contentData: Image = await req.db.images.findUnique({
          where: {
            image_id: collection.content_id,
          },
        });

        const author: Entity = await req.db.entities.findUnique({
          where: {
            entity_id: contentData.image_creator_id,
          },
        });

        const { image_creator_id, ...returningContentData } = contentData;

        collectionsData.push({
          ...collection,
          content_data: {
            ...returningContentData,
            image_creator_username: author.entity_username,
          },
        });
      } else if (collection.content?.content_type === 3) {
        const contentData: Video = await req.db.videos.findUnique({
          where: {
            video_id: collection.content_id,
          },
        });

        const author: Entity = await req.db.entities.findUnique({
          where: {
            entity_id: contentData.video_creator_id,
          },
        });

        const { video_creator_id, ...returningContentData } = contentData;

        collectionsData.push({
          ...collection,
          content_data: {
            ...returningContentData,
            video_creator_username: author.entity_username,
          },
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
    const result: CollectionsContent = await req.db.collections_content.update({
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

// Get a sheet by collections_content_id
router.get(
  "/collection_sheet_by_collections_content_id/:collections_content_id",
  async (req, res) => {
    const collections_content_id = req.params.collections_content_id;

    try {
      const collectionContent: CollectionsContent =
        await req.db.collections_content.findUnique({
          where: {
            collections_content_id: collections_content_id,
          },
          include: {
            content: true,
          },
        });

      const sheetContent: Sheet = await req.db.sheets.findUnique({
        where: {
          sheet_id: collectionContent.content_id,
        },
      });

      const author: Entity = await req.db.entities.findUnique({
        where: {
          entity_id: sheetContent.sheet_author_id,
        },
      });

      const returningSheetContent = {
        sheet_id: sheetContent.sheet_id,
        sheet_title: sheetContent.sheet_title,
        sheet_subject: sheetContent.sheet_subject,
        sheet_filename: sheetContent.sheet_filename,
        sheet_data_id: sheetContent.sheet_data_id,
        sheet_likes: sheetContent.sheet_likes,
        sheet_dislikes: sheetContent.sheet_dislikes,
        sheet_views: sheetContent.sheet_views,
        sheet_date_posted: sheetContent.sheet_date_posted,
      };

      const collectionSheetData = {
        ...collectionContent,
        content_data: {
          ...returningSheetContent,
          sheet_author_username: author.entity_username,
        },
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
      const collectionContent: CollectionsContent =
        await req.db.collections_content.findUnique({
          where: {
            collections_content_id: collections_content_id,
          },
          include: {
            content: true,
          },
        });

      const videoContent: Video = await req.db.videos.findUnique({
        where: {
          video_id: collectionContent.content_id,
        },
      });

      const author: Entity = await req.db.entities.findUnique({
        where: {
          entity_id: videoContent.video_creator_id,
        },
      });

      const returningVideoContent = {
        video_id: videoContent.video_id,
        video_title: videoContent.video_title,
        video_description: videoContent.video_description,
        video_filename: videoContent.video_filename,
        video_data_id: videoContent.video_data_id,
        video_likes: videoContent.video_likes,
        video_dislikes: videoContent.video_dislikes,
        video_views: videoContent.video_views,
        video_date_posted: videoContent.video_date_posted,
      };

      const collectionVideoData = {
        ...collectionContent,
        content_data: {
          ...returningVideoContent,
          video_creator_username: author.entity_username,
        },
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
      const collectionContent: CollectionsContent =
        await req.db.collections_content.findUnique({
          where: {
            collections_content_id: collections_content_id,
          },
          include: {
            content: true,
          },
        });

      const imageContent: Image = await req.db.images.findUnique({
        where: {
          image_id: collectionContent.content_id,
        },
      });

      const author: Entity = await req.db.entities.findUnique({
        where: {
          entity_id: imageContent.image_creator_id,
        },
      });

      const returningImageContent = {
        image_id: imageContent.image_id,
        image_title: imageContent.image_title,
        image_description: imageContent.image_description,
        image_filename: imageContent.image_filename,
        image_data_id: imageContent.image_data_id,
        image_likes: imageContent.image_likes,
        image_dislikes: imageContent.image_dislikes,
        image_views: imageContent.image_views,
        image_date_posted: imageContent.image_date_posted,
      };

      const collectionImageData = {
        ...collectionContent,
        content_data: {
          ...returningImageContent,
          image_creator_username: author.entity_username,
        },
      };

      res.send(collectionImageData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
