export default ({ authGuard, guestGuard }) => [
  // { path: '/', name: 'welcome', component: require('~/pages/welcome.vue') },
  { path: '/',
      component: require('~/pages/welcome.vue'),
      children: [
      { path: '', redirect: { name: 'landing' } },
      { path: 'landing', name: 'landing', component: require('~/pages/landing.vue') },
      { path: 'catalogue', name: 'catalogue', component: require('~/pages/catalogue.vue') },
      { path: 'projects', name: 'projects', component: require('~/pages/projects.vue') },
      { path: 'about', name: 'about', component: require('~/pages/about.vue') },
      { path: 'contact', name: 'contact', component: require('~/pages/contact.vue') },
      // { path: 'product/:id',  component: require('~/pages/product.vue') },
      { path: 'category/:category_id', component: require('~/pages/category.vue') },
      { path: 'category/:category_id/product/:product_id', component: require('~/pages/product.vue') }
      ] },

  // Authenticated routes.
  ...authGuard([
    { path: '/home', name: 'home', component: require('~/pages/home.vue') },
    { path: '/settings',
      component: require('~/pages/settings/index.vue'),
      children: [
      { path: '', redirect: { name: 'settings.profile' } },
      { path: 'profile', name: 'settings.profile', component: require('~/pages/settings/profile.vue') },
      { path: 'password', name: 'settings.password', component: require('~/pages/settings/password.vue') }
      ] },
      { path: '/categories', name: 'categories', component: require('~/pages/categories/index.vue') },
      { path: '/products', name: 'products', component: require('~/pages/products/index.vue') }
  ]),

  // Guest routes.
  ...guestGuard([
    { path: '/login', name: 'login', component: require('~/pages/auth/login.vue') },
    { path: '/register', name: 'register', component: require('~/pages/auth/register.vue') },
    { path: '/password/reset', name: 'password.request', component: require('~/pages/auth/password/email.vue') },
    { path: '/password/reset/:token', name: 'password.reset', component: require('~/pages/auth/password/reset.vue') }
  ]),

  { path: '*', component: require('~/pages/errors/404.vue') }
]
