import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text Component', () => {
  afterEach(cleanup);

  it('debe renderizar un elemento <p> por defecto', () => {
    const content = 'Este es un texto de párrafo.';
    render(<Text>{content}</Text>);
    const textElement = screen.getByText(content);
    expect(textElement).toBeTruthy();
    expect(textElement.tagName).toBe('P');
  });

  it('debe renderizar el contenido (children) correctamente', () => {
    const content = 'Contenido de prueba';
    render(<Text>{content}</Text>);
    expect(screen.getByText(content)).toBeTruthy();
  });

  it('debe renderizar un elemento diferente basado en la prop "variant"', () => {
    const content = 'Este es un encabezado';
    render(<Text variant="h1">{content}</Text>);
    const headingElement = screen.getByText(content);
    expect(headingElement).toBeTruthy();
    // Use .toBe because we are checking the tag name
    expect(headingElement.tagName).toBe('H1');
  });

  it('debe aplicar la clase CSS proporcionada', () => {
    const content = 'Texto con estilo';
    const customClass = 'mi-clase-personalizada';
    render(<Text className={customClass}>{content}</Text>);
    const textElement = screen.getByText(content);
    expect(textElement.className).toContain(customClass);
  });

  it('debe renderizar otros tipos de elementos como "span"', () => {
    const content = 'Texto en un span';
    render(<Text variant="span">{content}</Text>);
    const spanElement = screen.getByText(content);
    expect(spanElement).toBeTruthy();
    expect(spanElement.tagName).toBe('SPAN');
  });
});
