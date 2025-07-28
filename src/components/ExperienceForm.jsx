import Field from "./Field";
import FieldGroup from "./FieldGroup";
import "../css/ExperienceForm.css";

export default function ExperienceForm({
  expIndex,
  title,
  companyName,
  beginDate,
  endDate,
  details,
  handleTitle,
  handleCompanyName,
  handleBeginDate,
  handleEndDate,
  handleDetails,
  createEmptyDetail,
  deleteTheLastDetail,
  deleteExperience,
  isShow,
  handleShowingExp,
}) {
  function toggleIsShow() {
    !isShow ? handleShowingExp(expIndex) : handleShowingExp(-1);
  }

  return (
    <div className="experience-form">
      <div className="experience-form-header">
        <p>{title ? title : `Experience ${expIndex + 1}`}</p>
        <div className="experience-form-buttons">
          <button onClick={toggleIsShow}>{isShow ? "Hide" : "Show"}</button>
          <button onClick={deleteExperience}>Delete</button>
        </div>
      </div>
      {isShow && (
        <div className="experience-form-content">
          <Field
            title="Job Title"
            type="text"
            id="exp-job-tittle"
            value={title}
            onChange={handleTitle}
          />
          <Field
            title="Company Name"
            type="text"
            id="company-name"
            value={companyName}
            onChange={handleCompanyName}
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
                    onChange={(e) => handleDetails(expIndex, index, e, "exp")}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
