import "../css/Experience.css";

export default function Experience({
  title,
  companyName,
  beginDate,
  endDate,
  details,
}) {
  return (
    <div className="experience">
      <p>
        {beginDate}
        {endDate && ` - ${endDate}`}
      </p>
      <div className="experience-details">
        <h3>{title}</h3>
        <p className="company-name">{companyName}</p>
        {details && (
          <ul>
            {details.map((detail, index) => (
              <li key={`${title}-${index}}`}>{detail}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
