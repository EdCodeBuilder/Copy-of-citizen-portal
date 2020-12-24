const state = () => ({
  locales: ['en', 'es'],
  locale: 'es',
  darker: false,
  activeColor: 'primary',
  barImage: require('@/static/sidebar/sidebar-1.jpg'),
  barColor: 'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
  drawer: null,
  rightDrawer: null,
  clipped: false,
  miniVariant: false,
  showSnack: false,
  rtl: false,
  snackBar: {
    color: 'error',
    title: '¡Error!',
    message:
      'Algo salió mal, estamos trabajando para resolver el inconveniente.',
    icon: 'mdi-bell-plus',
    position: 'bottom',
  },
})

export default state
