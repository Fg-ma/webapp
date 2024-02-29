import express, { Request, Response } from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";

// Route to get all individuals
router.get("/", async (req: Request, res: Response) => {
  try {
    const individuals = await req.db.individuals.findMany();
    res.send(individuals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get an individual by ID
router.get(
  "/:individual_id",
  verifyToken,
  async (req: Request, res: Response) => {
    const individual_id = req.params.individual_id;

    try {
      const individual = await req.db.individuals.findUnique({
        where: {
          individual_id:
            individual_id === "user" ? req.user?.user_id : individual_id,
        },
      });

      if (!individual) {
        res.status(404).send("Individual not found");
        return;
      }

      res.send(individual);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
