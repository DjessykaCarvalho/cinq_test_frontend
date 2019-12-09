import React from 'react';
import { store } from '../components/util';
import { mount } from 'enzyme';
import App from '../App';
import 'jsdom-global/register';
import jsdom from 'jsdom'
const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe('Test the users list', () => {
    it('Update list index 0 to firstName = Eren lastName = Yeager', () => {
        mount(<App/>)
        // let users = store.getState().users
        // expect(users[0].firstName === 'John').toBeTruthy();
        // expect(users[0].lastName === 'Doe').toBeTruthy();
        // users[0].firstName = 'Eren';
        // users[0].lastName = 'Yeager';
        // expect(users[0].firstName === 'Eren').toBeTruthy();
        // expect(users[0].lastName === 'Yeager').toBeTruthy();
    });
});