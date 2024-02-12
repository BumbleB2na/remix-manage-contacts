import { Link, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import PropTypes from "prop-types";

ContactCreateEditForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  setContacts: PropTypes.func.isRequired,
};

const ContactFormSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email().max(200),
});

export default function ContactCreateEditForm({ contacts, setContacts }) {
  const [errors, setErrors] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params?.email) return;
    const contact = contacts.find((c) => c.email === params.email);
    if (!contact) {
      navigate("/contacts/list");
      return;
    }
    const form = document.querySelector("form");
    form.firstName.value = contact.firstName;
    form.lastName.value = contact.lastName;
    form.email.value = contact.email;
  }, [params, contacts, navigate]);

  const handleFormSubmit = (event) => {
    setErrors({});
    event.preventDefault();
    const isEdit = params.email;
    const fields = isEdit
      ? {
          ...Object.fromEntries(new FormData(event.target)),
          email: params.email,
        }
      : Object.fromEntries(new FormData(event.target));

    let contact;
    try {
      contact = ContactFormSchema.parse(fields);
    } catch (err) {
      const fieldErrors = err.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    if (isEdit) {
      setContacts(
        contacts
          .map((c) => (c.email === params.email ? contact : c))
          .sort((a, b) => a.firstName.localeCompare(b.firstName))
      );
    } else {
      if (contacts.some((c) => c.email === contact.email)) {
        setErrors({ ...errors, email: ["Email already exists"] });
        return;
      }
      setContacts(
        [contact, ...contacts].sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        )
      );
    }
    event.target.reset();
    navigate("/contacts/list");
  };

  return (
    <form className="rounded-border" onSubmit={handleFormSubmit}>
      <p>
        <div>
          <label htmlFor="firstName">First Name</label>
        </div>
        <div>
          <input type="text" name="firstName" id="firstName" />
        </div>
        {errors.firstName && (
          <div className="error">{errors.firstName.join(". ")}</div>
        )}
      </p>
      <p>
        <div>
          <label htmlFor="lastName">Last Name</label>
        </div>
        <div>
          <input type="text" name="lastName" id="lastName" />
        </div>
        {errors.lastName && (
          <div className="error">{errors.lastName.join(". ")}</div>
        )}
      </p>
      <p>
        <div>
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input type="email" name="email" id="email" disabled={params.email} />
        </div>
        {errors.email && <div className="error">{errors.email.join(". ")}</div>}
      </p>
      <p>
        <div>
          <button type="submit">{ params.email ? 'Update' : 'Add' }</button>
          <Link to="/contacts/list" style={{ marginLeft: "10px" }}>
            <button>Cancel</button>
          </Link>
        </div>
      </p>
    </form>
  );
}
