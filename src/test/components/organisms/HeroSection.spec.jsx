import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import HeroSection from '../../../components/organisms/HeroSection'

describe('HeroSection Component', () => {
  afterEach(cleanup);

  it('debe renderizar el título y la descripción', () => {
    const props = {
      title: 'Bienvenido',
      description: 'La mejor tienda',
      backgroundImage: 'fondo.jpg'
    };

    render(<HeroSection {...props} />);

    expect(screen.getByText('Bienvenido')).toBeTruthy();
    expect(screen.getByText('La mejor tienda')).toBeTruthy();
  });

  it('debe aplicar la imagen de fondo en el header', () => {
    const imgUrl = 'https://ejemplo.com/bg.jpg';
    render(<HeroSection title="T" description="D" backgroundImage={imgUrl} />);

    // Buscamos el elemento <header> (role banner por defecto o por tag)
    const header = screen.getByRole('banner'); 
    
    // Verificamos el estilo inline
    expect(header.style.backgroundImage).toContain(`url("${imgUrl}")`);
  });
});