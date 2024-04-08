import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import { Group } from "@FgTypes/types";

// Route to get all groups
router.get("/", async (req, res) => {
  try {
    const groups = await req.db.groups.findMany();
    res.send(groups);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a group by handle
router.get("/:group_handle", verifyToken, async (req, res) => {
  const group_handle = req.params.group_handle;

  try {
    const group: Group = await req.db.groups.findUnique({
      where: {
        group_handle: group_handle,
      },
    });

    if (!group) {
      res.status(404).send("Group not found");
      return;
    }

    const { group_id, ...returningGroup } = group;

    res.send(returningGroup);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
