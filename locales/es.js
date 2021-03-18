import es from 'vuetify/lib/locale/es'
import EsValidation from 'vee-validate/dist/locale/es.json'
import OrfeoEs from './modules/orfeo/es'
export default {
  $vuetify: es,
  validation: {
    alpha_dots: 'El campo {_field_} solo debe contener letras y puntos',
    date_format: 'El campo {_field_} no es una fecha válda',
    greater_than_or_equal_to:
      'El campo {_field_} debe ser mayor o igual a {target}',
    greater_than: 'El campo {_field_} debe ser mayor a {target}',
    less_than_or_equal_to:
      'El campo {_field_} debe ser menor o igual a {target}',
    less_than: 'El campo {_field_} debe ser menor a {target}',
    date_equal_to: 'El campo {_field_} debe ser igual a {target}',
    date_is_between: 'El campo {_field_} debe ser estar entre {min} y {max}',
    ...EsValidation.messages,
  },
  titles: {
    Login: 'Iniciar Sesión',
    Lock: 'Bloqueado',
    Logout: 'Cerrar Sesión',
    Calendar: 'Calendario',
    Dashboard: 'Dashboard',
    Details: 'Detalles',
    Password: 'Olvidé mi Contraseña',
    PasswordReset: 'Restaurar Contraseña',
    Remember: 'Recuerde',
    Profile: 'Perfil',
    Settings: 'Confirguración',
    Orfeo: 'Orfeo',
    Historic: 'Histórico',
    Modules: 'Módulos',
    NotFound: 'Esta página no existe',
    Notifications: 'Notificaciones',
    Contracts: 'Contratos',
    Contractors: 'Contratistas',
    Admin: 'Administrador',
    Contractor: 'Contratista',
  },
  calendar: {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    '4days': '4 días',
  },
  snackTitles: {
    warning: '¡Advertencia!',
    success: '¡Bien Hecho!',
    error: '¡Error!',
    info: '¡Información!',
  },
  confirm: {
    delete: '¿Desea eliminar este registro?. Esta acción no se puede deshacer.',
  },
  addressDialog: {
    title: 'Normalizador de Direcciones',
    helpText:
      'Para añadir una dirección presiona los botones correspondientes que aparecen al inferior de este campo.',
    input: 'Dirección',
    help: 'Ayuda',
    toEnd: 'Al finalizar por favor da click en el botón superior o inferior',
    toDelete: 'Para eliminar una porción de la dirección presiona el botón',
    toDeleteAll: 'Para eliminar todo el texto presiona',
    toComplement:
      'Para añadir texto complementario a la dirección en la parte inferior podrá insertar dicho complemento.',
    frequentNom: 'Nomenclaturas Frecuentes',
    Noms: 'Nomenclaturas',
    filterNoms: 'Filtrar Nomenclaturas',
    Numbers: 'Números',
    Letters: 'Letras',
    Quadrant: 'Cuadrante',
    Complement: 'Texto complementario de la dirección',
    AddComplement: 'Añadir Complemento',
  },
  texts: {
    Error: 'Ha ocurrido un error',
    EmptyModules: 'No hay Módulos',
    EmptyModulesText:
      'Aún no tiene módulos asignados para acceder, por favor envíe un correo a soporte para solicitar accesos. Gracias.',
    ForgotPassword: 'Olvidé mi contraseña',
    OldLogin: 'Ir al sitio anterior',
    PasswordWarning:
      'Al cambiar su contraseña, ésta será la misma para Orfeo, Correo, SIM, Red, PC e Intranet',
  },
  inputs: {
    Name: 'Nombre',
    Document: 'Número de Documento',
    Username: 'Usuario',
    Password: 'Contraseña',
    PasswordConfirmation: 'Confirmar Contraseña',
    RememberMe: 'Recordarme',
    Document: 'Documento',
    Email: 'Correo electrónico',
    EmailConfirmation: 'Confirmar Correo electrónico',
    Captcha: 'Completa el captcha',
  },
  helper: {
    ContactForgotMail:
      'Correo electrónico de contácto en donde se enviará el link de restablecimiento de contraseña',
  },
  buttons: {
    Excel: 'Exportar a Excel',
    Help: 'Ayuda',
    Error: 'Sácame de aquí',
    List: 'Vista de Lista',
    Grid: 'Vista de Cuadrícula',
    Actions: 'Acciones',
    Cancel: 'Cancelar',
    Go: 'Ir',
    GoTo: 'Ir a',
    View: 'Ver',
    Viewed: 'Visto',
    Accept: 'Aceptar',
    Accepted: 'Aceptado',
    Cancelled: 'Cancelado',
    Reset: 'Reiniciar',
    Reseted: 'Reiniciado',
    Search: 'Buscar',
    Send: 'Enviar',
    Sent: 'Enviado',
    Submit: 'Enviar',
    Submitted: 'Enviado',
    Save: 'Guardar',
    Saved: 'Guardado',
    Login: 'Iniciar Sesión',
    Logout: 'Cerrar Sesión',
    Add: 'Añadir',
    Added: 'Añadido',
    Create: 'Crear',
    Created: 'Creado',
    Edit: 'Editar',
    Edited: 'Editado',
    Delete: 'Eliminar',
    Deleted: 'Eliminado',
    Download: 'Descargar',
    Downloaded: 'Descargado',
    Restore: 'Restaurar',
    Restored: 'Restaurado',
    Reload: 'Recargar',
    Reloaded: 'Recargado',
    Refresh: 'Refrescar',
    Refreshed: 'Refrescado',
    Update: 'Actualizar',
    Updated: 'Actualizado',
    Loading: 'Cargando',
    Filter: 'Filtrar',
    Back: 'Atrás',
    Next: 'Siguiente',
    LearnMore: 'Saber más',
    ViewMore: 'Ver más',
    ViewLess: 'Ver menos',
    ViewImage: 'Ver imagen',
    MoreOptions: 'Más Opciones',
    LessOptions: 'Menos Opciones',
    AdvanceSearch: 'Búsqueda Avanzada',
    OpenInNewWindow: 'Abrir en nueva ventana',
  },
  footer: {
    made: 'hecho con',
    web: 'para una web mejor.',
  },
  errors: {
    request: 'No hay comunicación con el servidor',
    message:
      'Algo salió mal, estamos trabajando para resolver el inconveniente.',
    online: 'Conexión a internet reestablecida',
    offline: 'No se puede verificar tu conexión a Internet',
  },
  sidebar: {
    filters: 'Color de Acento',
    background: 'Color Barra Lateral',
    dark: 'Tema',
    language: 'Idioma',
    image: 'Imagen de Fondo',
    rtl: 'Dirección',
    images: 'Imágenes',
    install: 'Instalar SIM',
  },
  /* Import all locales from other modules */
  orfeo: { ...OrfeoEs },
}
