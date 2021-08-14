/**
 * Required external modules and interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface"

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET item

itemsRouter.get("/", async (request: Request, response : Response) =>{
    try {
        const items: Item[] = await ItemService.findAll();
        response.status(200).send(items);
    } catch (e) {
        response.status(500).send(e.message);
    }
});

// GET items/:id



// POST items

// PUT items/:id

// DELETE items/:id