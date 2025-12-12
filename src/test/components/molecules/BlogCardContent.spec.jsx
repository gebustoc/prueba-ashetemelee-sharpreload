import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import BlogCardContent from '../../../components/molecules/BlogCardContent';

describe('BlogCardContent Component', () => {
  afterEach(cleanup);

  const testProps = {
    title: 'Título de la Tarjeta del Blog',
    description: 'Esta es una descripción de prueba para la tarjeta del blog.',
    image: 'blog-image.jpg',
  };

  it('debe renderizar el título correctamente', () => {
    render(<BlogCardContent {...testProps} />);
    const titleElement = screen.getByText(testProps.title);
    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName).toBe('H3');
  });

  it('debe renderizar la descripción correctamente', () => {
    render(<BlogCardContent {...testProps} />);
    const descriptionElement = screen.getByText(testProps.description);
    expect(descriptionElement).toBeTruthy();
    expect(descriptionElement.tagName).toBe('P');
  });

  it('debe renderizar la imagen con los atributos correctos', () => {
    render(<BlogCardContent {...testProps} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeTruthy();
    expect(imageElement.getAttribute('src')).toBe(testProps.image);
    expect(imageElement.getAttribute('alt')).toBe(testProps.title);
    expect(imageElement.className).toContain('img-fluid');
  });

  it('debe tener las clases de contenedor correctas', () => {
    const { container } = render(<BlogCardContent {...testProps} />);
    const mainDiv = container.firstChild;
    expect(mainDiv.className).toContain('row');
    expect(mainDiv.className).toContain('align-items-center');
    expect(mainDiv.className).toContain('bg-secondary');
  });
});
