import React from 'react';
import { ProgressBar } from '..';
import renderWithSSR from '~src/_helpers/testing/renderWithSSR.web';

beforeAll(() => jest.spyOn(console, 'error').mockImplementation());
afterAll(() => jest.restoreAllMocks());

describe('<ProgressBar />', () => {
  it('should render ProgressBar with default properties', () => {
    const { container } = renderWithSSR(<ProgressBar value={20} />);
    expect(container).toMatchSnapshot();
  });
});
