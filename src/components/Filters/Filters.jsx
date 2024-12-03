// Filters.jsx
import React, { useState } from 'react';
import './Filters.css';
import SelectFilter from '../SelectFilter/SelectFilter';

const Filters = ( { onFilterChange, genres, segments, subGenres } ) => {
     console.log("Filters Render");
     
     const [ name, setName ] = useState( '' );
     const [ date, setDate ] = useState( '' );
     const [ genre, setGenre ] = useState( '' );
     const [ segment, setSegment ] = useState( '' );
     const [ subGenre, setSubGenre ] = useState( '' );

     const resetFilters = () => {
          setName( '' );
          setDate( '' );
          setGenre( '' );
          setSegment( '' );
          setSubGenre( '' );
          
     };

     const handleSearchClick = () => {
          onFilterChange( { name, date, genre, segment, subGenre } );
          resetFilters();
     };

     return (
          <div className="filters-container">
               <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={ name }
                    onChange={ ( e ) => setName( e.target.value ) }
               />
               <input
                    type="date"
                    value={ date }
                    onChange={ ( e ) => setDate( e.target.value ) }
               />
               <SelectFilter
                    options={ genres.filter( Boolean ) }
                    selectedValue={ genre }
                    onChange={ setGenre }
                    label="Género"
               />
               <SelectFilter
                    options={ segments }
                    selectedValue={ segment }
                    onChange={ setSegment }
                    label="Segmento"
               />
               <SelectFilter
                    options={ subGenres }
                    selectedValue={ subGenre }
                    onChange={ setSubGenre }
                    label="Subgénero"
               />
               <button className='search' onClick={ handleSearchClick }>Buscar</button>
          </div>
     );
};

export default Filters;