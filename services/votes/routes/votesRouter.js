import { Router } from "express";
import { getVotes,updateVotes } from "../controllers/voteController.js";

const votesRouter = Router()

votesRouter.get('/',getVotes)
votesRouter.patch('/',updateVotes)


export default votesRouter