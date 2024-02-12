import { useOutletContext } from "@remix-run/react";
import ContactEditForm from "~/components/contactEditForm";

export const meta = () => {
  return [
    { title: "Edit Contact" },
    { name: "description", content: "Edit a personal contact" },
  ];
};

export default function ContactsNewPage() {
  const [contacts, setContacts] = useOutletContext();

  return (
    <>
      <h1>Edit Contact</h1>
			<ContactEditForm contacts={contacts} setContacts={setContacts} />
    </>
  );
}
