import React from 'react';
import {connect} from 'react-redux';
import {removeExpense} from '../actions/expenses';
import {Link} from 'react-router-dom';
//{description, amount, createdAt, id, dispatch}
export const ExpenseListItem =  ({description, amount, createdAt, id, dispatch}) => (
    <div>
        <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
        <p>{amount} - {createdAt}</p>
    </div>
);

export default connect()(ExpenseListItem);

/*

export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

*/

//having done this:
/*
<ExpenseListItem {...expense} key={expense.id} />
*/

/* i get this:

{id: "ecbe93c7-eb69-4fd9-8fac-ccba9d5e443a", description: "Gas bill", note: "", amount: 500, createdAt: 0, …}
amount: 500
createdAt: 0
description: "Gas bill"
dispatch: ƒ dispatch(action)
id: "ecbe93c7-eb69-4fd9-8fac-ccba9d5e443a"
note: ""
__proto__: Object

*/