import React from 'react';
import { shallow } from 'enzyme';
import App from './App'

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((<App />));
  });

  it('renders children when passed in', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders label', () => {
    expect(wrapper.find('label').length).toBe(5);
  });

  it('renders input', () => {
    expect(wrapper.find('input').length).toBe(5);
  });

  it('renders text', () => {
    expect(wrapper.text()).toBe('Enter a date to retrive dataMonthOctNovDecDayPick a date');
  });
});