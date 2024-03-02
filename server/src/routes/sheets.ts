import express from "express";
const router = express.Router();
import { v4 as uuid } from "uuid";
import verifyToken from "./verifyJWT";
import type { FullSheet } from "@FgTypes/types";

// Route to get all sheets
router.get("/", async (req, res) => {
  try {
    const sheets = await req.db.sheets.findMany();
    res.send(sheets);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a sheet thumbnail by sheet_id
router.get("/get_sheet_thumbnail", async (req, res) => {
  const sheet_id = req.query.sheet_id;

  try {
    const sheet = await req.db.sheets.findUnique({
      where: { sheet_id: sheet_id },
    });

    const sheetThumbnail = await req.db.sheets_thumbnails.findUnique({
      where: {
        sheet_thumbnail_id: sheet.sheet_thumbnail_id,
      },
    });

    res.send(sheetThumbnail);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a sheet by ID
router.get("/:sheet_id", async (req, res) => {
  const sheet_id = req.params.sheet_id;

  try {
    const sheet = await req.db.sheets.findUnique({
      where: {
        sheet_id: sheet_id,
      },
    });

    res.send(sheet);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get full sheet information
router.get("/get_full_sheet/:sheet_id", async (req, res) => {
  const sheet_id = req.params.sheet_id;

  try {
    const fullSheet = await req.db.sheets.findUnique({
      where: {
        sheet_id: sheet_id,
      },
      include: {
        sheets_data: true,
        entities: true,
      },
    });

    const getSheetAuthor = async (fullSheet: FullSheet) => {
      if (fullSheet.entities.entity_type === 1) {
        return await req.db.individuals.findUnique({
          where: {
            individual_id: fullSheet.entities.entity_id,
          },
        });
      } else if (fullSheet.entities.entity_type === 2) {
        return await req.db.groups.findUnique({
          where: {
            group_id: fullSheet.entities.entity_id,
          },
        });
      } else if (fullSheet.entities.entity_type === 3) {
        return await req.db.organizations.findUnique({
          where: {
            organization_id: fullSheet.entities.entity_id,
          },
        });
      }
    };

    const sheetAuthor = await getSheetAuthor(fullSheet);

    if (!fullSheet) {
      res.status(404).send("Sheet not found");
      return;
    } else if (!sheetAuthor) {
      res.status(404).send("Author not found");
      return;
    }

    res.send({ fullSheet, sheetAuthor });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Handles an entity liking a piece of content
router.post("/like/:sheet_id", verifyToken, async (req, res) => {
  const sheet_id = req.params.sheet_id;

  try {
    const existingLikeRelationship = await req.db.entities_likes.findFirst({
      where: {
        entity_id: req.user?.user_id,
        content_id: sheet_id,
      },
    });

    const existingDislikeRelationship =
      await req.db.entities_dislikes.findFirst({
        where: {
          entity_id: req.user?.user_id,
          content_id: sheet_id,
        },
      });

    if (!existingLikeRelationship && !existingDislikeRelationship) {
      await req.db.entities_likes.create({
        data: {
          like_id: uuid(),
          entity_id: req.user?.user_id,
          content_id: sheet_id,
        },
      });
    } else if (!existingLikeRelationship && existingDislikeRelationship) {
      await req.db.entities_likes.create({
        data: {
          like_id: uuid(),
          entity_id: req.user?.user_id,
          content_id: sheet_id,
        },
      });
      await req.db.entities_dislikes.delete({
        where: {
          dislike_id: existingDislikeRelationship.dislike_id,
        },
      });
    } else if (existingLikeRelationship) {
      await req.db.entities_likes.delete({
        where: {
          like_id: existingLikeRelationship.like_id,
        },
      });
    }

    const getSheetLikes = await req.db.sheets.findUnique({
      where: {
        sheet_id: sheet_id,
      },
    });

    res.status(200).send({
      sheet_dislikes: getSheetLikes.sheet_dislikes,
      sheet_likes: getSheetLikes.sheet_likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Handles an entity disliking a piece of content
router.post("/dislike/:sheet_id", verifyToken, async (req, res) => {
  const sheet_id = req.params.sheet_id;

  try {
    const existingLikeRelationship = await req.db.entities_likes.findFirst({
      where: {
        entity_id: req.user?.user_id,
        content_id: sheet_id,
      },
    });

    const existingDislikeRelationship =
      await req.db.entities_dislikes.findFirst({
        where: {
          entity_id: req.user?.user_id,
          content_id: sheet_id,
        },
      });

    if (!existingDislikeRelationship && !existingLikeRelationship) {
      await req.db.entities_dislikes.create({
        data: {
          dislike_id: uuid(),
          entity_id: req.user?.user_id,
          content_id: sheet_id,
        },
      });
    } else if (!existingDislikeRelationship && existingLikeRelationship) {
      await req.db.entities_dislikes.create({
        data: {
          dislike_id: uuid(),
          entity_id: req.user?.user_id,
          content_id: sheet_id,
        },
      });
      await req.db.entities_likes.delete({
        where: {
          like_id: existingLikeRelationship.like_id,
        },
      });
    } else if (existingDislikeRelationship) {
      await req.db.entities_dislikes.delete({
        where: {
          dislike_id: existingDislikeRelationship.dislike_id,
        },
      });
    }

    const getSheetDislikes = await req.db.sheets.findUnique({
      where: {
        sheet_id: sheet_id,
      },
    });

    res.status(200).send({
      sheet_dislikes: getSheetDislikes.sheet_dislikes,
      sheet_likes: getSheetDislikes.sheet_likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Gets whether or not a certain entity likes a certian piece of content
router.get("/does_like_or_dislike/:sheet_id", verifyToken, async (req, res) => {
  const sheet_id = req.params.sheet_id;

  try {
    const like = await req.db.entities_likes.findFirst({
      where: {
        entity_id: req.user?.user_id,
        content_id: sheet_id,
      },
    });

    if (like) {
      res.send({ like: true, dislike: false });
    } else {
      const dislike = await req.db.entities_dislikes.findFirst({
        where: {
          entity_id: req.user?.user_id,
          content_id: sheet_id,
        },
      });

      if (dislike) {
        res.send({ like: false, dislike: true });
      } else {
        res.send({ like: false, dislike: false });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
