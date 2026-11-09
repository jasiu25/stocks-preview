import { afterAll, describe, expect, it } from '@jest/globals';
import request from "supertest"
import app from '../src/app.js';
import { prisma } from '../src/prisma.js';

describe('Categories endpoint', () => {
    let categoryId: number;
    const suffix = Date.now().toString();
    const categoryName = `test-category-${suffix}`;
    const newCategoryName = `new-test-category-${suffix}`;

    it('inserts category', async () => {
        const category = {
            name: categoryName,
        };

        const response = await request(app).post('/api/v1/categories').send(category).expect(201)
        categoryId = response.body.id;
    })

    it('returns category', async () => {
        const response = await request(app).get(`/api/v1/categories/${categoryId}`);

        expect(response.body).toMatchObject({
            id: categoryId,
            name: categoryName
        });
    })

    it('changes category name', async () => {
        const category = {
            id: categoryId,
            name: newCategoryName
        }

        await request(app).patch(`/api/v1/categories/`).send(category).expect(204);
        const response = await request(app).get(`/api/v1/categories/${categoryId}`);

        expect(response.body).toMatchObject({
            id: categoryId,
            name: newCategoryName
        });
    })

    it('deletes category', async () => {
        await request(app).delete(`/api/v1/categories/${categoryId}`).expect(204);
        await request(app).get(`/api/v1/categories/${categoryId}`).expect(404);
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })
})