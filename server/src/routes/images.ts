import express from "express";
const router = express.Router();
import type {
  FullImage,
  Group,
  Image,
  Individual,
  Organization,
  ProfilePicture,
} from "@FgTypes/types";

// Route to get profile picture of an entity
router.get("/get_user_profile_picture", async (req, res) => {
  const entity_username = req.query.entity_username;
  const entity_type = parseInt(req.query.entity_type as string, 10);

  try {
    let profilePictureId: Individual | Group | Organization;

    if (entity_type === 1) {
      profilePictureId = await req.db.individuals.findUnique({
        where: {
          individual_username: entity_username,
        },
      });
    } else if (entity_type === 2) {
      profilePictureId = await req.db.groups.findUnique({
        where: {
          group_handle: entity_username,
        },
      });
    } else if (entity_type === 3) {
      profilePictureId = await req.db.organizations.findUnique({
        where: {
          organization_handle: entity_username,
        },
      });
    } else {
      res.send("Default");
      return;
    }

    const profilePicture: ProfilePicture =
      await req.db.profile_pictures.findUnique({
        where: {
          profile_picture_id: profilePictureId.profile_picture_id,
        },
      });

    if (!profilePicture) {
      res.send("Default");
      return;
    }

    res.send(profilePicture);
  } catch (error) {
    res.send("default");
  }
});

// Route to get an image by ID
router.get("/:image_id", async (req, res) => {
  const image_id = req.params.image_id;

  try {
    const image: Image = await req.db.images.findUnique({
      where: {
        image_id: image_id,
      },
    });

    if (!image) {
      res.status(404).send("Image not found");
      return;
    }

    res.send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Gets all the data needed to display an image's contents
router.get("/get_full_image/:image_id", async (req, res) => {
  const image_id = req.params.image_id;

  try {
    const fullImage: FullImage = await req.db.images.findUnique({
      where: {
        image_id: image_id,
      },
      include: {
        images_data: true,
        entities: true,
      },
    });

    if (!fullImage) {
      res.status(404).send("Image not found");
      return;
    }

    const returningFullImage = {
      image_id: fullImage.image_id,
      image_title: fullImage.image_title,
      image_description: fullImage.image_description,
      image_filename: fullImage.image_filename,
      image_data_id: fullImage.image_data_id,
      image_likes: fullImage.image_likes,
      image_dislikes: fullImage.image_dislikes,
      image_views: fullImage.image_views,
      image_date_posted: fullImage.image_date_posted,
      images_data: {
        image_data_id: fullImage.images_data.image_data_id,
        image_data: fullImage.images_data.image_data,
      },
      entities: {
        entity_username: fullImage.entities.entity_username,
        entity_type: fullImage.entities.entity_type,
      },
    };

    res.send(returningFullImage);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
