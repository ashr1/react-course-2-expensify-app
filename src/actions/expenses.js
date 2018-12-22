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