import React from 'react';
import Filters from '../Filters/Filters';

const FiltersSection = ( {
     handleFilterChange,
     genres,
     segments,
     subGenres
} ) => {
     console.log('FiltersSection props: ', {
          handleFilterChange,
          genres,
          segments,
          subGenres
     });
     
     return (
          <>
               <Filters
                    onFilterChange={ handleFilterChange }
                    genres={ genres }
                    segments={ segments }
                    subGenres={ subGenres }
               />
          </>
     );
};
export default React.memo(FiltersSection);