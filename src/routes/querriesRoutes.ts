import express from 'express';
import querriesController from '../controllers/querriesController';
import validation from '../middlewares/validation';

const querryRouter = express.Router();

querryRouter.post("/",validation.isValidQuerry ,querriesController.addQuerries)
querryRouter.get("/", querriesController.getAllQuerries)
querryRouter.get("/:id", querriesController.getQuerryById)
querryRouter.patch("/:id",validation.isValidQuerry ,querriesController.updateQuerry)
querryRouter.delete("/:id", querriesController.deleteQuerry)

export default querryRouter