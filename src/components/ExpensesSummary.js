import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import expensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses'; 
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{props.expenseCount}</span> {props.expenseCount === 1 ? 'expense':'expenses'} totalling <span>{numeral(props.expensesTotal / 100).format('$0,0.00')}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
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

export default connect(mapStateToProps)(ExpensesSummary);