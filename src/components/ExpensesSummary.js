import React from 'react';
import {connect} from 'react-redux';
import expensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses'; 
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    return (
        <div>
            <p>Viewing {props.expenseCount} {props.expenseCount === 1 ? 'expense':'expenses'} totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}</p>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: expensesTotal(visibleExpenses)
    };
};

/*
const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: numeral(expensesTotal(visibleExpenses) / 100).format('$0,0.00')
    };
};
*/

export default connect(mapStateToProps)(ExpensesSummary);