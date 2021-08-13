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

// GET items/:id

// POST items

// PUT items/:id

// DELETE items/:id