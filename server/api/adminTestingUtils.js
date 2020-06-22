const request = require('supertest');
const app = require('../index');


/*
    need to check that during non testing environments, only admins can use
    certain api endpoints. but we also need to suppress the error log so it
    doesnt clutter up our console during tests
*/
const _testAdminOnly = (callback) => {
    return async () => {
        process.env.NODE_ENV = 'development';
        let oldLogError = console.error;
        console.error = function() {};
        await (callback().expect(401));
        console.error = oldLogError;
        process.env.NODE_ENV = 'test';
    };
};
const testForAdminOnlyGet = (endpoint) => {
    return _testAdminOnly(() => { return request(app).get(endpoint); });
};
const testForAdminOnlyPut = (endpoint) => {
    return _testAdminOnly(() => { return request(app).put(endpoint).send({}); });
};
const testForAdminOnlyDelete = (endpoint) => {
    return _testAdminOnly(() => { return request(app).delete(endpoint); });
};
const testForAdminOnlyPost = (endpoint) => {
    return _testAdminOnly(() => { return request(app).post(endpoint).send({}); });
};

module.exports = {
    testForAdminOnlyGet, testForAdminOnlyPost, testForAdminOnlyPut, testForAdminOnlyDelete
};
