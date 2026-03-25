const supabaseUrl = "https://aonrjcohmvxaleziockz.supabase.co";
const supabaseKey = "sb_publishable_gNWkwWCmotp1zRvXZtY6lg_XW3NzPVx";

const mysupabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function obtenerParametro(nombre){
  const url = new URL(window.location.href);
  return url.searchParams.get(nombre);
}

async function consultarCliente(){

  const idd = obtenerParametro("id");

  if(!idd){
    alert("No se recibió ID en la URL");
    return;
  }

  const { data , error } = await mysupabase
  .from("usuarios_promocion")
  .select("*")
  .eq("id_invitado_promocion", idd)
  .single();

  if(error){
    alert("Error al consultar cliente");
    console.log(error);
    return;
  }
  const nombreEl = document.getElementById("nombre");
  const idEl = document.getElementById("cliente_id");
  const prom = document.getElementById("Promocion");

  if(nombreEl) nombreEl.innerText = "Cliente: " + data.nombre;
  if(idEl) idEl.innerText = "ID: " + data.id_invitado_promocion;
  if(prom) prom.innerText="Promoción: "+data.promocion;
}

async function hacerValidaPromocion() {

  const ide = obtenerParametro("id");
  
  window.location.href="Login_gerentes.html?id="+ide;
  
}