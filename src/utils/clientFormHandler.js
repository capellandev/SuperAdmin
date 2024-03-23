export async function handleFormSubmit(event) {
	event.preventDefault();
	const form = event.target; // Obtiene una referencia al formulario

	const formData = new FormData(form);
	const formObject = Object.fromEntries(formData.entries());
	formObject.status = formData.get('status') === 'true';

	try {
		const response = await fetch("/api/clients", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formObject)
		});

		if (response.ok) {
			if (form) {
				form.reset(); // Resetea el formulario
			}
			alert('Cliente insertado con éxito');
		} else {
			const error = await response.json();
			alert('Error al enviar el formulario: ' + error.message);
		}
	} catch (error) {
		alert('Error al enviar el formulario: ' + error.message);
	}
}
