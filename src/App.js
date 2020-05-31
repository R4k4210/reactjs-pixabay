import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
  //state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  //creamos los state del paginador
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    if(busqueda === '') return;
      const callAPI = async () => {
        const imagenesPorPagina = 28;
        const key = '16816097-b75ceda3fb7007d6cf31a687a';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

        const resultado = await fetch(url);
        const respuesta = await resultado.json();
        
        guardarImagenes(respuesta.hits);

        //calculamos total de paginas
        const calcularTotalPaginas = Math.ceil(resultado.totalHists / imagenesPorPagina);
        guardarTotalPaginas(calcularTotalPaginas);

        //scroll up´
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior: 'smooth'});
        
      }    
      callAPI();

  }, [busqueda, paginaactual])

  // definir pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if(nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }
  //definir pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if(nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>

        <Formulario
          guardarBusqueda={guardarBusqueda}
          guardarPaginaActual={guardarPaginaActual}
        />

      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        <div className="mb-5">
          {(paginaactual === 1) ? null : 
            <button 
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
            >&laquo; Anterior</button>
          }

          {(paginaactual === totalpaginas) ? null :
            <button 
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
