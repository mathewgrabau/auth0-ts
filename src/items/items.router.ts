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

itemsRouter.post("/", async (request: Request, response: Response) => {
    try {
        // Get the payload
        const item : BaseItem = request.body;
        const newItem = await ItemService.create(item);
        response.status(201).json(newItem);
    } catch (e) {
        response.status(500).send(e.message);
    }
});

// PUT items/:id

itemsRouter.put("/:id", async(request: Request, response : Response) => {
    // Parse the request item
    const id: number = parseInt(request.params.id, 10);

    try {
        // Get the payload
        const itemUpdate : Item = request.body;
        const existingItem : Item = await ItemService.find(id);
        if (existingItem) {
            const updatedItem = await ItemService.update(id, itemUpdate);
            return response.status(200).json(updatedItem);
        }

        // If it is not found, then create it.
        const createdItem = await ItemService.create(itemUpdate);
        response.status(201).json(createdItem);
    } catch (e) {
        response.status(500).send(e.message);
    }
});

// DELETE items/:id