import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginButtons from '../../../components/molecules/LoginButtons';
import UserService from '../../../services/UserService';

describe('LoginButtons Component', () => {
  // Guardar las implementaciones originales de localStorage y UserService
  const originalGetItem = localStorage.getItem;
  const originalRemoveItem = localStorage.removeItem;
  const originalUserServiceLogout = UserService.logout;

  // Mock para useNavigate (se usará en el renderComponent)
  const LoginPage = () => <div>Página de Login</div>;
  const RegisterPage = () => <div>Página de Registro</div>;
  const CartPage = () => <div>Página de Carrito</div>;
  const HomePage = () => <div>Página Principal</div>; // Para el caso de logout

  afterEach(() => {
    cleanup();
    // Restaurar las implementaciones originales después de cada prueba
    localStorage.getItem = originalGetItem;
    localStorage.removeItem = originalRemoveItem;
    UserService.logout = originalUserServiceLogout;
  });

  it('debe renderizar los botones de "Iniciar Sesion" y "Registrar" si el usuario no está logueado', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // No hay usuario logueado
    render(
      <MemoryRouter>
        <LoginButtons />
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>
    );

    const loginButton = screen.getByText('Iniciar Sesion');
    const registerButton = screen.getByText('Registrar');

    expect(loginButton).toBeTruthy();
    expect(registerButton).toBeTruthy();
    expect(screen.queryByText('Cerrar Sesion')).toBeNull();
    expect(screen.queryByText('🛒 Carrito')).toBeNull();

    fireEvent.click(loginButton);
    expect(screen.getByText('Página de Login')).toBeTruthy();
  });

  it('debe navegar a "/register" al hacer click en el botón "Registrar" si el usuario no está logueado', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // No hay usuario logueado
    render(
      <MemoryRouter>
        <LoginButtons />
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>
    );

    const registerButton = screen.getByText('Registrar');
    fireEvent.click(registerButton);
    expect(screen.getByText('Página de Registro')).toBeTruthy();
  });

  it('debe renderizar los botones de "Cerrar Sesion" y "Carrito" si el usuario está logueado', () => {
    spyOn(localStorage, 'getItem').and.returnValue('testuser'); // Usuario logueado
    render(
      <MemoryRouter>
        <LoginButtons />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText('Cerrar Sesion');
    const cartButton = screen.getByText('🛒 Carrito');

    expect(logoutButton).toBeTruthy();
    expect(cartButton).toBeTruthy();
    expect(screen.queryByText('Iniciar Sesion')).toBeNull();
    expect(screen.queryByText('Registrar')).toBeNull();
  });

  it('debe llamar a UserService.logout y navegar a "/login" al hacer click en "Cerrar Sesion"', () => {
    spyOn(localStorage, 'getItem').and.returnValue('testuser'); // Usuario logueado
    spyOn(UserService, 'logout'); // Espiar el método de logout

    render(
      <MemoryRouter initialEntries={['/']}>
        <LoginButtons />
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    const logoutButton = screen.getByText('Cerrar Sesion');
    fireEvent.click(logoutButton);

    expect(UserService.logout).toHaveBeenCalled();
    expect(screen.getByText('Página de Login')).toBeTruthy();
  });

  it('debe navegar a "/cart" al hacer click en el botón "Carrito"', () => {
    spyOn(localStorage, 'getItem').and.returnValue('testuser'); // Usuario logueado
    render(
      <MemoryRouter initialEntries={['/']}>
        <LoginButtons />
        <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    const cartButton = screen.getByText('🛒 Carrito');
    fireEvent.click(cartButton);
    expect(screen.getByText('Página de Carrito')).toBeTruthy();
  });
});
