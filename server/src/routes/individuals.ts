import express, { Request, Response } from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import { Individual } from "@FgTypes/types";

// Route to get all individuals
router.get("/", async (req: Request, res: Response) => {
  try {
    const individuals: Individual[] = await req.db.individuals.findMany();

    const returningIndividuals = individuals.map((individual) => ({
      individual_username: individual.individual_username,
      individual_name: individual.individual_name,
      individual_current_issue: individual.individual_current_issue,
      individual_roles: individual.individual_roles,
      individual_description: individual.individual_description,
      profile_picture_id: individual.profile_picture_id,
    }));

    res.send(returningIndividuals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get an individual by username
router.get(
  "/:individual_username",
  verifyToken,
  async (req: Request, res: Response) => {
    const individual_username = req.params.individual_username;

    try {
      const individual: Individual = await req.db.individuals.findUnique({
        where: {
          individual_username: individual_username,
        },
      });

      if (!individual) {
        res.status(404).send("Individual not found");
        return;
      }

      const { individual_id, ...returningIndividual } = individual;

      res.send(returningIndividual);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
