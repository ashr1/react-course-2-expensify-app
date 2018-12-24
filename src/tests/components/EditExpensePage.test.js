import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpenseSpy, historySpy, removeExpenseSpy, wrapper;

beforeEach(() => {
    editExpenseSpy = jest.fn();
    historySpy = {
        push: jest.fn()
    };
    removeExpenseSpy = jest.fn();
    wrapper = shallow(
        <EditExpensePage 
            expense={expenses[1]} 
            editExpense={editExpenseSpy} 
            history={historySpy} 
            startRemoveExpense={removeExpenseSpy}
        />
    );
});

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    //wrapper.find('ExpenseForm').simulate('submit', expenses[1]);
    expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
});

test('should handle startRemoveExpense', () => {
    wrapper.find('button').simulate('click');
    expect(removeExpenseSpy).toHaveBeenLastCalledWith({id: expenses[1].id});
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
});
