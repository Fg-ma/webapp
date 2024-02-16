const express = require("express");
const router = express.Router();

// Route to get an image by ID
router.get("/:image_id", async (req, res) => {
  const image_id = req.params.image_id;

  try {
    const image = await req.db.images.findUnique({
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
    const fullImage = await req.db.images.findUnique({
      where: {
        image_id: image_id,
      },
      include: {
        images_data: true,
        entities: true,
      },
    });

    const getImageCreator = async (fullImage) => {
      if (fullImage.entities.entity_type === 1) {
        return await req.db.individuals.findUnique({
          where: {
            individual_id: fullImage.entities.entity_id,
          },
        });
      } else if (fullImage.entities.entity_type === 2) {
        return await req.db.groups.findUnique({
          where: {
            group_id: fullImage.entities.entity_id,
          },
        });
      } else if (fullImage.entities.entity_type === 3) {
        return await req.db.organizations.findUnique({
          where: {
            organization_id: fullImage.entities.entity_id,
          },
        });
      }
    };

    const imageCreator = await getImageCreator(fullImage);

    if (!fullImage) {
      res.status(404).send("Image not found");
      return;
    } else if (!imageCreator) {
      res.status(404).send("Creator not found");
      return;
    }

    res.send({ fullImage, imageCreator });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
