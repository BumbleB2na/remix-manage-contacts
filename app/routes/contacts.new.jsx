import { useOutletContext } from "@remix-run/react";
import ContactCreateEditForm from "~/components/contactCreateEditForm";

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
			<ContactCreateEditForm contacts={contacts} setContacts={setContacts} />
    </>
  );
}
