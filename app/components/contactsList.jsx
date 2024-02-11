import { useState } from "react";

export default function ContactsList() {
	const [contacts, setContacts] = useState([{ email: 'john@example.com', name: "John Doe" }, { email: 'jane@example.com', name: "Jane Doe" }]);

	const handleRemoveContact = (contact) => {
		if (!confirm(`Are you sure you want to remove ${contact.name}?`))
			return;
		setContacts((prevContacts) => prevContacts.filter((c) => c.email !== contact.email));	
	}

	return (
		<table cellPadding={10} cellSpacing={0}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				{contacts.map((contact) => (
					<tr key={contact.email}>
						<td>{contact.name}</td>
						<td>{contact.email}</td>
						<td><button onClick={() => handleRemoveContact(contact)}>Remove</button></td>
					</tr>
				))}
			</tbody>
		</table>
	);
}