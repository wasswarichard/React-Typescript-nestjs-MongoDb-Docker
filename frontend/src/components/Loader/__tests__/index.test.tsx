import { render } from '@testing-library/react';
import Loader from '../index';

describe('Tests for Loader component', () => {
   it('should successfully render the Loader', async () => {
      const { getByTestId } = render(<Loader />);

      expect(getByTestId('loader')).toBeInTheDocument();
   });
});
