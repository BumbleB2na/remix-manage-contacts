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
  firstName: z
    .string()
    .min(3, "Must be more than 2 characters")
    .max(25, "Must be less than 25 characters"),
  lastName: z
    .union([
      z
        .string()
        .min(2, "Must be more than 1 character")
        .max(30, "Must be less than 30 characters"),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  email: z.string().email("Invalid email address").max(200),
});

export default function ContactCreateEditForm({ contacts, setContacts }) {
  const [errors, setErrors] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params?.email) return;
    const contact = contacts.find((c) => c.email === params.email);
    if (!contact) {
      navigate("/contacts/main");
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
    navigate("/contacts/main");
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
          <input type="text" name="email" id="email" disabled={params.email} />
        </div>
        {errors.email && <div className="error">{errors.email.join(". ")}</div>}
      </p>
      <p>
        <div style={{ textAlign: "right" }}>
          <Link to="/contacts/main" style={{ marginRight: "10px" }}>
            <button>Cancel</button>
          </Link>
          <button type="submit">{params.email ? "Update" : "Add"}</button>
        </div>
      </p>
    </form>
  );
}
