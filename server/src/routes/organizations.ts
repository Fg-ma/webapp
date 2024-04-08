import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import { Organization } from "@FgTypes/types";

// Route to get all organizations
router.get("/", async (req, res) => {
  try {
    const organizations = await req.db.organizations.findMany();
    res.send(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get an organization by handle
router.get("/:organization_handle", verifyToken, async (req, res) => {
  const organization_handle = req.params.organization_handle;

  try {
    const organization: Organization = await req.db.organizations.findUnique({
      where: {
        organization_handle: organization_handle,
      },
    });

    if (!organization) {
      res.status(404).send("Organization not found");
      return;
    }

    const { organization_id, ...returningOrganization } = organization;

    res.send(returningOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
