function calcularCarburante() {
    let reserva = parseFloat(document.getElementById('reserva').value);
    let consumo = parseFloat(document.getElementById('consumo').value);
    let reabastece = parseFloat(document.getElementById('reabastece').value);
    let critico = parseFloat(document.getElementById('critico').value);
    let resultadoDiv = document.getElementById('resultado1');

    if (isNaN(reserva) || isNaN(consumo) || isNaN(reabastece) || isNaN(critico)) {
        resultadoDiv.innerHTML = 'ERROR: Complete todos los campos. Ejemplo: 10000, 1200, 300, 2000';
        return;
    }

    let netoDiario = consumo - reabastece;
    if (netoDiario <= 0) {
        resultadoDiv.innerHTML = 'ADVERTENCIA: El reabastecimiento es mayor o igual al consumo. La reserva nunca se agotara.';
        return;
    }

    let diasCritico = Math.floor((reserva - critico) / netoDiario);
    let diasAgotar = Math.floor(reserva / netoDiario);

    if (diasCritico < 0) diasCritico = 0;

    resultadoDiv.innerHTML = 'RESULTADOS:\n' +
        'Dias hasta nivel critico (' + critico + ' L): ' + diasCritico + ' dias\n' +
        'Dias hasta agotarse: ' + diasAgotar + ' dias\n' +
        (diasCritico <= 3 ? 'ALERTA CRITICA: La reserva llegara pronto al nivel critico.' : '');
}

function calcularCompras() {
    let presupuesto = parseFloat(document.getElementById('presupuesto').value);
    let precioArroz = parseFloat(document.getElementById('precioArroz').value);
    let cantArroz = parseFloat(document.getElementById('cantArroz').value);
    let precioPapa = parseFloat(document.getElementById('precioPapa').value);
    let cantPapa = parseFloat(document.getElementById('cantPapa').value);
    let precioAceite = parseFloat(document.getElementById('precioAceite').value);
    let cantAceite = parseFloat(document.getElementById('cantAceite').value);
    let resultadoDiv = document.getElementById('resultado2');

    if (isNaN(presupuesto) || isNaN(precioArroz) || isNaN(cantArroz) || isNaN(precioPapa) || isNaN(cantPapa) || isNaN(precioAceite) || isNaN(cantAceite)) {
        resultadoDiv.innerHTML = 'ERROR: Complete todos los campos. Ejemplo: Presupuesto 500, Arroz 11 Bs x10, Papa 10 Bs x8, Aceite 18 Bs x4';
        return;
    }

    let totalArroz = precioArroz * cantArroz;
    let totalPapa = precioPapa * cantPapa;
    let totalAceite = precioAceite * cantAceite;
    let totalCompra = totalArroz + totalPapa + totalAceite;
    let saldo = presupuesto - totalCompra;

    let mensaje = 'RESULTADOS:\n' +
        'Total Arroz: ' + totalArroz + ' Bs\n' +
        'Total Papa: ' + totalPapa + ' Bs\n' +
        'Total Aceite: ' + totalAceite + ' Bs\n' +
        'Total compra: ' + totalCompra + ' Bs\n' +
        'Presupuesto: ' + presupuesto + ' Bs\n';

    if (saldo >= 0) {
        mensaje += 'Saldo restante: ' + saldo + ' Bs - El presupuesto ALCANZA';
    } else {
        mensaje += 'Faltan: ' + Math.abs(saldo) + ' Bs - El presupuesto NO alcanza';
    }

    resultadoDiv.innerHTML = mensaje;
}

function calcularPoder() {
    let ingreso = parseFloat(document.getElementById('ingreso').value);
    let gastoAntes = parseFloat(document.getElementById('gastoAntes').value);
    let gastoAhora = parseFloat(document.getElementById('gastoAhora').value);
    let resultadoDiv = document.getElementById('resultado3');

    if (isNaN(ingreso) || isNaN(gastoAntes) || isNaN(gastoAhora)) {
        resultadoDiv.innerHTML = 'ERROR: Complete todos los campos. Ejemplo: Ingreso 2500, Gasto antes 2000, Gasto actual 2800';
        return;
    }

    let ahorroAntes = ingreso - gastoAntes;
    let ahorroAhora = ingreso - gastoAhora;
    let perdida = ahorroAntes - ahorroAhora;
    let porcentajePerdida = (perdida / ahorroAntes) * 100;

    if (ahorroAntes <= 0) {
        resultadoDiv.innerHTML = 'ADVERTENCIA: Con el gasto anterior ya no habia ahorro. Revise los datos.';
        return;
    }

    let mensaje = 'RESULTADOS:\n' +
        'Ahorro antes: ' + ahorroAntes + ' Bs\n' +
        'Ahorro ahora: ' + ahorroAhora + ' Bs\n' +
        'Perdida de poder adquisitivo: ' + perdida + ' Bs (' + porcentajePerdida.toFixed(1) + '%)\n';

    if (porcentajePerdida > 30) {
        mensaje += 'ALERTA: Perdida superior al 30 porciento del poder adquisitivo.';
    }

    resultadoDiv.innerHTML = mensaje;
}

function limpiar(id) {
    document.getElementById(id).innerHTML = '';
}

function irASimulador(id) {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function cargarCaso1() {
    document.getElementById('reserva').value = 10000;
    document.getElementById('consumo').value = 1200;
    document.getElementById('reabastece').value = 300;
    document.getElementById('critico').value = 2000;
    calcularCarburante();
    irASimulador('simulador1');
}

function cargarCaso2() {
    document.getElementById('presupuesto').value = 500;
    document.getElementById('precioArroz').value = 11;
    document.getElementById('cantArroz').value = 10;
    document.getElementById('precioPapa').value = 10;
    document.getElementById('cantPapa').value = 8;
    document.getElementById('precioAceite').value = 18;
    document.getElementById('cantAceite').value = 4;
    calcularCompras();
    irASimulador('simulador2');
}

function cargarCaso3() {
    document.getElementById('ingreso').value = 2500;
    document.getElementById('gastoAntes').value = 2000;
    document.getElementById('gastoAhora').value = 2800;
    calcularPoder();
    irASimulador('simulador3');
}