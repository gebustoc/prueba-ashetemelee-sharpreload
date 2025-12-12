import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';

describe('Footer Component', () => {
  afterEach(cleanup);

  it('debe renderizar el título y la descripción "Sobre Nosotros"', () => {
    render(<Footer />);
    // Nota: toBeTruthy() funciona, pero toBeInTheDocument() es el que suele fallar en Jasmine
    // Si toBeInTheDocument falla, usa expect(elemento).toBeTruthy() como ya haces.
    expect(screen.getByText('Sobre Nosotros')).toBeTruthy();
    expect(screen.getByText(/Lorem ipsum/)).toBeTruthy(); // Uso regex para no copiar todo el texto
  });

  it('debe renderizar el título y los enlaces de "Enlaces Rápidos"', () => {
    render(<Footer />);
    expect(screen.getByText('Enlaces Rápidos')).toBeTruthy();

    // --- CORRECCIÓN AQUÍ ---
    // 1. Obtenemos el elemento
    const linkInicio = screen.getByRole('link', { name: 'Inicio' });
    const linkBlog = screen.getByRole('link', { name: 'Blog' });
    const linkContacto = screen.getByRole('link', { name: 'Contacto' });

    // 2. Verificamos el atributo 'href' usando getAttribute y toBe
    expect(linkInicio.getAttribute('href')).toBe('/');
    expect(linkBlog.getAttribute('href')).toBe('/blog');
    expect(linkContacto.getAttribute('href')).toBe('/contact');
  });

  it('debe renderizar el aviso de derechos de autor', () => {
    render(<Footer />);
    expect(screen.getByText('2025 Pse Enterprise. Todos los derechos reservados.')).toBeTruthy();
  });

  it('debe aplicar las clases CSS correctas al contenedor principal', () => {
    const { container } = render(<Footer />);
    // eslint-disable-next-line testing-library/no-container-single-element
    const footerContainer = container.firstChild;
    
    expect(footerContainer).toBeTruthy();
    
    // classList.contains es más seguro que comprobar el string completo
    expect(footerContainer.classList.contains('bg-dark')).toBe(true);
    expect(footerContainer.classList.contains('text-white')).toBe(true);
    expect(footerContainer.classList.contains('py-4')).toBe(true);
  });
});