import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminRoute from '../../../components/molecules/AdminRoute';
import UserService from '../../../services/UserService';

describe('AdminRoute Component', () => {
  const originalIsAuthenticated = UserService.isAuthenticated;
  const originalIsAdmin = UserService.isAdmin;

  afterEach(() => {
    UserService.isAuthenticated = originalIsAuthenticated;
    UserService.isAdmin = originalIsAdmin;
    cleanup();
  });

  const AdminContent = () => <div>Contenido de Admin</div>;
  const HomeContent = () => <div>Página de Inicio</div>;

  it('debe renderizar el contenido protegido si el usuario es admin', () => {
    UserService.isAuthenticated = () => true;
    UserService.isAdmin = () => true;

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<AdminRoute><AdminContent /></AdminRoute>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Contenido de Admin')).toBeTruthy();
  });

  it('debe redirigir a la página de inicio si el usuario no es admin', () => {
    UserService.isAuthenticated = () => true;
    UserService.isAdmin = () => false;

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<AdminRoute><AdminContent /></AdminRoute>} />
          <Route path="/" element={<HomeContent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Contenido de Admin')).toBeNull();
    expect(screen.getByText('Página de Inicio')).toBeTruthy();
  });

  it('debe redirigir a la página de inicio si el usuario no está autenticado', () => {
    UserService.isAuthenticated = () => false;
    UserService.isAdmin = () => false;

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<AdminRoute><AdminContent /></AdminRoute>} />
          <Route path="/" element={<HomeContent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Contenido de Admin')).toBeNull();
    expect(screen.getByText('Página de Inicio')).toBeTruthy();
  });
});
