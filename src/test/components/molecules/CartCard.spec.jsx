import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CartCard from '../../../components/molecules/CartCard';

describe('CartCard Component', () => {
  afterEach(cleanup);

  const mockProduct = {
    id: 1,
    nombre: 'Producto de Prueba',
    precio: 10000,
    stock: 5,
  };

  const mockEraseItem = jasmine.createSpy('eraseItem');

  const CheckoutPage = () => <div>Página de Checkout</div>;

  const renderComponent = (product) => {
    return render(
      <MemoryRouter initialEntries={['/cart']}>
        <Routes>
          <Route path="/cart" element={<CartCard product={product} eraseItem={mockEraseItem} itemSlot={0} />} />
          <Route path="/checkout/:id/:slot" element={<CheckoutPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('debe renderizar el nombre y el precio del producto', () => {
    renderComponent(mockProduct);
    expect(screen.getByText('Producto de Prueba')).toBeTruthy();
    expect(screen.getByText('10.000 CLP')).toBeTruthy(); 
  });

  it('debe llamar a la función eraseItem al hacer click en el botón de borrar', () => {
    renderComponent(mockProduct);
    const buttons = screen.getAllByRole('button');
    const deleteButton = buttons[1];
    fireEvent.click(deleteButton);
    expect(mockEraseItem).toHaveBeenCalled();
  });

  it('debe navegar a la página de checkout al hacer click en "Comprar"', () => {
    renderComponent(mockProduct);
    const buyButton = screen.getByRole('button', { name: /Comprar/i });
    fireEvent.click(buyButton);
    expect(screen.getByText('Página de Checkout')).toBeTruthy();
  });

  it('el botón de "Comprar" debe estar habilitado si hay stock', () => {
    renderComponent(mockProduct);
    const buyButton = screen.getByRole('button', { name: /Comprar/i });
    expect(buyButton.disabled).toBe(false);
    expect(buyButton.textContent).toContain(`(stock ${mockProduct.stock})`);
  });

  it('el botón de "Comprar" debe estar deshabilitado si no hay stock', () => {
    const productNoStock = { ...mockProduct, stock: 0 };
    renderComponent(productNoStock);
    const buyButton = screen.getByRole('button', { name: /Comprar/i });
    expect(buyButton.disabled).toBe(true);
    expect(buyButton.textContent).toContain('(stock 0)');
  });
});
