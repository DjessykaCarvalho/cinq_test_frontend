import configureStore from 'redux-mock-store';
import users from '../assets/users.json';
const mockStore = configureStore([]);

describe('Test the users list', () => {
    let store = mockStore({
        users: users
    });

    it('Update list index 0 to firstName = Eren lastName = Yeager', () => {
        let users = store.getState().users
        expect(users[0].firstName === 'John').toBeTruthy();
        expect(users[0].lastName === 'Doe').toBeTruthy();
        users[0].firstName = 'Eren';
        users[0].lastName = 'Yeager';
        expect(users[0].firstName === 'Eren').toBeTruthy();
        expect(users[0].lastName === 'Yeager').toBeTruthy();
    });
});