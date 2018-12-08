const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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
