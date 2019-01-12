import React from 'react';
import Calculator, { sum } from './Calculator';
import { shallow } from 'enzyme';

it('should render correctly', () => {
  const calculator = shallow(<Calculator />);
  expect(calculator).toMatchSnapshot();
});

it('should render correctly (without snapshot)', () => {
  const calculator = shallow(<Calculator />);
  expect(calculator.find('h1').text()).toBe('Calculator');

  const inputs = calculator.find('input');
  expect(inputs.at(0).prop('id')).toBe('input-1');
  expect(inputs.at(1).prop('id')).toBe('input-2');

  expect(calculator.find('button').text()).toBe('Add');
  expect(calculator.find('Button').prop('children')).toBe('Reset');

  expect(calculator.find('#output').length).toBe(1);
});

it('should render error message if input is not valid', () => {
  const calculator = shallow(<Calculator />);

  calculator.find('button').simulate('click');
  const output = calculator.find('#output');

  // very bad, because it captures the full output again
  expect(calculator).toMatchSnapshot();

  // good, because self-descriptive, but requires text maintenance
  expect(output.text()).toBe('Please verify your input!');

  // better, because it only captures the result text without having to write the text
  expect(output.text()).toMatchSnapshot();

  // better, because it only captures the result text without having to actually write the text
  expect(output.text()).toMatchInlineSnapshot(`"Please verify your input!"`);
});

it('should return 4 when calculating 1 + 3', () => {
  expect(sum(1, 3)).toMatchSnapshot();
});

it('should return 4 when calculating 1 + 3 (without snapshot)', () => {
  expect(sum(1, 3)).toBe(4);
});
