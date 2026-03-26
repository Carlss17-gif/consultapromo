/// URL y key de Supabase
const supabaseUrl = "https://aonrjcohmvxaleziockz.supabase.co";
const supabaseKey = "sb_publishable_gNWkwWCmotp1zRvXZtY6lg_XW3NzPVx";

const mysupabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  const nombreger=obtenerParametro("nombre");
// Obtener parámetro de URL
function obtenerParametro(nombre){
  const url = new URL(window.location.href);
  return url.searchParams.get(nombre);
}

// Cargar información del cliente
async function cargarCliente() {
  const id = obtenerParametro("id");

  if (!id) {
    document.getElementById("infoCliente").innerText = "No se recibió ID";
    return;
  }

  const { data, error } = await mysupabase
    .from("usuarios_promocion")
    .select("*")
    .eq("id_invitado_promocion", id)
    .single();

  if (error) {
    document.getElementById("infoCliente").innerText = "Error al cargar cliente";
    console.log(error);
    return;
  }

  document.getElementById("infoCliente").innerHTML =
  `
  Cliente: ${data.nombre}<br>
  ID: ${data.id}<br>
  Promoción: ${data.promocion}
  `;
}

cargarCliente();

// 🔥 Registrar canje
async function canjear() {

  const transaccion = document.getElementById("transaccion").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  if (!transaccion || !fecha || !hora) {
    alert("Completa todos los campos");
    return;
  }

  const id = obtenerParametro("id");

  const { data, error } = await mysupabase
    .from("usuarios_promocion")
    .select("*")
    .eq("id_invitado_promocion", id)
    .single();

  if (error) {
    console.log(error);
    alert("Error al obtener usuario");
    return;
  }

  const { error: insertError } = await mysupabase
    .from("registro_canjeos")
    .insert([
      {
        id_invitado_promocion: data.id_invitado_promocion,
        invitado: data.nombre,
        promocion: data.promocion,
        nombre_gerente: nombreger, // <-- usamos solo el nombre del gerente
        numero_transaccion: transaccion,
        fecha: fecha,
        hora: hora
      }
    ]);

  if (insertError) {
    console.log(insertError);
    alert("Error al guardar el canje");
    return;
  }

  alert("Registro guardado correctamente");
}
