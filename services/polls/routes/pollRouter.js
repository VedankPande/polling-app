import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

import { Router } from "express";
import { getPolls,getPoll,createPoll,deletePoll,updatePoll} from "../controllers/pollController.js";

const swaggerOptions = {  
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {  
            title:'Polls API',  
            version:'1.0.0',
            description: "An API to interact with the Polls database"
        }  
    },
    apis:['./routes/pollRouter.js','./model/polls.js'],  
  }

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const pollsRouter = Router()

pollsRouter.use('/api-docs',swaggerUI.serve);
pollsRouter.get('/api-docs', swaggerUI.setup(swaggerDocs)); 

/**
 * @openapi
 * tags:
 *   name: Polls
 *   description: The polls managing API
 * /polls:
 *   get:
 *     summary: Get all polls for a specific user
 *     tags: [Polls]
 *     parameters:
 *          - in: query
 *            name: user
 *            type: string
 *            required: true
 *            description: The user id
 *     responses:
 *       200:
 *         description: All polls that belong to specified user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 * 
 */
pollsRouter.get('/',getPolls)

/**
 * @openapi
 * tags:
 *   name: Polls
 *   description: The polls managing API
 * /polls/{id}:
 *   get:
 *     summary: Create a single poll by id
 *     tags: [Polls]
 *     parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: The poll id
 *     responses:
 *       200:
 *         description: The retrieved poll.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       404:
 *         description: Poll not found
 * 
 */
pollsRouter.get('/:id',getPoll)


/**
 * @openapi
 * tags:
 *   name: Polls
 *   description: The polls managing API
 * /polls:
 *   post:
 *     summary: Create a new poll
 *     tags: [Polls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poll'
 *     responses:
 *       200:
 *         description: The created poll.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 * 
 */
pollsRouter.post('/',createPoll)

/**
 * @openapi
 * tags:
 *   name: Polls
 *   description: The polls managing API
 * /polls/{id}:
 *   patch:
 *     summary: Update a poll
 *     tags: [Polls]
 *     parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: The poll id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poll'
 *     responses:
 *       200:
 *         description: The created poll.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 * 
 */
pollsRouter.patch('/:id',updatePoll)

/**
 * @openapi
 * tags:
 *   name: Polls
 *   description: The polls managing API
 * /polls/{id}:
 *   delete:
 *     summary: Delete a poll
 *     tags: [Polls]
 *     parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: The poll id
 *     responses:
 *       200:
 *         description: The created poll.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 * 
 */
pollsRouter.delete('/:id',deletePoll)

// export
export default pollsRouter