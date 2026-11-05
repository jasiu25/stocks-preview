import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import request from "supertest"
import app from '../src/app.js';
import { prisma } from '../src/prisma.js';

describe('Categories endpoint', () => {
    let categoryId: number;
    it('returns categories', async () => {
        await request(app).get('/api/v1/categories').expect(200);
    });

    it('inserts category', async () => {
        const category = {
            name: 'test',
        };

        const response = await request(app).post('/api/v1/categories').send(category).expect(201)
        categoryId = response.body.id;
    })

    afterAll(async () => {
        await prisma.categories.deleteMany({
            where: { id: categoryId }
        })
        await prisma.$disconnect()
    })
})