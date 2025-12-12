import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image Component', () => {
  afterEach(cleanup);

  const testProps = {
    src: 'test-image.jpg',
    alt: 'Texto alternativo de la imagen',
    className: 'custom-class',
  };

  it('debe renderizar una imagen', () => {
    render(<Image {...testProps} />);
    const img = screen.getByRole('img');
    expect(img).toBeTruthy();
  });

  it('debe tener el atributo src correcto', () => {
    render(<Image {...testProps} />);
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe(testProps.src);
  });

  it('debe tener el atributo alt correcto', () => {
    render(<Image {...testProps} />);
    const img = screen.getByRole('img');
    expect(img.getAttribute('alt')).toBe(testProps.alt);
  });

  it('debe tener las clases CSS correctas', () => {
    render(<Image {...testProps} />);
    const img = screen.getByRole('img');
    expect(img.className).toContain(testProps.className);
  });

  it('debe manejar la ausencia de className', () => {
    const { alt, src } = testProps;
    render(<Image alt={alt} src={src} />);
    const img = screen.getByRole('img');
    // El componente asigna " " por defecto, por lo que la clase no debe ser null.
    // El comportamiento exacto puede variar, pero no debe fallar.
    expect(img.className).toBe(' '); 
  });
});
