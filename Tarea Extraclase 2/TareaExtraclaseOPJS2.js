/*
Tarea Extraclase 2 de Optativa JavaScript
Autores:
Melani Sosa
Armando Joel Curra

Enunciado 11:
Sistema de Pedidos de Restaurante
*/        
         
class PedidoBase {
    constructor(cliente, fecha){
        this.cliente = cliente;
        this.fecha = fecha;
        }
    }       

class Pedido extends PedidoBase {
    constructor(cliente, fecha, plato, cantidad){
        super(cliente, fecha);
    this.plato = plato;
    this.cantidad = cantidad;
    }
}

let listaDePedidos = [];

function realizarPedido(cliente, plato, cantidad){
    return new Promise((resolve, reject) => {
        if (!cliente || !plato || !Number.isInteger(cantidad)) {
            reject("Datos del pedido incorrectos.");
        } else {
            let fecha = new Date();

            const pedido = new Pedido(cliente, fecha, plato, cantidad);
            listaDePedidos.push(pedido);
            resolve("Pedido realizado con éxito.");
        }
    });
}

function cancelarPedido(indice){
    return new Promise((resolve, reject) => {
        if(indice >= 0 && indice < listaDePedidos.length){
            listaDePedidos.splice(indice, 1);
            resolve("Pedido eliminado con éxito.");
        } else {
            reject("Número de pedido incorrecto.");
        }
    });
}

function mostrarPedidos(){
    return new Promise((resolve, reject) => {
        if(listaDePedidos.length === 0) {
            reject("No hay pedidos.");
        } else {
            resolve(listaDePedidos);
        }
    });
}

document.getElementById("pedidoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let cliente = document.getElementById("cliente").value;
    let plato = document.getElementById("plato").value;
    let cantidad = Number(document.getElementById("cantidad").value);

    realizarPedido(cliente, plato, cantidad)
        .then(message => alert(message))
        .catch(error => alert(error));
});

document.getElementById("mostrarPedidosBtn").addEventListener("click", function() {
    mostrarPedidos()
        .then(pedidos => {
            let pedidosDiv = document.getElementById("pedidos");
            pedidosDiv.innerHTML = "";
            pedidos.forEach((pedido, indice) => {
            pedidosDiv.innerHTML += `<p>Pedido ${indice}: Cliente: ${pedido.cliente}, Plato: ${pedido.plato}, Cantidad: ${pedido.cantidad}, Fecha: ${pedido.fecha}</p>`;
            });
        })
        .catch(error => alert(error));
});

document.getElementById("cancelarPedidoBtn").addEventListener("click", function() {
    let indice = prompt("Introduzca el número del pedido:");
    cancelarPedido(Number(indice))
        .then(message => alert(message))
        .catch(error => alert(error));
        });
