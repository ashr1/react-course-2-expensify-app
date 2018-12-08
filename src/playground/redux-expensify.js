import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';
/*
{
        id: 'wiouroiewruweioru',
        description: 'January Rent',
        note: 'This was the final payment for the address',
        amount: 54500,
        createdAt: 0
    }
*/

const addExpense = (
    {
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
        //need array without the expense and need the expense, id 
            return state.map((expense) => {
                const updates = action.updates;
                if(expense.id === action.id) {
                    return {...expense, ...updates}; 
                }
                return expense;
            });
        default:
            return state;
    }
};

const setTextFilter = (newTextVal = '') => ({
    type: 'SET_TEXT_FILTER',
    newTextVal
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state=filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.newTextVal
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

const getVisibleExpenses  = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        //console.log(expense.description.toLowerCase());
        //console.log(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1:-1;
        }
        if(sortBy === 'amount')  {
            return a.amount < b.amount ? 1:-1;
        }
    });
};

const store = createStore(combineReducers(
    {
        expenses: expensesReducer,
        filters: filtersReducer
    }
));

store.subscribe(() => {
    const state = store.getState();
    const filteredExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(filteredExpenses);
});

const expenseOne = store.dispatch(addExpense({
    description: 'gas',
    amount: 600,
    note: 'almost got stuck on the road',
    createdAt: 101
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'coffee',
    amount: 500,
    note: 'in a rush so bought it instead of making it',
    createdAt: 120
}));

//store.dispatch(removeExpense({id: expenseOne.expense.id}));
//store.dispatch(editExpense(expenseTwo.expense.id, {amount: 200}));

//store.dispatch(setTextFilter('ga'));
//store.dispatch(setTextFilter(''));
//store.dispatch(sortByAmount());
store.dispatch(sortByDate());

//store.dispatch(setStartDate(125));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(1250)); 

/*const demoState = {
    expenses: [{
        id: 'wiouroiewruweioru',
        description: 'January Rent',
        note: 'This was the final payment for the address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};*/
