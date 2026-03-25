// 🔹 Supabase
const supabaseUrl = "https://aonrjcohmvxaleziockz.supabase.co";
const supabaseKey = "sb_publishable_gNWkwWCmotp1zRvXZtY6lg_XW3NzPVx";
const mysupabase = supabase.createClient(supabaseUrl, supabaseKey);

// 🔹 Función para leer ID de URL
function obtenerParametro(nombre) {
    const url = new URL(window.location.href);
    return url.searchParams.get(nombre);
}

// 🔹 Función para consultar cliente
async function consultarCliente() {
    const idd = obtenerParametro("id");
    const mensaje = document.getElementById("mensaje");
    const nombreEl = document.getElementById("nombre");
    const idEl = document.getElementById("cliente_id");
    const prom = document.getElementById("Promocion");

    if (!idd) {
        mensaje.textContent = "No se recibió ID en la URL";
        return;
    }

    mensaje.textContent = "Consultando cliente...";

    try {
        const { data, error } = await mysupabase
            .from("usuarios_promocion")
            .select("*")
            .eq("id_invitado_promocion", idd)
            .single();

        if (error) {
            console.error("Error Supabase:", error);
            mensaje.textContent = "Error al consultar cliente";
            return;
        }

        mensaje.textContent = "Consulta exitosa";
        nombreEl.textContent = "Cliente: " + data.nombre;
        idEl.textContent = "ID: " + data.id_invitado_promocion;
        prom.textContent = "Promoción: " + data.promocion;
    } catch (err) {
        console.error("Error JS:", err);
        mensaje.textContent = "Error al consultar cliente";
    }
}

// 🔹 Función para validar promoción
function hacerValidaPromocion() {
    const ide = obtenerParametro("id");
    if (!ide) {
        alert("No se recibió ID para validar");
        return;
    }
    window.location.href = "Login_gerentes.html?id=" + ide;
}

// 🔹 Asignar eventos y consulta automática al cargar
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-consulta").addEventListener("click", consultarCliente);
    document.getElementById("btn-validar").addEventListener("click", hacerValidaPromocion);

    // Consulta automática si hay ID
    consultarCliente();
});
