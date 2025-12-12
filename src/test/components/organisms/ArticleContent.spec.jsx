import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ArticleContent from '../../../components/organisms/ArticleContent';

describe('ArticleContent Component', () => {
  afterEach(cleanup);

  const testProps = {
    author: 'Autor de Prueba',
    date: '11 de Diciembre de 2025',
    paragraphs: [
      'Este es el primer párrafo del artículo de prueba.',
      'Y este es el segundo párrafo, para probar múltiples párrafos.',
      'Un tercer párrafo para asegurar el mapeo correcto.',
    ],
  };

  it('debe renderizar el autor y la fecha correctamente', () => {
    render(<ArticleContent {...testProps} />);
    expect(screen.getByText(`Redactado por ${testProps.author}, el ${testProps.date}`)).toBeTruthy();
  });

  it('debe renderizar cada párrafo proporcionado', () => {
    render(<ArticleContent {...testProps} />);
    testProps.paragraphs.forEach(p => {
      expect(screen.getByText(p)).toBeTruthy();
      const paragraphElement = screen.getByText(p);
      expect(paragraphElement.tagName).toBe('P');
      expect(paragraphElement.className).toContain('parrafo-noticia');
    });
  });

  it('debe aplicar las clases CSS correctas a los elementos principales', () => {
    const { container } = render(<ArticleContent {...testProps} />);
    
    // Verifica el contenedor principal (div.container)
    expect(container.firstChild.className).toContain('container');
    expect(container.firstChild.className).toContain('my-5');

    // Verifica el div de la fila
    const rowDiv = container.querySelector('.row.justify-content-center');
    expect(rowDiv).toBeTruthy();

    // Verifica el div de la columna
    const colDiv = container.querySelector('.col-md-10.col-lg-8');
    expect(colDiv).toBeTruthy();

    // Verifica la meta-información
    const metaText = screen.getByText(`Redactado por ${testProps.author}, el ${testProps.date}`);
    expect(metaText.className).toContain('meta-noticia');
    expect(metaText.className).toContain('text-sm');
  });

  it('debe manejar un array de párrafos vacío sin errores', () => {
    const { container } = render(<ArticleContent author="Test" date="Test" paragraphs={[]} />);
    // Solo debería renderizar el meta texto, no párrafos
    expect(screen.getByText('Redactado por Test, el Test')).toBeTruthy();
    expect(container.querySelectorAll('.parrafo-noticia').length).toBe(0);
  });
});
