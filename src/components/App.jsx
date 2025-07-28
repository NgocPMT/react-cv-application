import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../css/App.css";
import Field from "./Field";
import FieldGroup from "./FieldGroup";
import Education from "./Education";
import EducationForm from "./EducationForm";
import Experience from "./Experience";
import ExperienceForm from "./ExperienceForm";

export default function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [educations, setEducations] = useState([]);
  const [showingEdu, setShowingEdu] = useState(0);
  const [experiences, setExperiences] = useState([]);
  const [showingExp, setShowingExp] = useState(0);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const desktopBreakpoint = 1024;
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < desktopBreakpoint
  );
  const [formIndex, setFormIndex] = useState(0);

  const fullName = firstName + " " + lastName;
  const forms = ["Personal Details", "Education", "Experience"];
  const formCounts = forms.length;
  const isFirst = formIndex === 0;
  const isLast = formIndex === formCounts - 1;

  function handleShowingEdu(eduIndex) {
    setShowingEdu(eduIndex);
  }

  function handleShowingExp(expIndex) {
    setShowingExp(expIndex);
  }

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

  function handleTitle(index, e, section) {
    if (section === "edu") {
      setEducations(
        educations.map((education, i) =>
          i === index ? { ...education, title: e.target.value } : education
        )
      );
    } else {
      setExperiences(
        experiences.map((experience, i) =>
          i === index ? { ...experience, title: e.target.value } : experience
        )
      );
    }
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

  function handleCompanyName(expIndex, e) {
    setExperiences(
      experiences.map((experience, i) =>
        i === expIndex
          ? { ...experience, companyName: e.target.value }
          : experience
      )
    );
  }

  function handleBeginDate(index, e, section) {
    if (section === "edu") {
      setEducations(
        educations.map((education, i) =>
          i === index ? { ...education, beginDate: e.target.value } : education
        )
      );
    } else {
      setExperiences(
        experiences.map((experience, i) =>
          i === index
            ? { ...experience, beginDate: e.target.value }
            : experience
        )
      );
    }
  }

  function handleEndDate(index, e, section) {
    if (section === "edu") {
      setEducations(
        educations.map((education, i) =>
          i === index ? { ...education, endDate: e.target.value } : education
        )
      );
    } else {
      setExperiences(
        experiences.map((experience, i) =>
          i === index ? { ...experience, endDate: e.target.value } : experience
        )
      );
    }
  }

  function createEmptyDetail(index, section) {
    if (section === "edu") {
      const newDetails = educations[index].details
        ? [...educations[index].details, ""]
        : [""];
      setEducations(
        educations.map((education, i) =>
          i === index ? { ...education, details: newDetails } : education
        )
      );
    } else {
      const newDetails = experiences[index].details
        ? [...experiences[index].details, ""]
        : [""];
      setExperiences(
        experiences.map((experience, i) =>
          i === index ? { ...experience, details: newDetails } : experience
        )
      );
    }
  }

  function deleteTheLastDetail(index, section) {
    if (section === "edu") {
      if (!educations[index].details) {
        return;
      }
      const newDetails = [...educations[index].details];
      newDetails.pop();
      setEducations(
        educations.map((education, i) =>
          i === index ? { ...education, details: newDetails } : education
        )
      );
    } else {
      if (!experiences[index].details) {
        return;
      }
      const newDetails = [...experiences[index].details];
      newDetails.pop();
      setExperiences(
        experiences.map((experience, i) =>
          i === index ? { ...experience, details: newDetails } : experience
        )
      );
    }
  }

  function handleDetails(index, detailIndex, e, section) {
    if (section === "edu") {
      const newDetails = [...educations[index].details];
      newDetails[detailIndex] = e.target.value;
      setEducations(
        educations.map((education, i) =>
          i === index ? { ...education, details: newDetails } : education
        )
      );
    } else {
      const newDetails = [...experiences[index].details];
      newDetails[detailIndex] = e.target.value;
      setExperiences(
        experiences.map((experience, i) =>
          i === index ? { ...experience, details: newDetails } : experience
        )
      );
    }
  }

  function createEmptyEducation() {
    setEducations([...educations, { id: crypto.randomUUID() }]);
  }

  function deleteEducation(eduIndex) {
    if (!educations || educations.length === 0) {
      return;
    }
    setEducations(educations.filter((_, index) => index !== eduIndex));
  }

  function createEmptyExperience() {
    setExperiences([...experiences, { id: crypto.randomUUID() }]);
  }

  function deleteExperience(expIndex) {
    if (!experiences || experiences.length === 0) {
      return;
    }
    setExperiences(experiences.filter((_, index) => index !== expIndex));
  }

  function togglePreview() {
    setIsPreviewOpen(!isPreviewOpen);
  }

  function handleResize() {
    const mobile = window.innerWidth < desktopBreakpoint;
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
    if (formIndex < formCounts - 1) {
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
            <Field
              title="Job Title"
              type="text"
              id="job-title"
              value={jobTitle}
              onChange={handleJobTitle}
            />
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
            <div className="form-action-buttons">
              <button onClick={createEmptyEducation}>Add New</button>
            </div>

            {educations && educations.length > 0 ? (
              educations.map((education, eduIndex) => (
                <EducationForm
                  key={`form-${education.id}`}
                  eduIndex={eduIndex}
                  {...education}
                  handleTitle={(e) => handleTitle(eduIndex, e, "edu")}
                  handleSchoolName={(e) => handleSchoolName(eduIndex, e)}
                  handleBeginDate={(e) => handleBeginDate(eduIndex, e, "edu")}
                  handleEndDate={(e) => handleEndDate(eduIndex, e, "edu")}
                  handleDetails={handleDetails}
                  createEmptyDetail={() => createEmptyDetail(eduIndex, "edu")}
                  deleteTheLastDetail={() =>
                    deleteTheLastDetail(eduIndex, "edu")
                  }
                  deleteEducation={() => deleteEducation(eduIndex)}
                  isShow={showingEdu === eduIndex}
                  handleShowingEdu={handleShowingEdu}
                />
              ))
            ) : (
              <p className="message-empty">There is no qualifications yet...</p>
            )}
          </Form>
          <Form title={forms[2]} index={2} formIndex={formIndex}>
            <div className="form-action-buttons">
              <button onClick={createEmptyExperience}>Add New</button>
            </div>

            {experiences && experiences.length > 0 ? (
              experiences.map((experience, expIndex) => (
                <ExperienceForm
                  key={`form-${experience.id}`}
                  expIndex={expIndex}
                  {...experience}
                  handleTitle={(e) => handleTitle(expIndex, e, "exp")}
                  handleCompanyName={(e) => handleCompanyName(expIndex, e)}
                  handleBeginDate={(e) => handleBeginDate(expIndex, e, "exp")}
                  handleEndDate={(e) => handleEndDate(expIndex, e, "exp")}
                  handleDetails={handleDetails}
                  createEmptyDetail={() => createEmptyDetail(expIndex, "exp")}
                  deleteTheLastDetail={() =>
                    deleteTheLastDetail(expIndex, "exp")
                  }
                  deleteExperience={() => deleteExperience(expIndex)}
                  isShow={showingExp === expIndex}
                  handleShowingExp={handleShowingExp}
                />
              ))
            ) : (
              <p className="message-empty">There is no experiences yet...</p>
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
                <p>{formIndex < formCounts - 1 ? forms[formIndex + 1] : ""}</p>
              </div>
            </div>
          </div>
        </div>

        {isMobile && isPreviewOpen && (
          <button
            className="preview-backdrop"
            onClick={togglePreview}
            aria-label="Close preview"
          ></button>
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
                {experiences &&
                  experiences.length > 0 &&
                  experiences.map((experience) => (
                    <Experience key={experience.id} {...experience} />
                  ))}

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
