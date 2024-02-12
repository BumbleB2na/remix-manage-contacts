import { Outlet, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function ContactsPage() {
	const [contacts, setContacts] = useState([{ email: 'john@example.com', firstName: "John", lastName: "Doe" }, { email: 'jane@example.com', firstName: "Jane", lastName: "Doe" }]);
  const navigate = useNavigate();

	useEffect(() => {
		navigate('/contacts/main', { replace: true })
		return;
	}, [navigate])

	return (
    <div className="wrapper">
			<Outlet context={[contacts, setContacts]} />
    </div>
	)
}