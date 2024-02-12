import { useOutletContext } from "@remix-run/react";
import ContactCreateEditForm from "~/components/contactCreateEditForm";

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
      <ContactCreateEditForm contacts={contacts} setContacts={setContacts} />
    </>
  );
}
