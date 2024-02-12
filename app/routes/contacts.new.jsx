import { useOutletContext } from "@remix-run/react";
import ContactCreateForm from "~/components/contactCreateForm";

export const meta = () => {
  return [
    { title: "New Contact" },
    { name: "description", content: "Add to your list of personal contacts" },
  ];
};

export default function ContactsNewPage() {
  const [contacts, setContacts] = useOutletContext();

  return (
    <>
      <h1>Add Contact</h1>
			<ContactCreateForm contacts={contacts} setContacts={setContacts} />
    </>
  );
}
