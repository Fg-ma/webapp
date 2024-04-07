import express, { Request, Response } from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import { Individual } from "@FgTypes/types";

// Route to get all individuals
router.get("/", async (req: Request, res: Response) => {
  try {
    const individuals: Individual[] = await req.db.individuals.findMany();
    const filteredIndividuals: Omit<
      Individual,
      "individual_id" | "profile_picture_id"
    >[] = individuals.map(
      ({ individual_id, profile_picture_id, ...filteredIndividual }) =>
        filteredIndividual
    );
    res.send(filteredIndividuals);
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

      const { individual_id, ...safeIndividual } = individual;

      res.send(safeIndividual);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
