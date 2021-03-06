import React from 'react';
import {connect} from 'react-redux';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';
import ExpenseForm from './ExpenseForm';


export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onClick = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onClick}>Remove Expense</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => (
    {
        startEditExpense: (expenseId, expense) => dispatch(startEditExpense(expenseId, expense)),
        startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
    }
);

/*const EditExpensePage = (props) => {
    console.log(props);
    return (
        <div>
            <ExpenseForm 
                expense={props.expense}
                onSubmit={(expense) => {
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push('/');
                    //console.log('updated', expense);
                }}
            />
            <button onClick={() => {
                //console.log(props);
                props.dispatch(removeExpense({id: props.expense.id}));
                props.history.push('/');
            }}>Remove</button>
        </div>
    );
};*/

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => (expense.id === props.match.params.id))
    };
};  

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);