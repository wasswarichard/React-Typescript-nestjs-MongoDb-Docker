import { render } from '@testing-library/react';
import Layout from '../index';

describe('Tests for Layout component', () => {
   it('should successfully render the Layout component', async () => {
      const { getByTestId } = render(
         <Layout>
            <div data-testid="layout-child">LATEST IMAGES</div>
         </Layout>
      );

      expect(getByTestId('company-logo')).toHaveTextContent('Exchange');
      expect(getByTestId('layout-child')).toHaveTextContent('LATEST IMAGES');
   });
});
