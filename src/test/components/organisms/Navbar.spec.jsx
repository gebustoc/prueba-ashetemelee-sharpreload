import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../../components/organisms/Navbar';

describe('NavBar Component', () => {
  afterEach(cleanup);

  it('debe renderizar el nombre de la marca y los enlaces principales', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText('PseTiendapulenta')).toBeTruthy();
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Productos')).toBeTruthy();
    expect(screen.getByText('Nosotros')).toBeTruthy();
  });

  it('debe tener las rutas correctas en los enlaces', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Verificamos atributos href usando sintaxis Jasmine
    expect(screen.getByText('Inicio').getAttribute('href')).toBe('/');
    expect(screen.getByText('Productos').getAttribute('href')).toBe('/products');
    expect(screen.getByText('Contacto').getAttribute('href')).toBe('/contact');
  });
});