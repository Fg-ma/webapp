import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";

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

// Route to get an organization by ID
router.get("/:organization_id", verifyToken, async (req, res) => {
  const organization_id = req.params.organization_id;

  try {
    const organization = await req.db.organizations.findUnique({
      where: {
        organization_id:
          organization_id === "user" ? req.user?.user_id : organization_id,
      },
    });

    if (!organization) {
      res.status(404).send("Organization not found");
      return;
    }

    res.send(organization);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
