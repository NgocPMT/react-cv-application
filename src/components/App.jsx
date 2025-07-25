import { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [formIndex, setFormIndex] = useState(0);

  const fullName = firstName + " " + lastName;
  const formCounts = 2;
  const forms = ["Personal Details", "Education", "Experience"];
  const isFirst = formIndex === 0;
  const isLast = formIndex === formCounts;

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

  function handleResize() {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (mobile) {
      setIsPreviewOpen(false);
    } else {
      setIsPreviewOpen(true);
    }
  }

  function handlePrev() {
    if (formIndex > 0) {
      setFormIndex(formIndex - 1);
    }
  }

  function handleNext() {
    if (formIndex < formCounts) {
      setFormIndex(formIndex + 1);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="body-wrapper">
      <div className="form-container">
        <Form title={forms[0]} index={0} formIndex={formIndex}>
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
        </Form>
        <div className="buttons">
          {isMobile && (
            <button onClick={togglePreview} className="preview-btn">
              Preview
            </button>
          )}

          <div className="button-group">
            <div>
              <button
                disabled={isFirst}
                className={`${isFirst && "disabled"}`}
                onClick={handlePrev}
              >
                Previous
              </button>
              <p>{formIndex > 0 ? forms[formIndex - 1] : ""}</p>
            </div>
            <div>
              <button
                disabled={isLast}
                className={`${isLast && "disabled"}`}
                onClick={handleNext}
              >
                Next
              </button>
              <p>{formIndex < formCounts ? forms[formIndex + 1] : ""}</p>
            </div>
          </div>
        </div>
      </div>

      {isMobile && isPreviewOpen && <div className="preview-backdrop"></div>}
      {(!isMobile || isPreviewOpen) && (
        <div className="cv-preview">
          <h1 className="cv-full-name">{fullName}</h1>
          <p>Address: {address}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <h2>Education</h2>
          <h2>Experience</h2>
          {isMobile && <button onClick={togglePreview}>Close</button>}
        </div>
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

function Form({ title, index, formIndex, children }) {
  return (
    <section className={`form ${formIndex !== index && "hidden"}`}>
      <h2 className="form-title">{title}</h2>
      {children}
    </section>
  );
}
