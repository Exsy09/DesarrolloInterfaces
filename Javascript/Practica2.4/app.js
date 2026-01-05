const form = document.getElementById("formMatricula");

const edad = document.getElementById("edad");
const email = document.getElementById("email");
const ciclo = document.getElementById("ciclo");
const acepto = document.getElementById("acepto");

const msgEdad = document.getElementById("msgEdad");
const msgEmail = document.getElementById("msgEmail");
const msgCiclo = document.getElementById("msgCiclo");
const msgMods = document.getElementById("msgMods");
const msgAcepto = document.getElementById("msgAcepto");

/* ===== EDAD ===== */
edad.addEventListener("input", () => {
    const valor = Number(edad.value);

    if (isNaN(valor) || valor < 16 || valor > 60) {
        edad.className = "campo-error";
        msgEdad.textContent = "Edad entre 16 y 60";
        msgEdad.className = "msg msg-error";
    } else {
        edad.className = "campo-ok";
        msgEdad.textContent = "Edad válida";
        msgEdad.className = "msg msg-ok";
    }
});

/* ===== EMAIL ===== */
email.addEventListener("input", () => {
    const valor = email.value;

    if (
        valor.length < 6 ||
        !valor.includes("@") ||
        !valor.includes(".") ||
        valor.includes("yahoo.")
    ) {
        email.className = "campo-error";
        msgEmail.textContent = "Email inválido";
        msgEmail.className = "msg msg-error";
    } else {
        email.className = "campo-ok";
        msgEmail.textContent = "Email válido";
        msgEmail.className = "msg msg-ok";
    }
});

/* ===== ENVÍO ===== */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let errores = [];

    /* Edad */
    const vEdad = Number(edad.value);
    if (isNaN(vEdad) || vEdad < 16 || vEdad > 60) {
        errores.push("Edad");
    }

    /* Email */
    const vEmail = email.value;
    if (
        vEmail.length < 6 ||
        !vEmail.includes("@") ||
        !vEmail.includes(".") ||
        vEmail.includes("yahoo.")
    ) {
        errores.push("Email");
    }

    /* Ciclo */
    if (ciclo.value === "") {
        msgCiclo.textContent = "Selecciona un ciclo";
        msgCiclo.className = "msg msg-error";
        errores.push("Ciclo");
    } else {
        msgCiclo.textContent = "";
    }

    /* Módulos (bucle for) */
    const modulos = document.getElementsByName("modulos");
    let contador = 0;

    for (let i = 0; i < modulos.length; i++) {
        if (modulos[i].checked) contador++;
    }

    if (contador < 2) {
        msgMods.textContent = "Marca al menos 2 módulos";
        msgMods.className = "msg msg-error";
        errores.push("Módulos");
    } else {
        msgMods.textContent = "";
    }

    /* Acepto condiciones */
    if (!acepto.checked) {
        msgAcepto.textContent = "Debes aceptar las condiciones";
        msgAcepto.className = "msg msg-error";
        errores.push("Condiciones");
    } else {
        msgAcepto.textContent = "";
    }

    /* RESULTADO */
    if (errores.length > 0) {
        alert("Campos no válidos:\n- " + errores.join("\n- "));
    } else {
        mostrarResumen();
    }
});

/* ===== RESUMEN ===== */
function mostrarResumen() {
    const nombre = document.getElementById("nombre").value;
    const mods = document.getElementsByName("modulos");
    let lista = [];

    for (let i = 0; i < mods.length; i++) {
        if (mods[i].checked) lista.push(mods[i].value);
    }

    document.body.innerHTML = `
        <main class="card">
            <h1>Resumen de matrícula</h1>
            <p><strong>Alumno:</strong> ${nombre}</p>
            <p><strong>Edad:</strong> ${edad.value}</p>
            <p><strong>Email:</strong> ${email.value}</p>
            <p><strong>Ciclo:</strong> ${ciclo.value}</p>
            <p><strong>Módulos:</strong> ${lista.join(", ")}</p>
        </main>
    `;
}

/* ===== BOTÓN RECARGAR ===== */
document.getElementById("btnReload").addEventListener("click", () => {
    location.reload();
});
