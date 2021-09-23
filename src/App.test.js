// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('Should render input ', async () => {
//   const { container } = await render(<App />);

//   const inputElement = screen.getByRole("textbox")
// });

import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';

test( 'renders the <CKEditor> component', () => {
	const { container } = render( <App/> );
	const editorWrapper = container.querySelector( '.ckeditor-component' );

	expect( editorWrapper ).toBeInTheDocument();
  const inputElement = screen.getByRole("textbox");
  expect( inputElement ).toBeInTheDocument();
	// expect( editorWrapper.getAttribute( 'data-ckeditor-class-name' ) ).toEqual( 'VirtualTestEditor' );
} );