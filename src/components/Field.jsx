export default function Field({ title, id, type, value, onChange }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{title}</label>
      <input type={type} value={value} onChange={onChange} id={id} />
    </div>
  );
}
