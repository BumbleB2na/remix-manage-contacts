import { Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { z } from "zod";

import PropTypes from 'prop-types';

ContactCreateForm.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.shape({
			email: PropTypes.string.isRequired,
		})
	).isRequired,
	setContacts: PropTypes.func.isRequired,
};

const ContactFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

export default function ContactCreateForm({ contacts, setContacts }) {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    setErrors({});
    event.preventDefault();
    const formData = new FormData(event.target);
    let contact;
    try {
      contact = ContactFormSchema.parse(Object.fromEntries(formData));
    } catch (err) {
      const fieldErrors = err.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
		if(contacts.some(c => c.email === contact.email)) {
			setErrors({ email: ["Email already exists"] });
			return;
		}
    setContacts([contact, ...contacts]);
    event.target.reset();
		navigate("/contacts/list");
  };

  return (
    <form onSubmit={handleFormSubmit}>
			<fieldset style={{ display: 'inline-block' }}>
				<legend>Add Contact</legend>
				<div>
					<label htmlFor="firstName">First Name</label>
				</div>
				<div>
					<input type="text" name="firstName" id="firstName" />
				</div>
				{errors.firstName && (
					<div className="error">{errors.firstName.join(". ")}</div>
				)}
				<div>
					<label htmlFor="lastName">Last Name</label>
				</div>
				<div>
					<input type="text" name="lastName" id="lastName" />
				</div>
				{errors.lastName && (
					<div className="error">{errors.lastName.join(". ")}</div>
				)}
				<div>
					<label htmlFor="email">Email</label>
				</div>
				<div>
					<input type="email" name="email" id="email" />
				</div>
				{errors.email && <div className="error">{errors.email.join(". ")}</div>}
				<div>
					<button type="submit">Add</button>
					<Link to="/contacts/list">
						<button>Cancel</button>
					</Link>
				</div>
			</fieldset>
    </form>
  );
}
