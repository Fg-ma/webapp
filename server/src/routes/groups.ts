import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import { Group } from "@FgTypes/types";

// Route to get all groups
router.get("/", async (req, res) => {
  try {
    const groups: Group[] = await req.db.groups.findMany();

    const returningGroups = groups.map((group) => ({
      group_handle: group.group_handle,
      group_name: group.group_name,
      group_current_issue: group.group_current_issue,
      group_stances: group.group_stances,
      group_description: group.group_description,
      profile_picture_id: group.profile_picture_id,
    }));

    res.send(returningGroups);
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

    const returningGroup = {
      group_handle: group.group_handle,
      group_name: group.group_name,
      group_current_issue: group.group_current_issue,
      group_stances: group.group_stances,
      group_description: group.group_description,
      profile_picture_id: group.profile_picture_id,
    };

    res.send(returningGroup);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
