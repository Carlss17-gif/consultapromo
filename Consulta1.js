const supabaseUrl = "https://aonrjcohmvxaleziockz.supabase.co";
const supabaseKey = "sb_publishable_gNWkwWCmotp1zRvXZtY6lg_XW3NzPVx";
const mysupabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function obtenerParametro(nombre){
    const url = new URL(window.location.href);
    return url.searchParams.get(nombre);
}

// 🔹 CONSULTAR AUTOMÁTICAMENTE AL CARGAR
window.addEventListener("DOMContentLoaded", () => {
    const idd = obtenerParametro("id");
    if(!idd){
        document.getElementById("nombre").innerText = "No se recibió ID en la URL";
        return;
    }
    consultarCliente(idd);
});

async function consultarCliente(idd){

    if(!idd){
        alert("No se recibió ID en la URL");
        return;
    }

    try {
        const { data , error } = await mysupabase
            .from("usuarios_promocion")
            .select("*")
            .eq("id_invitado_promocion", idd)
            .single();

        if(error){
            console.log("Error Supabase:", error);
            document.getElementById("nombre").innerText = "Error al consultar cliente";
            return;
        }

        const nombreEl = document.getElementById("nombre");
        const idEl = document.getElementById("cliente_id");
        const prom = document.getElementById("Promocion");

        if(nombreEl) nombreEl.innerText = "Cliente: " + data.nombre;
        if(idEl) idEl.innerText = "ID: " + data.id_invitado_promocion;
        if(prom) prom.innerText = "Promoción: " + data.promocion;

    } catch(err) {
        console.log("Error JS:", err);
        document.getElementById("nombre").innerText = "Error al consultar cliente";
    }
}

async function hacerValidaPromocion() {
    const ide = obtenerParametro("id");
    if(!ide){
        alert("No se recibió ID para validar");
        return;
    }
    window.location.href = "Login_gerentes.html?id=" + ide;
}
  
}
