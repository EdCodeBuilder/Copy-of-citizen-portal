import es from 'vuetify/lib/locale/es'
import EsValidation from 'vee-validate/dist/locale/es.json'
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
  dev: 'Ambiente de Pruebas',
  Total: 'Total',
  All: 'Todo',
  Yes: 'Si',
  No: 'No',
  titles: {
    AdminUsers: 'Administración de Usuarios',
    Login: 'Iniciar Sesión',
    Data: 'Datos',
    Profile: 'Perfil',
    Users: 'Usuarios',
    UsersSchedules: 'Usuarios y Horarios',
    Home: 'Inicio',
    Status: 'Estados del Sistema',
    Stages: 'Escenarios',
    Programs: 'Programas',
    Activities: 'Actividades',
    WeekDays: 'Días',
    DailyHours: 'Horas',
    FileTypes: 'Tipos de Archivos',
    ProfileTypes: 'Tipos de Perfiles',
    Schedules: 'Horarios',
    RolesAndPermissions: 'Roles y Permisos',
    Historic: 'Histórico',
    Details: 'Detalles',
    Dashboard: 'Dashboard',
    Error: 'Error',
    Audit: 'Auditoría',
    Logout: 'Cerrar Sesión',
    Lock: 'Bloqueado',
    UserValidation: 'Validación de Usuarios',
    AssignValidator: 'Asignar Validador',
    AssignStatus: 'Asignar Estado',
    AssignStatusSign: 'Asignar Estado de Inscripción',
    ViewObservations: 'Ver Observaciones',
    ViewAttachment: 'Ver Archivos Adjuntos',
    ViewActivities: 'Ver Actividades Inscritas',
    ViewActivitiesDetails: 'Ver Detalles de la Actividad',
    Observations: 'Observaciones',
    Attachment: 'Archivos Adjuntos',
    Filters: 'Filtros',
    UsersByStage: 'Usuarios por escenario',
    Notifications: 'Notificaciones',
    Admin: 'Administrador',
    Password: 'Olvidé mi Contraseña',
    AgeGroups: 'Grupos de Edades',
    PasswordReset: 'Restaurar Contraseña',
    Remember: 'Recuerde',
    Settings: 'Confirguración',
    Modules: 'Módulos',
    NotFound: 'Esta página no existe',
    EmptyNotifications: 'No hay notificaciones',
    ViewAllNotifications: 'Ver todas las notificaciones',
    Citizen: 'Ciudadano',
    Massive: 'Masivo',
    Security: 'Roles y Permisos',
  },
  excel: {
    button: 'Descarga la plantilla actualizada',
    text:
      'En la plantilla del archivo de excel a continuación, las columnas B, D, H, y J contienen selectores que completan automáticamente las casillas A, C, E, G e I, adicionalmente el archivo contiene comentarios de ayuda.',
    validation: 'Verifica las siguientes filas del archivo de excel',
    continue:
      'Para almacenar los datos y sin importar las coincidencias encontradas, por favor active el campo Forzar Carga y envíe el archivo nuevamente.',
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
    unsubscribe:
      '¿Estás seguro de desasociar el usuario {user} de esta actividad? Esta acción no se puede deshacer.',
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
    Email: 'Correo electrónico',
    EmailConfirmation: 'Confirmar Correo electrónico',
    Captcha: 'Completa el captcha',
    Role: 'Rol',
    Permission: 'Permiso',
    Title: 'Título',
    SearchPark: 'Buscar Parque',
    File: 'Archivo',
    Force: 'Forzar Carga',
  },
  helper: {
    ContactForgotMail:
      'Correo electrónico de contácto en donde se enviará el link de restablecimiento de contraseña',
    UserAdmin:
      'Realice la búqueda por nombre de usuario, luego selecciónelo para mostrar los roles disponbles para asignar.',
    Find: 'Digite el criterio y después de clic sobre la lupa para buscar',
    Search:
      'Digita una palabra para realizar la búsqueda de un servicio de interés',
  },
  buttons: {
    Excel: 'Exportar a Excel',
    Help: 'Ayuda',
    Error: 'Sácame de aquí',
    List: 'Vista de Lista',
    Grid: 'Vista de Cuadrícula',
    Actions: 'Acciones',
    Cancel: 'Cancelar',
    Close: 'Cerrar',
    Image: 'Imagen',
    Go: 'Ir',
    GoTo: 'Ir a',
    GoToTop: 'Ir arriba',
    View: 'Ver',
    Viewed: 'Visto',
    Accept: 'Aceptar',
    Accepted: 'Aceptado',
    Cancelled: 'Cancelado',
    Rate: 'Calificar',
    Rated: 'Calificado',
    Post: 'Publicar',
    Posted: 'Publicado',
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
    Details: 'Detalles',
    History: 'Historial',
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
    AssignRole: 'Asignar Rol',
    FollowLink: 'Seguir Enlace',
    File: 'Archivo',
    Print: 'Imprimir',
    FreeUpQuota: 'Liberar cupo',
    MarkAsRead: 'Marcar como leido',
    Management: 'Gestionar',
    Custom: 'Personalizado',
    ViewAudit: 'Ver Auditoría',
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
    permissions: 'No tienes acceso a este módulo.',
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
  label: {
    result:
      'No se encontraron coincidencias | Se encontró una coincidencia | Se encontraron {qty} coincidencias',
    result_title: 'Buscar | 1 Resultado | {qty} Resultados',
    no_data: 'No hay datos disponibles',
    no_data_desc: 'Selecciona un parámetro para buscar',
    find_by_name: 'Buscar por nombre',
    find_by_any: 'Buscar por cualquier criterio',
    find_by: 'Buscar por',
    Comment: 'Comentario',
    comments: 'Sin comentarios | 1 comentario | {qty} comentarios',
    RateService: 'Califica este servicio',
    RateGT: 'Calificación superior a',
    Description: 'Sin descripción | Descripción',
  },
  admin: {
    find: 'Realice la búqueda de un usuario, selecciónelo y asígnele un rol.',
    users: 'Usuarios del Sistema',
  },
  form: {
    name: 'Nombre',
    program: 'Programa',
    activity: 'Actividad',
    stage: 'Escenario',
    park_code: 'Codigo del parque',
    park: 'Parque',
    address: 'Dirección',
    weekday: 'Día(s) de la semana',
    daily: 'Horas',
    min_age: 'Edad mínima',
    max_age: 'Edad máxima',
    quota: 'Cupos',
    is_paid: 'Es pago',
    is_initiate: 'Es iniciación',
    start_date: 'Fecha de apertura',
    final_date: 'Fecha de cierre',
    is_activated: 'Está activo',
    profile_type: 'Tipo de perfil',
    taken: 'Cupos tomados',
    quota_less: 'Cupos restantes',
    not_assigned: 'Sin asignar verificador',
    assigned: 'Asignados a verificador',
    new_values: 'Nuevos valores',
    start_date_filter: 'Feche inicial de registro',
    final_date_filter: 'Fecha final de registro',
    old_values: 'Datos anteriores',
    validator: 'Validador',
    status: 'Estado',
    observation: 'Observación',
    created_at: 'Fecha de creación',
    schedule_created_at: 'Fecha de inscripción',
  },
  terms_and_cond: 'Aceptar términos y condiciones',
  terms_and_cond_min: 'Aceptar T&C',
  consent: 'Consentimiento informado',
  accept: 'Acepto los términos y condiciones',
}
