import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

import { Router } from "express";
import { getVotes,updateVotes } from "../controllers/voteController.js";

const swaggerOptions = {  
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {  
            title:'Votes API',  
            version:'1.0.0',
            description: "An API to interact with the Votes databse"
        }  
    },
    apis:['./routes/votesRouter.js','./model/votes.js'],  
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const votesRouter = Router()

//setup swagger ui
votesRouter.use('/api-docs', swaggerUI.serve)
votesRouter.get('/api-docs', swaggerUI.setup(swaggerDocs)); 

/**
 * @openapi
 * tags:
 *   name: Votes
 *   description: The votes managing API
 * /votes:
 *   get:
 *     summary: Retrieve a vote object by id
 *     tags: [Votes]
 *     parameters:
 *          - in: path
 *            name: poll
 *            type: string
 *            required: true
 *            description: The poll id
 *     responses:
 *       200:
 *         description: The retrieved votes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Votes'
 *       500:
 *         description: Some server error
 * 
 */
votesRouter.get('/',getVotes)

/**
 * @openapi
 * tags:
 *   name: Votes
 *   description: The votes managing API
 * /votes/{id}:
 *   patch:
 *     summary: Update a vote
 *     tags: [Votes]
 *     parameters:
 *          - in: path
 *            name: poll
 *            type: string
 *            required: true
 *            description: Id of the poll to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Votes'
 *     responses:
 *       200:
 *         description: The updated vote.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Votes'
 *       500:
 *         description: Some server error
 * 
 */
votesRouter.patch('/:poll',updateVotes)


export default votesRouter