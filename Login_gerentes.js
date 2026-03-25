// URL y key de Supabase
const supabaseUrl = "https://aonrjcohmvxaleziockz.supabase.co";
const supabaseKey = "sb_publishable_gNWkwWCmotp1zRvXZtY6lg_XW3NzPVx";

const mysupabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function obtenerParametro(nombre){
  const url = new URL(window.location.href);
  return url.searchParams.get(nombre);
}

// LOGIN usando Supabase Auth
async function login() {
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  if (!correo || !password) {
    alert("Ingresa email y contraseña");
    return;
  }

  // Login con Supabase
  const { data, error } = await mysupabase.auth.signInWithPassword({
    email: correo,
    password: password
  });

  if (error) {
    console.log(error);
    alert("Credenciales incorrectas");
    return;
  }

  if (!data.session) {
    alert("Error al iniciar sesión, intenta de nuevo");
    return;
  }

  const user = data.session.user;

  // Obtener el nombre del gerente logueado
  const { data: gerenteData, error: gerenteError } = await mysupabase
    .from("gerentes")
    .select("nombre")
    .eq("id", user.id)
    .single();

  if (gerenteError || !gerenteData) {
    console.log(gerenteError);
    alert("No se pudo obtener el gerente");
    return;
  }

  // 🔹 Guardar el nombre del gerente en localStorage
  const nombre=gerenteData.nombre
  const idi = obtenerParametro("id");
  window.location.href = "Panel.html?id=" + idi+"&"+"nombre="+nombre;
  console.log("User ID:", user.id);
console.log("Gerente data:", gerenteData);
console.log("Gerente error:", gerenteError);
}