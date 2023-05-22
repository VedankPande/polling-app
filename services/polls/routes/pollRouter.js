import { Router } from "express";
import { getPolls,getPoll,createPoll,deletePoll,updatePoll} from "../controllers/pollController.js";


const pollsRouter = Router()

pollsRouter.get('/',getPolls)
pollsRouter.get('/:id',getPoll)
pollsRouter.post('/',createPoll)
pollsRouter.patch('/:id',updatePoll)
pollsRouter.delete('/:id',deletePoll)

// export
export default pollsRouter