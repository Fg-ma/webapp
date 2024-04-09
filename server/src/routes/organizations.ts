import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import { Organization } from "@FgTypes/types";

// Route to get all organizations
router.get("/", async (req, res) => {
  try {
    const organizations: Organization[] = await req.db.organizations.findMany();

    const returningOrganizations = organizations.map((organization) => ({
      organization_handle: organization.organization_handle,
      organization_name: organization.organization_name,
      organization_current_issue: organization.organization_current_issue,
      organization_stances: organization.organization_stances,
      organization_description: organization.organization_description,
      profile_picture_id: organization.profile_picture_id,
    }));

    res.send(returningOrganizations);
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

    const returningOrganization = {
      organization_handle: organization.organization_handle,
      organization_name: organization.organization_name,
      organization_current_issue: organization.organization_current_issue,
      organization_stances: organization.organization_stances,
      organization_description: organization.organization_description,
      profile_picture_id: organization.profile_picture_id,
    };

    res.send(returningOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
