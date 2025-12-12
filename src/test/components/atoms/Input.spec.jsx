import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Input } from '../../../components/atoms/Input'; 

describe('Input Component', () => {
  afterEach(cleanup);

  it('debe renderizar un input de texto por defecto', () => {
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toBeTruthy();
    expect(input.tagName).toBe('INPUT');
    expect(input.getAttribute('type')).toBe('text');
  });

  it('debe renderizar con el tipo especificado', () => {
    render(<Input type="password" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input.getAttribute('type')).toBe('password');
  });

  it('debe renderizar un textarea si el tipo es "textarea"', () => {
    render(<Input type="textarea" data-testid="test-input" />);
    const textarea = screen.getByTestId('test-input');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('debe aceptar y renderizar un valor', () => {
    const testValue = 'Hola Mundo';
    render(<Input value={testValue} onChange={() => {}} data-testid="test-input"/>);
    const input = screen.getByTestId('test-input');
    expect(input.value).toBe(testValue);
  });

  it('debe llamar a la función onChange cuando el valor cambia', () => {
    const onChangeSpy = jasmine.createSpy('onChangeSpy');
    render(<Input onChange={onChangeSpy} data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    
    fireEvent.change(input, { target: { value: 'nuevo texto' } });
    
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('debe aplicar clases CSS adicionales', () => {
    const customClass = 'mi-clase-custom';
    render(<Input className={customClass} data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input.className).toContain('form-control'); // default bootstrap class
    expect(input.className).toContain(customClass);
  });

  it('debe pasar props adicionales al input', () => {
    const placeholderText = 'Ingrese su nombre';
    render(<Input placeholder={placeholderText} data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input.getAttribute('placeholder')).toBe(placeholderText);
  });
});
