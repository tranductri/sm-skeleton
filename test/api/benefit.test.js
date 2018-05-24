import { describe } from 'ava-spec';
import request from 'supertest';
import uuidv4 from 'uuid/v4';
import { getAllElements, loadFixtures } from '../helpers';
import app from '../../src/app';

const fixtures = [
    'benefits'
];

const URI = '/benefit';

let dbObjects;

describe.serial('Benefit API', it => {
    it.beforeEach(() =>
        loadFixtures(fixtures)
            .then(() => getAllElements('Benefit'))
            .then(response => {
                dbObjects = response;
            })
    );

    it('should reitrieve a list of all benefits', async t => {
        const response = await request(app)
            .get(URI)
            .expect(200)
            .then(res => res.body);
        t.is(response.rows.length, dbObjects.length);
    });

    it('should return a single benefit', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id}`)
            .expect(200);
        t.is(response.body.code, fixture.code);
    });

    it('should return ResourceNotFound when retrieving nonexisting benefit', async t => {
        const response = await request(app)
            .get(`${URI}/${uuidv4()}`)
            .expect(404);
        t.is(response.body.name, 'ResourceNotFoundError');
        t.is(response.body.message, 'Could not find resource of type benefit');
    });

    // it('should add a new benefit', async t => {
    //     const content = {
    //         name: 'added benefit'
    //     };
    //     const response = await request(app)
    //         .post(URI)
    //         .send(content)
    //         .expect(201);
    //     t.is(response.body.name, content.name);
    // });

    // it('should be able to update an benefit', async () => {
    //     const benefit = dbObjects[0];
    //     await request(app)
    //         .put(`${URI}/${benefit.id}`)
    //         .send({ name: 'changed' })
    //         .expect(204);
    // });

    // it('should be able to delete an benefit', async () => {
    //     const benefit = dbObjects[0];
    //     await request(app)
    //         .delete(`${URI}/${benefit.id}`)
    //         .expect(204);
    // });
});
