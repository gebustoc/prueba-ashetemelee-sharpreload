import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Wrapper from '../../../components/atoms/Wrapper'; 
import Text from '../../../components/atoms/Text';

describe('Wrapper Component', () => {
  afterEach(cleanup);

  it('debe renderizar sus hijos (children) correctamente', () => {
    const childText = 'Este es un texto hijo';
    render(
      <Wrapper>
        <Text>{childText}</Text>
      </Wrapper>
    );
    const childElement = screen.queryByText(childText);
    expect(childElement).toBeTruthy();
  });

  it('debe tener la clase "wrapper" y ser un div', () => {
    const childText = 'hijo';
    render(<Wrapper><p>{childText}</p></Wrapper>);

    const child = screen.getByText(childText);
    const wrapperElement = child.parentElement;

    expect(wrapperElement.className).toContain('wrapper');
    expect(wrapperElement.tagName).toBe('DIV'); 
  });
});
