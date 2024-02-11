import type { MetaFunction } from "@remix-run/node";
import ContactsList from "~/components/contacts/contactsList";

export const meta: MetaFunction = () => {
  return [
    { title: "Contacts" },
    { name: "description", content: "Manage your list of personal contacts" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Contacts</h1>
			<ContactsList />
    </div>
  );
}
