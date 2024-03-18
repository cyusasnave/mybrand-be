import express from 'express';
import querriesController from '../controllers/querriesController';
import validation from '../middlewares/validation';
import authentication from '../middlewares/authentication';

const querryRouter = express.Router();

querryRouter.post("/",validation.isValidQuerry ,querriesController.addQuerries)
querryRouter.get("/",authentication.authLogIn, querriesController.getAllQuerries)
querryRouter.get("/:id",authentication.authLogIn, querriesController.getQuerryById)
querryRouter.patch("/:id",authentication.authLogIn,validation.isValidQuerry ,querriesController.updateQuerry)
querryRouter.delete("/:id",authentication.authLogIn, querriesController.deleteQuerry)

export default querryRouter