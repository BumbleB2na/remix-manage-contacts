import type { MetaFunction } from "@remix-run/node";
import ContactsList from "~/components/contactsList";
import './../styles/App.css';

export const meta: MetaFunction = () => {
  return [
    { title: "Contacts" },
    { name: "description", content: "Manage your list of personal contacts" },
  ];
};

export default function Index() {
  return (
    <div className="wrapper">
      <h1>Contacts</h1>
			<ContactsList />
    </div>
  );
}
