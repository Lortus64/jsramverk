import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from './App';

test('Open file popup', async () => {
  const { container } = await render(<App />);

  const hoverElement = screen.getByText("File");

  fireEvent.mouseOver(hoverElement);
  await waitFor(() => screen.getByTestId('dropdown-content'));
  const buttonElement = screen.getByText("Open File");

  expect( buttonElement ).toBeInTheDocument();
  fireEvent.click(buttonElement);


  await waitFor(() => screen.getByRole('dialog'));
  const popupElement = screen.getByRole('dialog');
  expect( popupElement ).toBeInTheDocument();
});

test('Open save popup', async () => {
	const { container } = await render(<App />);
  
	const hoverElement = screen.getByText("File");
  
	fireEvent.mouseOver(hoverElement);
	await waitFor(() => screen.getByTestId('dropdown-content'));
	const buttonElement = screen.getByText("Create File");
  
	expect( buttonElement ).toBeInTheDocument();
	fireEvent.click(buttonElement);
  
  
	await waitFor(() => screen.getByRole('dialog'));
	const popupElement = screen.getByTestId('form-text');
	expect( popupElement ).toBeInTheDocument();
  });
