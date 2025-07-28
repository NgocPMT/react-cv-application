import "../css/Education.css";

export default function Education({
  beginDate,
  endDate,
  title,
  schoolName,
  details,
}) {
  return (
    <div className="education">
      <p>
        {beginDate}
        {endDate && ` - ${endDate}`}
      </p>
      <div className="education-details">
        <h3>
          {title}
          {schoolName && `, ${schoolName}`}
        </h3>
        {details && (
          <ul>
            {details.map((detail, index) => (
              <li key={`${title}-${index}`}>{detail}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
