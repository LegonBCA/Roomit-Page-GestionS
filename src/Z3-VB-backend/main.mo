// ✅ main.mo – Backend Motoko completo con roles

import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

actor {
  type Rol = { #admin; #docente };

   var roles = HashMap.HashMap<Principal, Rol>(10, Principal.equal, Principal.hash);

  // Llamado desde el frontend para redirigir al dashboard correcto
  public shared (msg) func obtenerRol() : async ?Text {
    let caller = msg.caller;
    switch (roles.get(caller)) {
      case (?#admin)   { ?"admin" };
      case (?#docente) { ?"docente" };
      case (_)         { null };
    }
  };

  // Permite asignar manualmente un rol a un usuario
  public shared func asignarRol(p: Principal, r: Rol) : async Text {
    roles.put(p, r);
    return "Rol asignado con éxito";
  };

  // Ejemplo: función protegida solo para admins
  public shared (msg) func soloAdminPuedeHacerEsto() : async Text {
    let caller = msg.caller;
    switch (roles.get(caller)) {
      case (?#admin) {
        return "Acceso permitido al administrador";
      };
      case (_) {
        return "Acceso denegado. No eres administrador";
      };
    }
  };

  // Ver el Principal actual (opcional)
  public shared (msg) func verMiPrincipal() : async Text {
    return Principal.toText(msg.caller);
  };
}  