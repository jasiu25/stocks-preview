import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import request from "supertest"
import app from '../src/app.js';
import { prisma } from '../src/prisma.js';

describe("Items endpoint", () => {
    const suffix = Date.now().toString();
    const categoryName = `test-category-${suffix}`;

    const item = {
        id: 1,
        name: `test-item-${suffix}`,
        quantity: 3,
        categoryId: 1
    }

    beforeAll(async () => {
        try {
            const category = await prisma.categories.create({
                data: { name: categoryName }
            });
            item.categoryId = category.id;
        } catch (error) {
            return error;
        }
    });

    afterAll(async () => {
        try {
            if (item.categoryId) {
                await prisma.categories.deleteMany({ where: { id: item.categoryId } });
            }
        } catch (error) {
            return error;
        } finally {
            await prisma.$disconnect();
        }
    });

    it("Inserts given item", async () => {
        const response = await request(app).post('/api/v1/items/').send(item).expect(201);
        item.id = response.body.id;
    });

    it("Returns item and it's category", async () => {
        const response = await request(app).get(`/api/v1/items/${item.id}`).expect(200);

        expect(response.body).toMatchObject({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            categoryId: item.categoryId,
            category: {
                id: item.categoryId,
                name: categoryName,
            }
        });
    });

    it('changes items name and quantity', async () => {
        const newItem = structuredClone(item);
        newItem.name = `new-test-item-${suffix}`;
        newItem.quantity = 1;
        
        await request(app).patch(`/api/v1/items/`).send(newItem).expect(204);
        const response = await request(app).get(`/api/v1/items/${item.id}`);

        expect(response.body).toMatchObject({
            id: item.id,
            name: newItem.name,
            quantity: newItem.quantity
        });
    })

    it("Deletes item", async () => {
        await request(app).delete(`/api/v1/items/${item.id}`).expect(204);
        await request(app).get(`/api/v1/items/${item.id}`).expect(404);
    })
})