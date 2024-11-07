// SelectFilter.jsx
import React from 'react';

const SelectFilter = ({ options, selectedValue, onChange, label }) => {
    //  console.log(options);
     
  return (
    <div className="select-filter">
      <label>{label}</label>
      <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
        <option value="">Todos</option> {/* Opción para limpiar el filtro */}
        {options.map((option, index) => (
          <option key={index} value={option || ''}>
            {option || 'Desconocido'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
