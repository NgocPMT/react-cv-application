import Field from "./Field";
import FieldGroup from "./FieldGroup";
import "../css/EducationForm.css";

export default function EducationForm({
  eduIndex,
  title,
  schoolName,
  beginDate,
  endDate,
  details,
  handleTitle,
  handleSchoolName,
  handleBeginDate,
  handleEndDate,
  handleDetails,
  createEmptyDetail,
  deleteTheLastDetail,
  deleteEducation,
  isShow,
  handleShowingEdu,
}) {
  function toggleIsShow() {
    !isShow ? handleShowingEdu(eduIndex) : handleShowingEdu(-1);
  }

  return (
    <div className="education-form">
      <div className="education-form-header">
        <p>{title ? title : `Education ${eduIndex + 1}`}</p>
        <div className="education-form-buttons">
          <button onClick={toggleIsShow}>{isShow ? "Hide" : "Show"}</button>
          <button onClick={deleteEducation}>Delete</button>
        </div>
      </div>
      {isShow && (
        <div className="education-form-content">
          <Field
            title="Title"
            type="text"
            id="title"
            value={title}
            onChange={handleTitle}
          />
          <Field
            title="School Name"
            type="text"
            id="school-name"
            value={schoolName}
            onChange={handleSchoolName}
          />
          <FieldGroup>
            <Field
              title="Begin Date"
              type="text"
              id="begin-date"
              value={beginDate}
              onChange={handleBeginDate}
            />
            <Field
              title="End Date"
              type="text"
              id="end-date"
              value={endDate}
              onChange={handleEndDate}
            />
          </FieldGroup>
          <div className="detail-section">
            <div className="detail-section-header">
              <p>Details</p>
              <div className="detail-section-buttons">
                <button onClick={createEmptyDetail} className="add-detail-btn">
                  Add
                </button>
                <button
                  onClick={deleteTheLastDetail}
                  className="delete-detail-btn"
                >
                  Remove Last
                </button>
              </div>
            </div>
            <div className="details">
              {details &&
                details.map((detail, index) => (
                  <Field
                    key={`${title}-field-${index}`}
                    title={`Detail ${index + 1}`}
                    type="text"
                    id={`detail-${index + 1}`}
                    value={detail}
                    onChange={(e) => handleDetails(eduIndex, index, e, "edu")}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
