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

itemsRouter.get("/", async (request: Request, response: Response) => {
    try {
        const items: Item[] = await ItemService.findAll();
        response.status(200).send(items);
    } catch (e) {
        response.status(500).send(e.message);
    }
});

// GET items/:id

itemsRouter.get("/:id", async (request: Request, response: Response) => {
    // Parse the request item
    const id: number = parseInt(request.params.id, 10);

    try {
        const item : Item = await ItemService.find(id);
        if (item) {
            return response.status(200).send(item);
        }

        response.status(404).send("Item not found");
    } catch (e) {
        response.status(500).send(e.message);
    }
});

// POST items

// PUT items/:id

// DELETE items/:id