import Button from '../../../components/atoms/Button';
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

describe('Button Component', () => {
  
  afterEach(cleanup);

  it('debe renderizar el contenido (children) correctamente', () => {
    const textoBoton = 'Guardar Cambios';
    render(<Button>{textoBoton}</Button>);

    const boton = screen.getByText(textoBoton);
    expect(boton).toBeTruthy();
    expect(boton.tagName).toBe('BUTTON');
  });

  it('debe ejecutar la función onClick cuando se hace click', () => {
    const onClickSpy = jasmine.createSpy('onClickSpy');
    
    render(<Button onClick={onClickSpy}>Click Me</Button>);
    
    const boton = screen.getByText('Click Me');
    fireEvent.click(boton);
    expect(onClickSpy).toHaveBeenCalled();
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('debe pasar las props adicionales (spread props) al componente de Bootstrap', () => {
    const testClass = 'mi-clase-custom';
    const testType = 'submit';

    render(
      <Button 
        className={testClass} 
        type={testType} 
        variant="danger"
      >
        Borrar
      </Button>
    );

    const boton = screen.getByText('Borrar');
    expect(boton.className).toContain(testClass);
    expect(boton.className).toContain('btn-danger');
    expect(boton.getAttribute('type')).toBe(testType);
  });

  it('debe estar deshabilitado si la prop disabled es true', () => {
    render(<Button disabled>Procesando</Button>);
    
    const boton = screen.getByText('Procesando');
    expect(boton.disabled).toBe(true);
  });
});