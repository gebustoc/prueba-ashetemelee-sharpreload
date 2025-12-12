import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogCard from '../../../components/organisms/BlogCard';

describe('BlogCard Component', () => {
  afterEach(cleanup);

  const testProps = {
    link: '/blog/test-post',
    title: 'Título de Prueba del Blog',
    description: 'Descripción de prueba del blog.',
    image: 'imagen-blog.jpg',
  };

  it('debe renderizar un componente Link con la ruta correcta', () => {
    render(
      <MemoryRouter>
        <BlogCard {...testProps} />
      </MemoryRouter>
    );

    // Seleccionar el link por su rol y el texto visible que contiene
    const linkElement = screen.getByRole('link', { name: /título de prueba del blog/i });
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute('href')).toBe(testProps.link);
    expect(linkElement.className).toContain('blog-card');
  });

  it('debe renderizar el BlogCardContent con las props correctas', () => {
    render(
      <MemoryRouter>
        <BlogCard {...testProps} />
      </MemoryRouter>
    );

    // Verificamos que los contenidos del BlogCardContent se renderizan
    expect(screen.getByText(testProps.title)).toBeTruthy();
    expect(screen.getByText(testProps.description)).toBeTruthy();
    const imageElement = screen.getByRole('img');
    expect(imageElement.getAttribute('src')).toBe(testProps.image);
    expect(imageElement.getAttribute('alt')).toBe(testProps.title);
  });
});
