import { Link, useNavigate, useOutletContext } from "@remix-run/react";

export default function ContactsList() {
  const [contacts, setContacts] = useOutletContext();
	const navigate = useNavigate();

	const handleEditContact = (contact) => {
		navigate(`/contacts/${contact.email}`);
	}

	const handleRemoveContact = (contact) => {
		if (!confirm(`Are you sure you want to remove ${contact.firstName} ${contact.lastName}?`))
			return;
		setContacts((prevContacts) => prevContacts.filter((c) => c.email !== contact.email));	
	}

	return (
		<table cellPadding={10} cellSpacing={0}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th></th>
					<th style={{ textAlign: 'right' }}><Link to='/contacts/new'><button>Add</button></Link></th>
				</tr>
			</thead>
			<tbody>
				{contacts.map((contact) => (
					<tr key={contact.email}>
						<td>{contact.firstName} {contact.lastName}</td>
						<td>{contact.email}</td>
						<td><button onClick={() => handleEditContact(contact)}>Edit</button></td>
						<td><button onClick={() => handleRemoveContact(contact)}>Remove</button></td>
					</tr>
				))}
			</tbody>
		</table>
	);
}