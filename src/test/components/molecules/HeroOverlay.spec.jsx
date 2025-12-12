import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import HeroOverlay from '../../../components/molecules/HeroOverlay';

describe('HeroOverlay Component', () => {
  afterEach(cleanup);

  const testProps = {
    title: 'Título de Prueba del Hero',
    description: 'Esta es una descripción corta para el Hero.',
  };

  it('debe renderizar el título correctamente como un h1', () => {
    render(<HeroOverlay {...testProps} />);
    const titleElement = screen.getByText(testProps.title);
    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName).toBe('H1');
    expect(titleElement.className).toContain('text-white');
    expect(titleElement.className).toContain('mb-4');
  });

  it('debe renderizar la descripción correctamente como un p', () => {
    render(<HeroOverlay {...testProps} />);
    const descriptionElement = screen.getByText(testProps.description);
    expect(descriptionElement).toBeTruthy();
    expect(descriptionElement.tagName).toBe('P');
    expect(descriptionElement.className).toContain('text-white');
    expect(descriptionElement.className).toContain('lead');
  });

  it('debe aplicar la clase "overlay" al div contenedor', () => {
    const { container } = render(<HeroOverlay {...testProps} />);
    const overlayDiv = container.firstChild;
    expect(overlayDiv).toBeTruthy();
    expect(overlayDiv.className).toContain('overlay');
  });
});
