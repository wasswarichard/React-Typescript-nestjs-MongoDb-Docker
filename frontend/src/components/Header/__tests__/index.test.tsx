import { render } from '@testing-library/react';
import Header from '../index';

describe('Tests for Header component', () => {
   it('should successfully render the Header', async () => {
      const { getByTestId } = render(<Header />);
      expect(getByTestId('company-logo')).toHaveTextContent('Exchange');
   });
});
