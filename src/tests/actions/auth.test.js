import {login, logout} from '../../actions/auth';

test('should return correct login action object', () => {
    expect(login('ashr')).toEqual({
        type: 'LOGIN',
        uid: 'ashr'
    });
});

test('should return correct logout action object', () => {
    expect(logout()).toEqual({
        type: 'LOGOUT'
    });
});