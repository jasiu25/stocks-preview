import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import request from "supertest"
import app from '../src/app.js';
import { prisma } from '../src/prisma.js';

describe("Items endpoint", () => {
    let itemId: number;
    let createdItemId: number;
    let categoryId: number;
    const quantity = 3;
    const suffix = Date.now().toString();
    const itemName = `test-item-${suffix}`;
    const categoryName = `test-category-${suffix}`;

    beforeAll(async () => {
        const category = await prisma.categories.create({
            data: { name: categoryName }
        });
        categoryId = category.id;

        const item = await prisma.stockAccount.create({
            data: {
                name: itemName,
                quantity,
                categoryId,
            },
        });
        itemId = item.id;
    });

    afterAll(async () => {
        try {
            if (itemId) {
                await prisma.stockAccount.deleteMany({ where: { id: itemId } });
            }

            if (createdItemId) {
                await prisma.stockAccount.deleteMany({ where: { id: createdItemId } });
            }
            
            if (categoryId) {
                await prisma.categories.deleteMany({ where: { id: categoryId } });
            }
        } catch (error) {
            return error;
        } finally {
            await prisma.$disconnect();
        }
    });

    it("Returns item and it's category", async () => {
        const response = await request(app).get(`/api/v1/items/${itemId}`).expect(200);

        expect(response.body).toMatchObject({
            id: itemId,
            name: itemName,
            quantity,
            categoryId,
            category: {
                id: categoryId,
                name: categoryName,
            }
        })
    });

    it("Inserts given item", async () => {
        const item = {
            name: itemName,
            quantity,
            categoryId
        }

        const response = await request(app).post('/api/v1/items/').send(item).expect(201);
        createdItemId = response.body.id
    })
})