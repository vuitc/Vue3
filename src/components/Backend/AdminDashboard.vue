<template>
  <link href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css" rel="stylesheet" />

  <!-- SIDEBAR -->
  <section id="sidebar">
    <a href="#" class="brand">
      <i class="bx bxs-smile"></i>
      <span class="text">Trang Admin</span>
    </a>
    <ul class="side-menu top">
      <li class="active">
        <a href="#" @click="
          showProducts = true;
          showCategories = false;
          showUsers = false;
          showHoaDons = false;
        ">
          <i class="bx bxs-dashboard"></i>
          <span class="text">Sản phẩm</span>
        </a>
      </li>
      <li>
        <a href="#" @click="
          showProducts = false;
          showCategories = true;
          showUsers = false;
          showHoaDons = false;
        ">
          <i class="bx bxs-shopping-bag-alt"></i>
          <span class="text">Danh mục sản phẩm</span>
        </a>
      </li>
      <li>
        <a href="#" @click="
          showProducts = false;
          showCategories = false;
          showUsers = true;
          showHoaDons = false;
        ">
          <i class="bx bxs-group"></i>
          <span class="text">Khách hàng</span>
        </a>
      </li>
      <li>
        <a href="#" @click="
          showProducts = false;
          showCategories = false;
          showUsers = false;
          showHoaDons = true; 
        ">
          <i class='bx bx-check-square'></i>
          <span class="text">Hóa đơn</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="bx bxs-group"></i>
          <span class="text">...</span>
        </a>
      </li>
    </ul>
    <ul class="side-menu">
      <li>
        <a href="#">
          <i class="bx bxs-cog"></i>
          <span class="text">...</span>
        </a>
      </li>
      <li>
        <a @click="logout" class="logout">
          <i class="bx bxs-log-out-circle"></i>
          <span class="text">Logout</span>
        </a>
      </li>
    </ul>
  </section>
  <!-- SIDEBAR -->

  <!-- CONTENT -->
  <section id="content">
    <!-- MAIN -->
    <main>
      <div class="head-title">
        <div class="left">
          <h1 style="color: red">Dashboard</h1>
          <ul class="breadcrumb">
            <li>
              <a style="color: brown" href="#">Dashboard</a>
            </li>
            <li><i class="bx bx-chevron-right"></i></li>
            <li>
              <a style="color: brown" class="active" href="#">Home</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <form @submit.prevent="searchProduct">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="searchKeyword"
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <button style="width: 170px" type="submit" class="btn btn-primary">
            Tìm kiếm
          </button>
        </form>
      </div>

      <ul class="box-info">
        <li>
          <i class="bx bxs-calendar-check"></i>
          <span class="text">
            <h3>1020</h3>
            <p>Số sản phẩm trên trang</p>
          </span>
        </li>
        <li>
          <i class="bx bxs-group"></i>
          <span class="text">
            <h3>2834</h3>
            <p>Số danh mục</p>
          </span>
        </li>
        <li>
          <i class="bx bxs-dollar-circle"></i>
          <span class="text">
            <h3>$2543</h3>
            <p>Tổng hóa đơn</p>
          </span>
        </li>
        <li v-if="showProducts">
          <button
            @click="showModal('addProductModal')"
            style="background-color: #0ea5e9; color: white; width: 200px; height: 40px"
            type="button"
            class="btn btn-primary"
          >
            Thêm sản phẩm
          </button>

          <div id="addProductModal" class="modal">
            <div class="modal-dialog">
              <div class="modal-content">
                <!-- Header của modal -->
                <div class="modal-header">
                  <h5 class="modal-title">Thêm sản phẩm mới</h5>
                  <button
                    type="button"
                    class="close"
                    @click="closeModal('addProductModal')"
                  >
                    <span style="width: 50px" class="btn btn-danger">&times;</span>
                  </button>
                </div>
                <!-- Nội dung của modal -->
                <div class="modal-body">
                  <!-- Form nhập thông tin sản phẩm -->
                  <form @submit.prevent="addProduct">
                    <div class="form-group">
                      <label style="color: black" for="productName">Tên sản phẩm:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="productName"
                        v-model="newProduct.name"
                        required
                      />
                      <label style="color: black" for="productPrice"
                        >Thông tin sản phẩm:</label
                      >
                      <textarea
                        style="height: 200px"
                        type="text"
                        class="form-control"
                        id="productDescription"
                        v-model="newProduct.description"
                        required
                      />
                      <label style="color: black" for="productPrice">Giá:</label>
                      <input
                        type="number"
                        class="form-control"
                        id="productPrice"
                        v-model="newProduct.price"
                        required
                      />
                      <label style="color: black" for="productCategory_id"
                        >Danh mục sản phẩm</label
                      >
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        id="productCategory_id"
                        v-model="newProduct.category_id"
                      >
                        <option selected></option>
                        <option value="1">Rau xanh , rau tươi</option>
                        <option value="2">Rau củ quả</option>
                        <option value="3">Nấm và hạt</option>
                        <option value="4">Rau mùi</option>
                      </select>
                      <label style="color: black" for="productSoluongton"
                        >Số lượng tồn:</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        id="productSoluongton"
                        v-model="newProduct.soluongton"
                        required
                      />
                      <label style="color: black" for="productTrongluong"
                        >Trọng lượng:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="productTrongluong"
                        v-model="newProduct.trongluong"
                        required
                      />
                      <label style="color: black" for="productImage">Hình ảnh:</label>
                      <input
                        type="file"
                        class="form-control"
                        id="productImage"
                        @change="handleImageChange"
                        required
                      />
                      <img
                        :src="selectedImageURL || defaultImageURL"
                        alt="Selected Image"
                      />
                    </div>
                    <!-- Thêm các trường thông tin khác của sản phẩm (giá, mô tả, vv) tại đây -->
                    <!-- Button submit -->
                    <button
                      style="margin-top: 20px; height: 40px; width: 200px"
                      type="submit"
                      class="btn btn-success"
                    >
                      Thêm sản phẩm
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li v-if="showUsers">
          <button @click="showModal('addUserModal')"
            style="background-color: #0ea5e9; color: white; width: 200px; height: 50px" type="button"
            class="btn btn-primary">
            Thêm tài khoản khách hàng
          </button>

          <div id="addUserModal" class="modal">
            <div class="modal-dialog">
              <div class="modal-content">
                <!-- Header của modal -->
                <div class="modal-header">
                  <h5 class="modal-title">Thêm tài khoản khách hàng</h5>
                  <button type="button" class="close" @click="closeModal('addUserModal')">
                    <span style="width: 50px" class="btn btn-danger">&times;</span>
                  </button>
                </div>
                <!-- Nội dung của modal -->
                <div class="modal-body">
                  <!-- Form nhập thông tin sản phẩm -->
                  <form @submit.prevent="addUser">
                    <div class="form-group">
                      <label style="color: black" for="userName">Tên tài khoản:</label>
                      <input type="text" class="form-control" id="userName" v-model="newUser.name" required />
                      <label style="color: black" for="userEmail">Email:</label>
                      <input type="email" class="form-control" id="userEmail" v-model="newUser.email" required />
                      <label style="color: black" for="userPhone">Số điện thoại:</label>
                      <input type="text" class="form-control" id="userPhone" v-model="newUser.phone" required />
                      <label style="color: black" for="userDiachi">Địa chỉ:</label>
                      <input type="text" class="form-control" id="userDiachi" v-model="newUser.diachi" required />
                      <label style="color: black" for="userPassword">Mật khẩu:</label>
                      <input type="password" class="form-control" id="userPassword" v-model="newUser.password"
                        required />
                    </div>
                    <!-- Thêm các trường thông tin khác của sản phẩm (giá, mô tả, vv) tại đây -->
                    <!-- Button submit -->
                    <button style="margin-top: 20px; height: 40px; width: 200px" type="submit" class="btn btn-success">
                      Thêm tài khoản
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="showProducts" class="table-data">
        <div class="order">
          <div class="head">
            <h3 style="color: black">Sản phẩm</h3>
            <i class="bx bx-search"></i>
            <i class="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr style="color: black; font-size: larger">
                <th>Hình</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Trọng lượng</th>
              </tr>
            </thead>
            <tbody v-for="product in products" :key="product.id">
              <tr>
                <td>
                  <img
                    style="width: 100px; height: 100px; object-fit: cover"
                    :src="'img/' + product.image"
                    class="img-fluid rounded-top"
                    alt=""
                  />
                </td>
                <td>
                  <p style="color: black">{{ product.name }}</p>
                </td>
                <td style="color: black">{{ product.price }}0đ</td>
                <td>
                  <span class="status completed">{{ product.trongluong }}</span>
                </td>
                <td></td>
                <td></td>
                <td>
                  <button style="width: 100px; color: white" class="btn btn-info">
                    <router-link
                      style="width: 100px; color: white"
                      :to="{ name: 'EditProduct', params: { id: product.id } }"
                    >
                      Chỉnh sửa
                    </router-link>
                  </button>
                </td>
                <td>
                  <button
                    style="width: 70px"
                    class="btn btn-danger"
                    @click="deleteProduct(product.id)"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- danh mục sản phẩm -->
      <div v-if="showCategories">
        <h3 style="color: black">Danh mục sản phẩm</h3>
        <div style="padding: 10px 10px 10px 10px" class="d-flex">
          <label for="">ID danh mục:</label>
          <input
            style="width: 300px"
            class="form-control"
            type="number"
            v-model="newCategoryId"
          />
        </div>
        <div style="padding: 10px 10px 10px 10px" class="d-flex">
          <label for="">Tên danh mục:</label>
          <input
            style="width: 300px"
            class="form-control"
            type="text"
            v-model="newCategoryName"
          />
        </div>
        <button style="width: 70px" class="btn btn-success" @click="addCategory">
          Thêm
        </button>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="index">
              <th scope="row">
                <input
                  class="form-control"
                  type="text"
                  v-model="category.id"
                  :disabled="!category.editing"
                />
              </th>
              <td>
                <input
                  class="form-control"
                  type="text"
                  v-model="category.name"
                  :disabled="!category.editing"
                />
              </td>
              <td>
                <button
                  style="width: 70px"
                  class="btn btn-info"
                  @click="editCategory(index)"
                  v-if="!category.editing"
                >
                  Sửa
                </button>
                <button
                  style="width: 70px"
                  class="btn btn-info"
                  @click="saveCategory(index)"
                  v-else
                >
                  Lưu
                </button>
              </td>
              <td>
                <button
                  style="width: 70px"
                  class="btn btn-danger"
                  @click="deleteCategory(index)"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Khách hàng -->
      <div v-if="showUsers" class="table-data">
        <div class="order">
          <div class="head">
            <h3 style="color: black">Khách hàng</h3>
            <i class="bx bx-search"></i>
            <i class="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr style="color: black; font-size: larger">
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="user in users" :key="user.id">
              <tr>
                <td>
                  <p style="color: black">{{ user.name }}</p>
                </td>
                <td style="color: black">{{ user.email }}</td>
                <td>
                  <span class="status completed">{{ user.phone }}</span>
                </td>
                <td>
                  <span class="status completed">{{ user.diachi }}</span>
                </td>
                <td></td>
                <td></td>
                <td>
                  <button style="width: 100px; color: white" class="btn btn-info">
                    <router-link style="width: 100px; color: white" :to="{ name: 'EditUser', params: { id: user.id } }">
                      Chỉnh sửa
                    </router-link>
                  </button>
                </td>
                <td>
                  <button style="width: 70px" class="btn btn-danger" @click="deleteUser(user.id)">
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Hóa đơn -->
      <div v-if="showHoaDons" class="table-data">
        <div class="order">
          <div class="head">
            <h3 style="color: black">Hóa đơn</h3>
            <i class="bx bx-search"></i>
            <i class="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr style="color: black; font-size: larger">
                <th>Id hóa đơn</th>
                <th>Id người dùng</th>
                <th>Tổng tiền</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="HoaDon in HoaDons" :key="HoaDon.id">
              <tr>
                <td>
                  <router-link :to="{ name: 'ChiTietHoaDon', params: { id: HoaDon.id } }">
                    {{ HoaDon.id }}
                  </router-link>
                </td>
                <td style="color: black">{{ HoaDon.user_id }}</td>
                <td>
                  <span class="status completed">{{ HoaDon.total_amount }}</span>
                </td>
                <td>
                  <span class="status completed">{{ HoaDon.phone }}</span>
                </td>
                <td>
                  <span class="status completed">{{ HoaDon.diachi }}</span>
                </td>
                <td>
                  <span class="status completed">{{ getStatusHoaDon(HoaDon.status) }}</span>
                </td>
                <td></td>
                <td></td>
                <td>
                  <button style="width: 100px; color: white" class="btn btn-info">
                    <router-link style="width: 100px; color: white"
                      :to="{ name: 'EditHoaDon', params: { id: HoaDon.id } }">
                      Chỉnh sửa
                    </router-link>
                  </button>
                </td>
                <td>
                  <button style="width: 70px" class="btn btn-danger" v-if="HoaDon.status === '1'"
                    @click="deleteHoaDon(HoaDon.id)">
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <!-- MAIN -->
  </section>
  <!-- CONTENT -->
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      showProducts: false, // Mặc định hiển thị phần sản phẩm
      showCategories: false, // Ẩn phần danh mục sản phẩm ban đầu
      products: [], // Danh sách sản phẩm
      categories: [], // Danh sách danh mục sản phẩm
      newCategoryName: "", // Tên danh mục mới
      newCategoryId: "", // ID danh mục mới
      newProduct: {
        name: "",
        description: "",
        price: "",
        category_id: "",
        image: null,
        soluongton: "",
        trongluong: "",
        quanlity: 0,
      },
      selectedImageURL: null, // Đường dẫn của hình ảnh được chọn
      defaultImageURL: "/path/to/default/image.jpg", // Đường dẫn mặc định của hình ảnh
      // Phần user
      showUsers: false,
      users: [], // Danh sách người dùng
      newUser: {
        name: "",
        email: "",
        phone: "",
        diachi: "",
        role: 0,
        password: "",
      },
      // Phần hóa đơn
      showHoaDons: false,
      HoaDons: [],
    };
    props: ["product"];
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchUsers();
    this.fetchHoaDons();
  },
  methods: {
    // Hiển thị hoặc ẩn modal
  logout(){
    this.$store.dispatch('logout');
  }
    ,showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
      }
    },
    closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "none";
      }
    },
    // lấy sản phâm từ server
    fetchProducts() {
      fetch("http://localhost:3000/products")
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
    // lấy danh mục sản phẩm từ server
    fetchCategories() {
      fetch("http://localhost:3000/categories")
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    // Thêm danh mục sản phẩm
    addCategory() {
      if (!this.newCategoryName) {
        alert("Vui lòng nhập tên danh mục.");
        return;
      }

      // Chuyển đổi id sang chuỗi
      const newCategoryId = String(this.newCategoryId);

      // Gửi yêu cầu POST để thêm danh mục mới
      fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: newCategoryId, name: this.newCategoryName }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add category.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Category added successfully:", data);
          // Cập nhật danh sách danh mục sau khi thêm thành công
          Swal.fire({
            icon: "success",
            title: "Danh mục đã được thêm thành công!",
          });
          this.fetchCategories();
          // Reset trường nhập
          this.newCategoryId = ""; // Nếu id cũng được nhập từ người dùng, hãy đảm bảo chuyển đổi về dạng chuỗi ở đây.
          this.newCategoryName = "";
        })
        .catch((error) => {
          console.error("Error adding category:", error);
          alert("Failed to add category. Please try again.");
        });
    },

    // Chỉnh sửa danh mục sản phẩm
    editCategory(index) {
      this.categories[index].editing = true;
    },
    // Lưu danh mục sản phẩm
    saveCategory(index) {
      const updatedCategory = this.categories[index];
      updatedCategory.editing = false; // Disable input after saving

      fetch(`http://localhost:3000/categories/${updatedCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update category");
          }
          return fetch("http://localhost:3000/categories");
        })
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
          // Success message
          Swal.fire({
            icon: "success",
            title: "Danh mục đã được cập nhật thành công!",
          });
        })
        .catch((error) => {
          console.error("Error updating category:", error);
          alert("Failed to update category. Please try again.");
        });
    },

    /// xóa danh mục sản phẩm
    deleteCategory(index) {
      const deletedCategoryId = this.categories[index].id;

      // Step 1: Remove the category from the categories array
      const deletedCategory = this.categories.splice(index, 1)[0];

      // Step 2: Delete the category from the database
      fetch(`http://localhost:3000/categories/${deletedCategoryId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete category");
          }
          // Step 3: Find and delete associated products from the products array
          this.products = this.products.filter((product) => {
            if (product.category_id === deletedCategoryId) {
              // Step 4: Delete associated product from the database
              fetch(`http://localhost:3000/products/${product.id}`, {
                method: "DELETE",
              }).catch((error) => {
                console.error("Error deleting associated product:", error);
              });
              return false; // Exclude this product from the products array
            }
            return true; // Keep other products in the array
          });

          // Success message
          Swal.fire({
            icon: "success",
            title: "Danh mục đã được xóa thành công!",
          });
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
          alert("Failed to delete category. Please try again.");
        });
    },

    // Thêm sản phẩm mới
    async addProduct() {
      if (!this.newProduct.image) {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Vui lòng chọn hình ảnh sản phẩm.",
        });
        return; // Không thêm sản phẩm nếu không có hình ảnh
      }

      try {
        // Lấy danh sách sản phẩm từ API để tìm ID lớn nhất
        const productsResponse = await fetch("http://localhost:3000/products");
        if (!productsResponse.ok) {
          throw new Error("Lỗi khi lấy danh sách sản phẩm");
        }
        const productsData = await productsResponse.json();

        // Tìm ID lớn nhất
        // Tìm ID lớn nhất
        let maxProductId = Math.max(
          ...productsData.map((product) => parseInt(product.id))
        );

        // Nếu ID lớn nhất nhỏ hơn "20", sử dụng "20" làm ID cho sản phẩm mới
        // Ngược lại, tăng ID lớn nhất lên một đơn vị và chuyển đổi sang chuỗi
        const newProductId = (maxProductId >= 20 ? maxProductId + 1 : 20).toString();

        // Gán ID mới cho sản phẩm mới
        this.newProduct.id = newProductId;

        // Thêm sản phẩm mới
        const response = await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.newProduct),
        });
        if (response.ok) {
          // Thêm sản phẩm thành công
          Swal.fire({
            icon: "success",
            title: "Sản phẩm đã được thêm thành công!",
          });
          this.fetchProducts(); // Cập nhật danh sách sản phẩm
          this.closeModal("addProductModal");
          this.newProduct = {}; // Xóa dữ liệu nhập của sản phẩm mới
        } else {
          throw new Error("Lỗi khi thêm sản phẩm");
        }
      } catch (error) {
        // Xử lý lỗi
        console.error("Đã xảy ra lỗi:", error);
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi thêm sản phẩm.",
        });
      }
    },

    handleImageChange(event) {
      const file = event.target.files[0]; // Lấy tệp hình ảnh từ sự kiện change
      if (file) {
        // Gán tên của tệp hình ảnh cho thuộc tính image trong đối tượng newProduct
        this.newProduct.image = file.name;
      }
    },
    // Xóa sản phẩm
    deleteProduct(productId) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          // Nếu người dùng xác nhận xóa sản phẩm
          fetch(`http://localhost:3000/products/${productId}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                // Xóa sản phẩm thành công
                Swal.fire({
                  icon: "success",
                  title: "Sản phẩm đã được xóa thành công!",
                });
                return this.fetchProducts();
                // Cập nhật giao diện nếu cần
              } else {
                // Xảy ra lỗi khi xóa sản phẩm
                throw new Error("Lỗi khi xóa sản phẩm");
              }
            })
            .catch((error) => {
              // Xử lý lỗi
              console.error("Đã xảy ra lỗi:", error);
              Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: "Đã xảy ra lỗi khi xóa sản phẩm.",
              });
            });
        }
      });
    },
    searchProduct() {
      // Lọc danh sách sản phẩm dựa trên từ khóa tìm kiếm
      this.products = this.products.filter((product) => {
        // Chuyển đổi tên sản phẩm sang chữ thường để tìm kiếm không phân biệt chữ hoa chữ thường
        const productName = product.name.toLowerCase();
        const keyword = this.searchKeyword.toLowerCase();

        // Kiểm tra xem từ khóa tìm kiếm có xuất hiện trong tên sản phẩm không
        return productName.includes(keyword);
      });
    },
    // lấy tài khoản người dùng từ server
    fetchUsers() {
      fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },
    // Thêm tài khoản khách hàng
    async addUser() {
      try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await this.checkExistingUser(this.newUser.email);
        if (existingUser) {
          this.closeModal("addUserModal");
          Swal.fire({
            icon: "error",
            text: "Email đã tồn tại.",
          });
          // throw new Error("Email đã tồn tại");
        } else {
          // Thêm tài khoản mới
          const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.newUser),
          });
          if (response.ok) {
            // Thêm tài khoản thành công
            Swal.fire({
              icon: "success",
              title: "Tài khoản đã được thêm thành công!",
            });
            this.fetchUsers(); // Cập nhật danh sách tài khoản
            this.closeModal("addUserModal");
            this.newUser = {}; // Xóa dữ liệu nhập của tài khoản mới
          } else {
            throw new Error("Lỗi khi thêm tài khoản người dùng");
          }
        }

      } catch (error) {
        // Xử lý lỗi
        console.error("Đã xảy ra lỗi:", error);
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi thêm tài khoản người dùng.",
        });
      }
    },
    // kiểm tra email đã có trong tài khoản hay chưa
    async checkExistingUser(email) {
      const response = await fetch("http://localhost:3000/users?email=" + email);
      const data = await response.json();
      return data.length > 0 ? true : false;
    },
    // Xóa tài khoản khách hàng
    deleteUser(userId) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa tài khoản này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          // Nếu người dùng xác nhận xóa sản phẩm
          fetch(`http://localhost:3000/users/${userId}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                // Xóa sản phẩm thành công
                Swal.fire({
                  icon: "success",
                  title: "Tài khoản đã được xóa thành công!",
                });
                return this.fetchUsers();
                // Cập nhật giao diện nếu cần
              } else {
                // Xảy ra lỗi khi xóa sản phẩm
                throw new Error("Lỗi khi xóa tài khoản");
              }
            })
            .catch((error) => {
              // Xử lý lỗi
              console.error("Đã xảy ra lỗi:", error);
              Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: "Đã xảy ra lỗi khi xóa tài khoản.",
              });
            });
        }
      });
    },
    // lấy hóa đơn từ server
    fetchHoaDons() {
      fetch("http://localhost:3000/hoadons")
        .then((response) => response.json())
        .then((data) => {
          this.HoaDons = data;
        })
        .catch((error) => {
          console.error("Error fetching hoadons:", error);
        });
    },
    // Xóa hóa đơn
    deleteHoaDon(HoaDonId) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa hóa đơn này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          // Nếu người dùng xác nhận xóa hóa đơn
          fetch(`http://localhost:3000/hoadons/${HoaDonId}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                // Xóa hóa đơn thành công
                Swal.fire({
                  icon: "success",
                  title: "Hóa đơn đã được xóa thành công!",
                });
                return Promise.resolve();
                // Cập nhật giao diện nếu cần
              } else {
                // Xảy ra lỗi khi xóa hóa đơn
                throw new Error("Lỗi khi xóa sản phẩm");
              }
            })
            .then(() => {
              // Cập nhật giao diện nếu cần
              return this.fetchHoaDons();
            })
            .catch((error) => {
              // Xử lý lỗi
              console.error("Đã xảy ra lỗi:", error);
              Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: "Đã xảy ra lỗi khi xóa sản phẩm.",
              });
            });
        }
      });
    },
    // Hiện trạng thái của hóa đơn
    getStatusHoaDon(status) {
      switch (status) {
        case '1':
          return 'Chưa giao';
        case '2':
          return 'Đang giao';
        case '3':
          return 'Đã giao';
        default:
          return 'Không xác định';
      }
    },
  },
};
</script>

<style src="@/assets/admin-dashboard.css" scoped></style>
