import uuid from 'uuid';
import database from '../firebase/firebase';

//component calls action generator -(1)-> props.addExpense(expenseData)
//action generator returns object -> 
//component disatches object => props.distapch(1)
//redux store changes

//component calls action generator
// action generator returns function
//component dispatches function (?)
// function runs (has the ability to dispatch other actions and do whatever it wants)

//redux by default does not allow you to dispatch (for the store to distinguish and modify state approp.)functions 

//where would I fetch the expenses from the db when the app initially loads

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData={}) => {
    return (dispatch) => {
        //writing data to firebase, waiting for it to sync and then dispatch to addExpense, ensuring changes to redux store
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        const expense = {description, note, amount, createdAt};

        return database.ref('expense').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expense').once('value').then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                const id = childSnapshot.key;
                expenses.push({id, ...childSnapshot.val()});
            });
            dispatch(setExpenses(expenses));
        });
        
    };
};

