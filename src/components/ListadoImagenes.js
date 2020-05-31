import React from 'react';
import Imagen from './Imagen';

const ListadoImagenes = ({imagenes}) => {
    
    if(Object.keys(imagenes).length === 0) return null;

    return ( 
        <div className="col-12 p-5 row">
            {imagenes.map(imagen => (
                <Imagen 
                    key={imagen.id}
                    imagen={imagen}
                />
            ))}
        </div>
     );
}
 
export default ListadoImagenes;