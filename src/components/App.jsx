import { useState } from "react";
import "../css/App.css";

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fullName = firstName + " " + lastName;

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handlePhone(e) {
    setPhone(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleAddress(e) {
    setAddress(e.target.value);
  }

  function handleCountry(e) {
    setCountry(e.target.value);
  }

  function handleCity(e) {
    setCity(e.target.value);
  }

  function togglePreview() {
    setIsPreviewOpen(!isPreviewOpen);
  }

  return (
    <div className="body-wrapper">
      <section className="form">
        <h2 className="form-title">Personal Details</h2>
        <FieldGroup>
          <Field
            title="First Name"
            type="text"
            id="first-name"
            value={firstName}
            onChange={handleFirstName}
          />
          <Field
            title="Last Name"
            type="text"
            id="last-name"
            value={lastName}
            onChange={handleLastName}
          />
        </FieldGroup>
        <FieldGroup>
          <Field
            title="Email"
            type="email"
            id="email"
            value={email}
            onChange={handleEmail}
          />
          <Field
            title="Phone"
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhone}
          />
        </FieldGroup>
        <Field
          title="Address"
          type="text"
          id="address"
          value={address}
          onChange={handleAddress}
        />
        <FieldGroup>
          <Field
            title="Country"
            type="text"
            id="country"
            value={country}
            onChange={handleCountry}
          />
          <Field
            title="City"
            type="text"
            id="city"
            value={city}
            onChange={handleCity}
          />
        </FieldGroup>
        <div className="buttons">
          <button onClick={togglePreview} className="preview-btn">
            Preview
          </button>
          <div className="button-group">
            <div>
              <button>Previous</button>
              <p></p>
            </div>
            <div>
              <button>Next</button>
              <p>Education</p>
            </div>
          </div>
        </div>
      </section>
      {isPreviewOpen && (
        <>
          <div className="preview-backdrop"></div>
          <div className="cv-preview">
            <p>{fullName}</p>
            <button onClick={togglePreview}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}

function Field({ title, id, type, value, onChange }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{title}</label>
      <input type={type} value={value} onChange={onChange} id={id} />
    </div>
  );
}

function FieldGroup({ children }) {
  return <div className="field-group">{children}</div>;
}
