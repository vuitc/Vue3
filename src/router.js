import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from './components/Frontend/Home.vue';
import ShopComponent from './components/Frontend/Shop.vue';
import DetailComponent from './components/Frontend/Detail.vue';
import EComponent from './components/partition/404.vue';
import CartComponent from './components/Frontend/Cart.vue';
import CheckoutComponent from './components/Frontend/Checkout.vue';
import Login from "./components/partition/Login.vue";
import Register from "./components/partition/Register.vue";
import AdminDashboard from "./components/Backend/AdminDashboard.vue";
import EditProduct from './components/Backend/EditProduct.vue';
import EditUser from "./components/Backend/EditUser.vue";
import EditHoaDon from "./components/Backend/EditHoaDon.vue";
import ChiTietHoaDon from "./components/Backend/ChiTietHoaDon.vue";
const routes = [
  {
    path: "/",
    name: "HomeComponent",
    component: HomeComponent,
    meta: { public: true }, // Mark this route as private
  },
  {
    path: "/shop",
    name: "ShopComponent",
    component: ShopComponent,
    meta: { public: true }, // Mark this route as private
  },
  {
    path: "/detail/:id",
    name: "DetailComponent",
    component: DetailComponent,
    meta: { public: true }, // Mark this route as private
    props: true
  },
  {
    path: "/404",
    name: "EComponent",
    component: EComponent,
    meta: { public: true }, // Mark this route as private
  },
  {
    path: "/cart",
    name: "CartComponent",
    component: CartComponent,
    meta: { public: 1 }, // Mark this route as private
  },
  {
    path: "/checkout",
    name: "CheckoutComponent",
    component: CheckoutComponent,
    meta: { public: 1 }, // Mark this route as private
  }
  ,
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { public: true }, // Mark this route as private
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { public: true }, // Mark this route as private
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { public: false }, // Mark this route as private
  },
  {
    path: '/EditProduct/:id',
    name: 'EditProduct',
    component: EditProduct,
    meta:{public:false}
  }
  ,
  {
    path: '/editUser/:id/',
    name: 'EditUser',
    component: EditUser,
    meta:{public:false}
  },
  {
    path: '/editHoaDon/:id/',
    name: 'EditHoaDon',
    component: EditHoaDon,
    meta:{public:false}
  },
  {
    path: '/ChiTietHoaDon/:id',
    name: 'ChiTietHoaDon',
    component: ChiTietHoaDon, // Thay thế bằng tên component thực tế của bạn
    meta:{public:false}
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  // Kiểm tra xem route có phải là route public không
  if (!to.meta.public) {
    // Nếu route không phải là public, kiểm tra xem có email trong localStorage không
    const loggedInUser = localStorage.getItem('email');
    const role=localStorage.getItem('role');
    if (!loggedInUser) {
      // Nếu không có email trong localStorage, chuyển hướng đến trang login
      next('/login');
    } else {
      // Nếu có email trong localStorage, cho phép truy cập
      next();
    }
  } else {
    // Nếu là route public, cho phép truy cập
    next();
  }
});


export default router;

// const routes = [
//   {
//     path: "/",
//     name: "HomeComponent",
//     component: HomeComponent,
//     meta: { public: [0,1] }, // Chưa đăng nhập
//   },
//   {
//     path: "/shop",
//     name: "ShopComponent",
//     component: ShopComponent,
//     meta: { public: [0, 1] }, // Chưa đăng nhập hoặc đã đăng nhập
//   },
//   {
//     path: "/detail/:id",
//     name: "DetailComponent",
//     component: DetailComponent,
//     meta: { public: [0, 1] }, // Chưa đăng nhập hoặc đã đăng nhập
//     props: true
//   },
//   {
//     path: "/404",
//     name: "EComponent",
//     component: EComponent,
//     meta: { public: [0, 1, 2] }, // Chưa đăng nhập, user hoặc admin
//   },
//   {
//     path: "/cart",
//     name: "CartComponent",
//     component: CartComponent,
//     meta: { public: [1] }, // Chưa đăng nhập hoặc đã đăng nhập
//   },
//   {
//     path: "/checkout",
//     name: "CheckoutComponent",
//     component: CheckoutComponent,
//     meta: { public: [1] }, // Chưa đăng nhập hoặc đã đăng nhập
//   },
//   {
//     path: "/login",
//     name: "Login",
//     component: Login,
//     meta: { public: [0,1,2] }, // Chưa đăng nhập
//   },
//   {
//     path: "/register",
//     name: "Register",
//     component: Register,
//     meta: { public: [0,1,2] }, // Chưa đăng nhập
//   },
//   {
//     path: "/admin",
//     name: "AdminDashboard",
//     component: AdminDashboard,
//     meta: { public: [  2] }, // Chưa đăng nhập, user hoặc admin
//   },
//   {
//     path: '/EditProduct/:id',
//     name: 'EditProduct',
//     component: EditProduct,
//     meta: { public: [  2] }, // Chưa đăng nhập, user hoặc admin
//   },
//   {
//     path: '/editUser/:id/',
//     name: 'EditUser',
//     component: EditUser,
//     meta: { public: [  2] }, // Chưa đăng nhập, user hoặc admin
//   },
//   {
//     path: '/editHoaDon/:id/',
//     name: 'EditHoaDon',
//     component: EditHoaDon,
//     meta: { public: [  2] }, // Chưa đăng nhập, user hoặc admin
//   },
//   {
//     path: '/ChiTietHoaDon/:id',
//     name: 'ChiTietHoaDon',
//     component: ChiTietHoaDon,
//     meta: { public: [ 2] }, // Chưa đăng nhập, user hoặc admin
//   }
// ];
// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });
// const role = localStorage.getItem('role');
// let userRole = 0;

// if (role === '0') {
//   userRole = 1; // User
// } else if (role === '1') {
//   userRole = 2; // Admin
// }

// router.beforeEach((to, from, next) => {
//   // Kiểm tra xem route có phù hợp với vai trò của người dùng không
//   if (to.meta.public.includes(userRole)) {
//     // Nếu route phù hợp với vai trò của người dùng, cho phép truy cập
//     next();
//   } else {
//     // Nếu route không phù hợp với vai trò của người dùng, chuyển hướng đến trang 404
//     next('/404');
//   }
// });

// export default router;