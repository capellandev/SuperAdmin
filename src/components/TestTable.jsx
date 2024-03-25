import React, { useState, useEffect } from 'react';

function ClientList() {
	const [clients, setClients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchClients();
	}, []);

	async function fetchClients() {
		setLoading(true); // Asegúrate de establecer loading a true cuando comience la carga
		try {
			const response = await fetch('/api/clients');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			if (!Array.isArray(result.clients)) {
				throw new Error('Data is not an array');
			}
			setClients(result.clients);
		} catch (error) {
			console.error("Could not fetch clients: ", error);
			setError(error.toString());
		}
		setLoading(false); // Establece loading a false independientemente del resultado
	}

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h1>Lista de Clientes</h1>
			<button onClick={fetchClients}>Recargar Datos</button> {/* Corregido para llamar a fetchClients */}
			<table>
				<thead>
				<tr>
					<th>Nombre</th>
					<th>Teléfono</th>
					<th>Email</th>
					<th>Estado</th>
					<th>Notas</th>
					<th>Perfil</th>
				</tr>
				</thead>
				<tbody>
				{clients.map((client, index) => (
					<tr key={index}>
						<td>{client.name}</td>
						<td>{client.tel}</td>
						<td>{client.email}</td>
						<td>{client.notes}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}

export default ClientList;
