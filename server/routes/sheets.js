const express = require("express");
const router = express.Router();

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

    const getSheetAuthor = async (fullSheet) => {
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

module.exports = router;
