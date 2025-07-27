import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../css/App.css";
import Field from "./Field";
import FieldGroup from "./FieldGroup";
import Education from "./Education";
import EducationForm from "./EducationForm";
import Experience from "./Experience";

export default function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [educations, setEducations] = useState([]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [formIndex, setFormIndex] = useState(0);

  const fullName = firstName + " " + lastName;
  const formCounts = 2;
  const forms = ["Personal Details", "Education", "Experience"];
  const isFirst = formIndex === 0;
  const isLast = formIndex === formCounts;

  function handleJobTitle(e) {
    setJobTitle(e.target.value);
  }

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

  function handleCountry(e) {
    setCountry(e.target.value);
  }

  function handleCity(e) {
    setCity(e.target.value);
  }

  function handleTitle(eduIndex, e) {
    setEducations(
      educations.map((education, i) =>
        i === eduIndex ? { ...education, title: e.target.value } : education
      )
    );
  }

  function handleSchoolName(eduIndex, e) {
    setEducations(
      educations.map((education, i) =>
        i === eduIndex
          ? { ...education, schoolName: e.target.value }
          : education
      )
    );
  }

  function handleBeginDate(eduIndex, e) {
    setEducations(
      educations.map((education, i) =>
        i === eduIndex ? { ...education, beginDate: e.target.value } : education
      )
    );
  }

  function handleEndDate(eduIndex, e) {
    setEducations(
      educations.map((education, i) =>
        i === eduIndex ? { ...education, endDate: e.target.value } : education
      )
    );
  }

  function createEmptyDetail(eduIndex) {
    const newDetails = educations[eduIndex].details
      ? [...educations[eduIndex].details, ""]
      : [""];
    setEducations(
      educations.map((education, i) =>
        i === eduIndex ? { ...education, details: newDetails } : education
      )
    );
  }

  function deleteTheLastDetail(eduIndex) {
    if (!educations[eduIndex].details) {
      return;
    }
    const newDetails = [...educations[eduIndex].details];
    newDetails.pop();
    setEducations(
      educations.map((education, i) =>
        i === eduIndex ? { ...education, details: newDetails } : education
      )
    );
  }

  function handleDetails(eduIndex, detailIndex, e) {
    const newDetails = [...educations[eduIndex].details];
    newDetails[detailIndex] = e.target.value;
    setEducations(
      educations.map((education, i) =>
        i === eduIndex ? { ...education, details: newDetails } : education
      )
    );
  }

  function createEmptyEducation() {
    setEducations([...educations, { id: crypto.randomUUID() }]);
  }

  function deleteEducation(eduIndex) {
    setEducations(educations.filter((_, index) => index !== eduIndex));
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
    <>
      <Navbar />
      <div className="body-wrapper">
        <div className="form-container">
          <Form title={forms[0]} index={0} formIndex={formIndex}>
            <Field
              title="Job Title"
              type="text"
              id="job-title"
              value={jobTitle}
              onChange={handleJobTitle}
            />
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
          <Form title={forms[1]} index={1} formIndex={formIndex}>
            <div className="educations-action-buttons">
              <button onClick={createEmptyEducation}>Add New</button>
            </div>

            {educations && educations.length > 0 ? (
              educations.map((education, eduIndex) => (
                <EducationForm
                  key={`form-${education.id}`}
                  eduIndex={eduIndex}
                  {...education}
                  handleTitle={(e) => handleTitle(eduIndex, e)}
                  handleSchoolName={(e) => handleSchoolName(eduIndex, e)}
                  handleBeginDate={(e) => handleBeginDate(eduIndex, e)}
                  handleEndDate={(e) => handleEndDate(eduIndex, e)}
                  handleDetails={handleDetails}
                  createEmptyDetail={() => createEmptyDetail(eduIndex)}
                  deleteTheLastDetail={() => deleteTheLastDetail(eduIndex)}
                  deleteEducation={() => deleteEducation(eduIndex)}
                />
              ))
            ) : (
              <p className="message-empty">There is no qualifications yet...</p>
            )}
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

        {isMobile && isPreviewOpen && (
          <div
            className="preview-backdrop"
            onClick={togglePreview}
            role="button"
            aria-label="Close preview"
            tabIndex={0}
          ></div>
        )}
        {(!isMobile || isPreviewOpen) && (
          <>
            <div className="cv-preview">
              <div className="cv-header">
                <h1 className="cv-full-name">
                  {fullName.trim().length > 0 ? fullName : "Your Name Here"}
                </h1>
                <p className="cv-job-title">{jobTitle || "Your job title"}</p>
              </div>
              <div className="cv-main">
                <h2>Experience</h2>
                <Experience />
                <h2>Education</h2>
                {educations &&
                  educations.length > 0 &&
                  educations.map((education) => (
                    <Education key={education.id} {...education} />
                  ))}
              </div>
              <div className="personal-info">
                <p>
                  Address: {country}
                  {city && `, ${city}`}
                </p>
                <p>Phone: {phone}</p>
                <p>Email: {email}</p>
              </div>
            </div>
            {isMobile && <button onClick={togglePreview}>Close</button>}
          </>
        )}
      </div>
    </>
  );
}

function Form({ title, index, formIndex, children }) {
  return (
    <section className={`form${formIndex !== index ? " hidden" : ""}`}>
      <h2 className="form-title">{title}</h2>
      {children}
    </section>
  );
}
