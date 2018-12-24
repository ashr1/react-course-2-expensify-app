import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, 
    addExpense, 
    editExpense, 
    startEditExpense, 
    removeExpense, 
    startRemoveExpense, 
    setExpenses, 
    startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt};
    });
    database.ref('expense').set(expensesData).then(() => done());
});

test('should setup remove expense action object', ()=>{
    expect(removeExpense({id: '123abc'})).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', ()=>{
    const action = editExpense('123abc', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('should edit expenses from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id;
    const updates = {
        description: 'Eating',
        note: 'Restaurants, Take-outs, Family Outings, Caterings, etc.',
        amount: 90000
    };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`expense/${id}`).once('value');
    }).then((snapshot) => {
        const updatedExpense = {id:snapshot.key,...snapshot.val()};
        expect(updatedExpense).toEqual({...expenses[0], ...updates});
        done();
    });
});

test('should setup add expense action object with provided values', () => {

    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expense/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const defaultExpenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpenseData
            }
        });

        return database.ref(`expense/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpenseData);
        done();
    });
});

test('should setup set expense action object with data', () => {
    const setExpensesActionObject = setExpenses(expenses);

    expect(setExpensesActionObject).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
   
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove expenses from firebase', (done) => {
    const store = createMockStore({});

    const id = expenses[0].id;

    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`expense/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeNull();
        done();
    });
});     
