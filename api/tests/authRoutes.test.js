const request = require("supertest");
const app = require("../server");
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const seedDatabase = require("./seedData");
const User = require('../models/User.model');

let mongoServer;
process.env.NODE_ENV = 'test';

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {dbName: "testdb"});
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await seedDatabase();
});


describe('Auth Routes', () => {
    describe('GET /auth/login', () => {
        it('Returns data as expected', async () => {
            const res = await request(app).post('/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password'
                });
            expect(res.statusCode).toBe(200);
        })
        it('Fails wrong password', async () => {
            const res = await request(app).post('/auth/login')
                .set('x-test-unauthenticated', 'true').send({
                    username: 'testuser',
                    password: 'password2'
                });
            expect(res.statusCode).toBe(401);
            expect(res.body.error).toBe('Invalid username or password');
        })
        it('Succeeds user2', async () => {
            const res = await request(app).post('/auth/login')
                .set('x-test-unauthenticated', 'true').send({
                    username: 'testuser2@test.com',
                    password: 'password'
                });
            expect(res.statusCode).toBe(200);
        })
        it('Fails missing username', async () => {
            const res = await request(app).post('/auth/login')
                .set('x-test-unauthenticated', 'true').send({
                    password: 'password'
                });
            expect(res.statusCode).toBe(400);
            expect(Object.values(res.body.error.fieldErrors).flat()).toContain('Username is required');
        })
        it('Fails missing password', async () => {
            const res = await request(app).post('/auth/login')
                .set('x-test-unauthenticated', 'true').send({
                    username: 'testuser'
                });
            expect(res.statusCode).toBe(400);
            expect(Object.values(res.body.error.fieldErrors).flat()).toContain('Password is required');
        })
        it('Fails invalid username format', async () => {
            const res = await request(app).post('/auth/login')
                .set('x-test-unauthenticated', 'true').send({
                    username: 2,
                    password: 'password'
                });
            expect(res.statusCode).toBe(400);
            expect(Object.values(res.body.error.fieldErrors).flat()).toContain('Expected string, received number');
        })
    })

    describe('POST /auth/register', () => {
        it('Route is public and happy path', async () => {
            const newUserName = 'testuser4@testuser.com'
            const res = await request(app).post('/auth/register')
                .send({
                    username: newUserName,
                    password: 'password',
                    role:'admin',
                });
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('User created');
            const newUser = await User.findOne({username: newUserName});
            expect(newUser.role).toBe('admin');
            const users = await User.find({});
            expect(users.length).toBe(5);
        })
        it('Username already exists', async () => {
            const res = await request(app).post('/auth/register').send({
                username: 'testuser2@test.com',
                password: 'password',
                role:'admin',
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Username already exists');
        })
        it('Invalid email format', async () => {
            const res = await request(app).post('/auth/register').send({
                username: 'user@gmail',
                password: 'password',
                role:'admin',
            });
            expect(res.statusCode).toBe(400);
            expect(Object.values(res.body.error.fieldErrors).flat()).toContain('Enter a valid email');
        })
        it('Short password', async () => {
            const res = await request(app).post('/auth/register').send({
                username: 'user@gmail.com',
                password: 'pass',
                role:'admin',
            });
            expect(res.statusCode).toBe(400);
            expect(Object.values(res.body.error.fieldErrors).flat()).toContain('Password must be at least 6 characters');
        })
    })
})