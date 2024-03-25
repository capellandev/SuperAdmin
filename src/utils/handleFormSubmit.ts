export async function handleFormSubmit(event: Event, endpoint: string, transformData?: (data: any) => any) {
	event.preventDefault();
	const form = event.target as HTMLFormElement; // Asegura que event.target es un elemento de formulario

	let formData = new FormData(form);
	let formObject = Object.fromEntries(formData.entries());

	// Transforma el objeto del formulario si se proporcionó una función de transformación
	if (transformData) {
		formObject = transformData(formObject);
	}

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formObject)
		});

		if (response.ok) {
			form.reset(); // Resetea el formulario
			alert('Operación realizada con éxito.');
		} else {
			const error = await response.json();
			alert('Error al enviar el formulario: ' + error.message);
		}
	} catch (error) {
		console.error('Error al enviar el formulario:', error);
		alert('Error al enviar el formulario: ' + error.message);
	}
}
