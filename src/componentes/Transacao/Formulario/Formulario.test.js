import { render, screen } from '@testing-library/react';
import Formulario from './index';
import userEvent from '@testing-library/user-event';

describe('Deve renderizar um campo de input', () => {
  test('no documento', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    expect(campoTexto).toBeInTheDocument();
  });

  test(' com o type number', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    expect(campoTexto).toHaveAttribute('type', 'number');
  });

  test(' que pode ser preenchido', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    userEvent.type(campoTexto, '50');
    expect(campoTexto).toHaveValue(50);
  });
});

test('Deve chamar um evento do onSubmit ao clicar em realizar transação', () => {
  const realizarTransacao = jest.fn();

  render(<Formulario realizarTransacao={realizarTransacao} />);

  const botao = screen.getByRole('button');

  userEvent.click(botao);
  expect(realizarTransacao).toHaveBeenCalledTimes(1);
});

test('Deve selecionar uma opção de transação', () => {
  render(<Formulario />);
  userEvent.selectOptions(screen.getByTestId('select-opcoes'), ['Depósito']);

  expect(
    screen.getByRole('option', { name: 'Selecione um tipo de transação' })
      .selected
  ).toBe(false);
  expect(screen.getByRole('option', { name: 'Depósito' }).selected).toBe(true);
});
