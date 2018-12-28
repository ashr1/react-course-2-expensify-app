import authReducer from '../../reducers/auth';

test('should return empty object for default action on inital call', () => {
    const state = authReducer(undefined, {
        type: "@@INIT"
    });
    expect(state).toEqual({});
});

test('on login should set state to be object with uid property', () => {
    const action = {
        type: 'LOGIN',
        uid: 'ashr'
    };

    expect(authReducer(undefined, action)).toEqual({uid: 'ashr'});
});

test('on logout should wipe the state clean', () => {
    const action = {
        type: 'LOGOUT'
    };

    expect(authReducer({uid: 'fakedId'}, action)).toEqual({});
});