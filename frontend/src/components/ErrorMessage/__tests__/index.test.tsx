import { render } from '@testing-library/react';

import ErrorMessage from '../index';

describe('Tests for ErrorMessage component', () => {
   it('should successfully render the ErrorMessage', async () => {
      const { getByText } = render(<ErrorMessage />);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText('Something went wrong. Please try again.')).toBeInTheDocument();
   });
});
