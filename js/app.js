const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const agregarCarrito = document.querySelectorAll('.agregar-carrito');
let carrito = [];

cargarEventListeners();
function cargarEventListeners(){
    
    document.addEventListener('DOMContentLoaded',()=>{
        JSON.parse(localStorage.getItem('carrito'))
    })
    agregarCarrito.forEach(curso=>curso.addEventListener('click', agregarCurso));
    
    vaciarCarrito.addEventListener('click', ()=>{
        carrito=[];
        limpiarCarrito()
    });

};

function agregarCurso(e){
    e.preventDefault();
    obtenerInfoCurso(e.target.parentElement.parentElement);
}

function obtenerInfoCurso(card){
    
    const info = {
        img: card.querySelector('img').src,
        titulo: card.querySelector('h4').textContent,
        precio: card.querySelector('p span').textContent,
        id: card.querySelector('a').dataset.id,
        cantidad: 1
    };

    const duplicado = carrito.some(curso => curso.id === info.id);

    if(duplicado){
        const cursos = carrito.map(curso =>{
            if(curso.id === info.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            };
        });
    } else {
        carrito.push(info);
    }
    
    setStorage('carrito', carrito);
    mostrarEnCarrito()
}

function setStorage (key, array) {
    localStorage.setItem(key,JSON.stringify(array));
}
function mostrarEnCarrito() {
    
    limpiarCarrito();
    
    carrito.forEach(curso=>{
        
        const row = document.createElement('tr');
        const { img , titulo , precio , cantidad , id } = curso;
        row.innerHTML =`
            <td>
                <img src="${img}">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" onclick="eliminarCurso(this)" data-id="${id}"> X </a>
            </td>`;

        listaCarrito.appendChild(row);
    
    })
    
};

function limpiarCarrito(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}

function eliminarCurso(e){
    carrito = carrito.filter(curso => curso.id !== e.dataset.id)
    setStorage('carrito', carrito)
    mostrarEnCarrito()
}