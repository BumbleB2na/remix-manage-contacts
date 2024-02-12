import { useOutletContext } from "@remix-run/react";
import ContactsList from "~/components/contactsList";

export const meta = () => {
  return [
    { title: "Contacts" },
    { name: "description", content: "Manage your list of personal contacts" },
  ];
};

export default function ContactsPage() {
  const [contacts, setContacts] = useOutletContext();

	return (
    <>
      <h1>Main</h1>
			<ContactsList contacts={contacts} setContacts={setContacts} />
    </>
	)
}