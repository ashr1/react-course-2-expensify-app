import React from 'react';
import {shallow} from 'enzyme';
import {Header} from '../../components/Header';

test('renders header component', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
    //expect(wrapper.find('h1').text()).toBe('Expensify');
    //const shallowRenderer = new ShallowRenderer();
    //shallowRenderer.render(<Header />);
    //expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout}/>);

    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});
