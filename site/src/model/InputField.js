import '../css/CreatingOrder.css';

const InputField = ({ label, id, value, onChange,style }) => {
  return (
    <div className='input-container' style={style} >
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