document.addEventListener('DOMContentLoaded', function() {
    const filtroBusqueda = document.getElementById('filtro-busqueda');
    const borrarBusqueda = document.getElementById('borrar-busqueda');
    const filtroRareza = document.querySelectorAll('.filtro-rareza');
    const filtroElemento = document.querySelectorAll('.filtro-elemento');
    const filtroVia = document.querySelectorAll('.filtro-via');
    const contadorResultados = document.getElementById('contador-resultados');
    const resetFiltros = document.getElementById('reset-filtros');
    const personajes = document.querySelectorAll('.personaje');

    let filtroActual = {
        busqueda: '',
        rareza: '*',
        elemento: '*',
        via: '*'
    };

    function actualizarResultados() {
        let count = 0;

        personajes.forEach(personaje => {
            const nombre = personaje.querySelector('h3').textContent.toLowerCase();
            const rareza = personaje.getAttribute('data-rareza');
            const elemento = personaje.getAttribute('data-elemento');
            const via = personaje.getAttribute('data-via');

            const coincideBusqueda = nombre.includes(filtroActual.busqueda);
            const coincideRareza = filtroActual.rareza === '*' || filtroActual.rareza === rareza;
            const coincideElemento = filtroActual.elemento === '*' || filtroActual.elemento === elemento;
            const coincideVia = filtroActual.via === '*' || filtroActual.via === via;

            if (coincideBusqueda && coincideRareza && coincideElemento && coincideVia) {
                personaje.style.display = 'block';
                count++;
            } else {
                personaje.style.display = 'none';
            }
        });

        contadorResultados.textContent = `Mostrando ${count} personajes`;
    }

    filtroBusqueda.addEventListener('input', function() {
        filtroActual.busqueda = filtroBusqueda.value.toLowerCase();
        actualizarResultados();
    });

    borrarBusqueda.addEventListener('click', function() {
        filtroBusqueda.value = '';
        filtroActual.busqueda = '';
        actualizarResultados();
    });

    function activarFiltro(grupo, tipo, valor) {
        grupo.forEach(boton => boton.classList.remove('active'));
        grupo.find(boton => boton.getAttribute(`data-${tipo}`) === valor).classList.add('active');
        filtroActual[tipo] = valor;
        actualizarResultados();
    }

    filtroRareza.forEach(boton => {
        boton.addEventListener('click', function() {
            activarFiltro([...filtroRareza], 'rareza', boton.getAttribute('data-rareza'));
        });
    });

    filtroElemento.forEach(boton => {
        boton.addEventListener('click', function() {
            activarFiltro([...filtroElemento], 'elemento', boton.getAttribute('data-elemento'));
        });
    });

    filtroVia.forEach(boton => {
        boton.addEventListener('click', function() {
            activarFiltro([...filtroVia], 'via', boton.getAttribute('data-via'));
        });
    });

    resetFiltros.addEventListener('click', function() {
        filtroBusqueda.value = '';
        filtroActual = { busqueda: '', rareza: '*', elemento: '*', via: '*' };
        document.querySelectorAll('.active').forEach(boton => boton.classList.remove('active'));
        filtroRareza[0].classList.add('active');
        filtroElemento[0].classList.add('active');
        filtroVia[0].classList.add('active');
        actualizarResultados();
    });

    actualizarResultados();
});
