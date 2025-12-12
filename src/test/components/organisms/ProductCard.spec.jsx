import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

const mockProduct = {
  id: 1,
  nombre: 'Teclado Gamer',
  descripcion: 'Teclado mecánico RGB',
  precio: 50000,
  stock: 10,
  bbID: 'abc123xyz' 
};

describe('ProductCard Component', () => {
  afterEach(cleanup);

  it('debe renderizar la información del producto correctamente', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Teclado Gamer')).toBeTruthy();
    expect(screen.getByText('Teclado mecánico RGB')).toBeTruthy();
    expect(screen.getByText(/\$50.000/)).toBeTruthy(); 
    expect(screen.getByText(/10 en stock/)).toBeTruthy();
  });

  it('debe usar la imagen de ImgBB con el bbID del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe('https://ibb.co/abc123xyz');
  });

  it('debe usar la imagen por defecto si el producto no tiene bbID', () => {
    const productoSinImagen = { ...mockProduct, bbID: null };
    render(
      <MemoryRouter>
        <ProductCard product={productoSinImagen} />
      </MemoryRouter>
    );
    
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe('https://m.media-amazon.com/images/I/51N7-BydsDL.jpg');
  });

  it('debe renderizar el botón de comprar con stock', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    
    const button = screen.getByText(/Comprar — 10 en stock/i);
    expect(button).toBeTruthy();
  });
});