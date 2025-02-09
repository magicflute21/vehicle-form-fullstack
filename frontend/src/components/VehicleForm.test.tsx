import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react';
import VehicleForm from './VehicleForm';

describe('VehicleForm', () => {
  test('renders form with all required fields', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <VehicleForm />
      </ChakraProvider>
  );
    
    expect(screen.getByLabelText(/ees- ja perekonnanimi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kontakttelefon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/automargid/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/juhiluba/i)).toBeInTheDocument();
  });
});