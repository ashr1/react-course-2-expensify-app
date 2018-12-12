import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';
import {ExpensesSummary} from '../../components/ExpensesSummary';

test('should total multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={9434}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should total a single expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={9434}/>);
    expect(wrapper).toMatchSnapshot();
});