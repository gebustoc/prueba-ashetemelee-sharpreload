// src/test/setupTests.js
import matchers from '@testing-library/jasmine-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


beforeEach(() => {
    jasmine.getEnv().addMatchers(matchers.default.default);
    let localStore = {};
    // Reset the mock store before each test
    localStore = {}
    // Spy on localStorage methods and replace them with fakes
    spyOn(window.localStorage, 'getItem').and.callFake((key) => {
        return key in localStore ? localStore[key] : null;
    });
    spyOn(window.localStorage, 'setItem').and.callFake((key, value) => {
        localStore[key] = String(value); // localStorage stores values as strings
    });
    spyOn(window.localStorage, 'removeItem').and.callFake((key) => {
        delete localStore[key];
    });
    spyOn(window.localStorage, 'clear').and.callFake(() => {
        localStore = {};
    });

});

