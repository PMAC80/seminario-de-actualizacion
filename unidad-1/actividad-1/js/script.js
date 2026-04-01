function agregar(valor) 
{
    document.getElementById("display").value += valor;
}

function limpiar_display() 
{
    document.getElementById("display").value = "0";
}

function calcular_operacion() 
{
    let expresion = document.getElementById("display").value;
    try {
        document.getElementById("display").value = eval(expresion);
    } catch {
        alert("Error");
    }
}