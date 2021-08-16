/**
 * Required external modules and interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

// Verification support
import { checkJwt } from "../middleware/authz.middleware";
import { checkPermissions } from "../middleware/permissions.middleware";
import { ItemPermission } from "./item-permission";

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

// At this point, we enable authorization middleware
// Otherwise, you need to include at the endpoint level.
// Then, in the pipeline, adding the checkPermissions middleware
// protects from authenticated requests that lack required access
// level
itemsRouter.use(checkJwt);

// POST items

itemsRouter.post(
    "/",
    checkPermissions(ItemPermission.CreateItems),
    async (request: Request, response: Response) => {
        console.log(request);
        try {
            // Get the payload
            const item: BaseItem = request.body;
            const newItem = await ItemService.create(item);
            response.status(201).json(newItem);
        } catch (e) {
            response.status(500).send(e.message);
        }
    });

// PUT items/:id

itemsRouter.put(
    "/:id",
    checkPermissions(ItemPermission.UpdateItems),
    async (request: Request, response: Response) => {
        console.log("Executing the request in PUT items/:id");
        console.log(request);

        // Parse the request item
        const id: number = parseInt(request.params.id, 10);

        try {
            // Get the payload
            const itemUpdate: Item = request.body;
            const existingItem: Item = await ItemService.find(id);
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

itemsRouter.delete("/:id", async (request: Request, response: Response) => {
    // Parse the request item

    console.log("Executing the request in PUT items/:id");
    console.log(request);
    const id: number = parseInt(request.params.id, 10);

    try {
        await ItemService.remove(id);
        response.sendStatus(204);
    } catch (e) {
        response.status(500).send(e.message);
    }
});
