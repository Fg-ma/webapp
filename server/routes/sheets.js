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
    const sheet_id = parseInt(req.params.sheet_id);

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
    const sheet_id = parseInt(req.params.sheet_id);

    try {
        const fullSheet = await req.db.sheets.findUnique({
            where: {
                sheet_id: sheet_id,
            },
            include: {
                individuals: true,
                sheets_data: true,
            },
        });

        res.send(fullSheet);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
