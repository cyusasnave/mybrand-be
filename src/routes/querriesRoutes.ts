import express from "express";
import querriesController from "../controllers/querriesController";
import validation from "../middlewares/validation";
import authentication from "../middlewares/authentication";

const querryRouter = express.Router();

querryRouter.post(
  "/",
  validation.isValidQuerry,
  querriesController.addQuerries
);

querryRouter.get(
  "/",
  authentication.isAdmin,
  querriesController.getAllQuerries
);

querryRouter.get(
  "/:id",
  authentication.isAdmin,
  querriesController.getQuerryById
);

querryRouter.patch(
  "/:id",
  authentication.isAdmin,
  validation.isValidQuerry,
  querriesController.updateQuerry
);

querryRouter.delete(
  "/:id",
  authentication.isAdmin,
  querriesController.deleteQuerry
);

export default querryRouter;
