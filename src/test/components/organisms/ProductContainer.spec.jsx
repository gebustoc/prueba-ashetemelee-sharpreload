import React from 'react';
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductContainer from '../../../components/organisms/ProductContainer';
import ProductosService from '../../../services/ProductosService';

const mockProductos = [
  { id: 1, nombre: 'Mouse', precio: 1000, categorias: [{ nombreCategoria: 'Periféricos' }], stock: 5 },
  { id: 2, nombre: 'Monitor', precio: 5000, categorias: [{ nombreCategoria: 'Pantallas' }], stock: 2 },
  { id: 3, nombre: 'Teclado', precio: 2000, categorias: [{ nombreCategoria: 'Periféricos' }], stock: 8 }
];

describe('ProductContainer Component', () => {
  
  beforeEach(() => {

    spyOn(ProductosService, 'getAllProductos').and.returnValue(Promise.resolve(mockProductos));
  });

  afterEach(cleanup);

  it('debe renderizar la lista de productos obtenida del servicio', async () => {
    render(
      <MemoryRouter>
        <ProductContainer />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Mouse')).toBeTruthy();
      expect(screen.getByText('Monitor')).toBeTruthy();
      expect(screen.getByText('Teclado')).toBeTruthy();
    });
  });

  it('debe filtrar los productos cuando se selecciona una categoría', async () => {
    render(
      <MemoryRouter>
        <ProductContainer />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Mouse'));
    const selects = screen.getAllByRole('combobox');
    const categorySelect = selects[0]; 

    fireEvent.change(categorySelect, { target: { value: 'Pantallas' } });

    expect(screen.queryByText('Mouse')).toBeNull(); 
    expect(screen.getByText('Monitor')).toBeTruthy();
  });

  it('debe ocultar los filtros si la prop showFilters es false', async () => {
    render(
      <MemoryRouter>
        <ProductContainer showFilters={false} />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Mouse'));
    const selects = screen.queryAllByRole('combobox');
    expect(selects.length).toBe(0);
  });
});