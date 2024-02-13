const express = require("express");
const router = express.Router();

// Route to get an image by ID
router.get("/:image_id", async (req, res) => {
  const image_id = req.params.image_id;

  try {
    const image = await req.db.images.findUnique({
      where: {
        image_id: parseInt(image_id),
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
  const image_id = parseInt(req.params.image_id);

  try {
    const fullImage = await req.db.images.findUnique({
      where: {
        image_id: image_id,
      },
      include: {
        images_data: true,
        entities: {
          include: {
            individuals: true,
            groups: true,
            organizations: true,
          },
        },
      },
    });

    if (!fullImage) {
      res.status(404).send("Image not found");
      return;
    }

    res.send(fullImage);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
