import '../css/CreatingOrder.css';

const InputField = ({ label, id, value, onChange }) => {
  return (
    <div className='input-container'>
      <label htmlFor={id}>{label}</label>
      <input
        type='text'
        className='form-control'
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;