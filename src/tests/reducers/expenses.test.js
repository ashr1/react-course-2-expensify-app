import expensesReducer from '../../reducers/expenses';
import uuid from 'uuid';
import expenses from '../fixtures/expenses';


test('when no parameters supplied, reducer sets up default expenses state', () => {
    const state=expensesReducer(undefined, {
        type: "@@INIT"
    });

    expect(state).toEqual([]);

});

test('removes expense by id', () => {
    const action = {type: 'REMOVE_EXPENSE', id: expenses[0].id};
    expect(expensesReducer(expenses,action)).toEqual([expenses[1],expenses[2]]);
});

test('should not remove expenses if id not found', () => {
    const action = {type: 'REMOVE_EXPENSE', id: '5'};
    expect(expensesReducer(expenses,action)).toEqual(expenses);
});

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description: 'chocoloate',
            note: 'sees candies',
            amount: 234,
            createdAt: 455
        }
    };
    const expensesState = expensesReducer(expenses, action);

    expect(expensesState).toEqual([...expenses, {
        id: expect.any(String),
        description: 'chocoloate',
        note: 'sees candies',
        amount: 234,
        createdAt: 455
    }]);
});

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            description: 'coffee chocolate',
            note: 'was too hungry so ran to sees candies',
            amount: 234,
            createdAt: 455
        }
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], {
        id: expect.any(String),
        description: 'coffee chocolate',
        note: 'was too hungry so ran to sees candies',
        amount: 234,
        createdAt: 455
    }, expenses[2]]);
});

test('should not edit expense if expense not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            description: 'random',
            note: 'random',
            amount: 4,
            createdAt: 5
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

