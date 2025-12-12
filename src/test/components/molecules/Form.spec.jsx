import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import DynamicForm from '../../../components/molecules/Form';

describe('DynamicForm Component', () => {
  afterEach(cleanup);

  const mockOnChange = jasmine.createSpy('onChange');

  const mockInputs = [
    {
      id: 'name',
      label: 'Nombre',
      type: 'text',
      value: 'John Doe',
      onChange: mockOnChange,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      value: '',
      onChange: () => {},
      error: 'El email es obligatorio',
    },
    {
      id: 'category',
      label: 'Categoría',
      type: 'select',
      value: '2',
      onChange: () => {},
      options: [
        { id: '1', nombre: 'Categoría 1' },
        { id: '2', nombre: 'Categoría 2' },
      ],
    },
  ];

  it('debe renderizar un input de texto con su label y valor', () => {
    render(<DynamicForm inputs={[mockInputs[0]]} />);
    const input = screen.getByLabelText('Nombre');
    expect(input).toBeTruthy();
    expect(input.value).toBe('John Doe');
    expect(input.getAttribute('type')).toBe('text');
  });

  it('debe llamar a la función onChange de un input cuando su valor cambia', () => {
    render(<DynamicForm inputs={[mockInputs[0]]} />);
    const input = screen.getByLabelText('Nombre');
    fireEvent.change(input, { target: { value: 'Jane Doe' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('debe mostrar un mensaje de error y la clase is-invalid si se proporciona un error', () => {
    render(<DynamicForm inputs={[mockInputs[1]]} />);
    expect(screen.getByText('El email es obligatorio')).toBeTruthy();
    const input = screen.getByLabelText('Email');
    expect(input.className).toContain('is-invalid');
  });

  it('debe renderizar un campo de tipo select con opciones y la opción correcta seleccionada', () => {
    render(<DynamicForm inputs={[mockInputs[2]]} />);
    const select = screen.getByLabelText('Categoría');
    expect(select).toBeTruthy();
    expect(select.tagName).toBe('SELECT');
    
    expect(select.value).toBe(mockInputs[2].value);

    expect(screen.getByText('Categoría 1')).toBeTruthy();
    expect(screen.getByText('Seleccione una opción...')).toBeTruthy();
  });

  it('debe renderizar múltiples inputs correctamente', () => {
    render(<DynamicForm inputs={mockInputs} />);
    expect(screen.getByLabelText('Nombre')).toBeTruthy();
    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('Categoría')).toBeTruthy();
  });

  it('no debe fallar si el array de inputs está vacío', () => {
    const { container } = render(<DynamicForm inputs={[]} />);
    expect(container.querySelector('input')).toBeNull();
    expect(container.querySelector('select')).toBeNull();
  });
});
