import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});

    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const state = filtersReducer({
        text: 'water',
        sortBy: 'amount',
        startDate: moment(101),
        endDate: moment(203)
    }, {type: 'SORT_BY_DATE'});

    expect(state).toEqual({
        text: 'water',
        sortBy: 'date',
        startDate: moment(101),
        endDate: moment(203)
    });
}
);

//should set text filter
test('should set text filter', () => {
    const state=filtersReducer(undefined, {type: 'SET_TEXT_FILTER', newTextVal: 'water'});
    expect(state.text).toBe('water');
});
// should set startDate filter
test('should set start date filter', () => {
    const state=filtersReducer(undefined, {type: 'SET_START_DATE', startDate: moment(4)});
    expect(state.startDate).toEqual(moment(4));
});
//should set endDate
test('should set end date filter', () => {
    const state=filtersReducer(undefined, {type: 'SET_END_DATE', endDate: moment(10)});
    expect(state.endDate).toEqual(moment(10));
});