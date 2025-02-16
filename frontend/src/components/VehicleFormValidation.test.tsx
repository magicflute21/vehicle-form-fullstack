import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect } from 'vitest';
import VehicleForm from './VehicleForm';

describe('VehicleForm Validation', () => {
  test('shows required error messages when form is submitted empty', async () => {
    await act(async () => {
      render(
        <ChakraProvider value={defaultSystem}>
          <VehicleForm />
        </ChakraProvider>
      );
    });
  
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /kinnita/i }));
    });
  
    await waitFor(() => {
      expect(screen.getByText('Nimi on kohustuslik väli')).toBeInTheDocument();
      expect(screen.getByText('Telefon on kohustuslik väli')).toBeInTheDocument();
      expect(screen.getByText('Palun valige vähemalt üks automudel')).toBeInTheDocument();
    });
  });

  test('shows error for invalid phone number format', async () => {
    await act(async () => {
      render(
      <ChakraProvider value={defaultSystem}>
        <VehicleForm />
      </ChakraProvider>
      );
    })
    
    await userEvent.type(screen.getByLabelText(/kontakttelefon/i), 'abc');
    await userEvent.click(screen.getByRole('button', { name: /kinnita/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Palun sisestage ainult numbrid')).toBeInTheDocument();
    });
  });

  test('error styles are applied to invalid fields', async () => {
    await act(async () => {
      render(    
        <ChakraProvider value={defaultSystem}>
          <VehicleForm />
        </ChakraProvider>
      );
    });
    
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /kinnita/i }));
    });
    
    await waitFor(() => {
      const nameInput = screen.getByLabelText(/ees- ja perekonnanimi/i);
      const phoneInput = screen.getByLabelText(/kontakttelefon/i);
      
      expect(nameInput.closest('.chakra-form-control')).toHaveAttribute('data-invalid');
      expect(phoneInput.closest('.chakra-form-control')).toHaveAttribute('data-invalid');
    });
  });
});