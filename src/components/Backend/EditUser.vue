<!-- Trong file views/editUser.vue -->
<template>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <div class="main">
      <h3>Chỉnh sửa tài khoản người dùng</h3>
      <p>Admin/editUser</p>
      <div class="card">
        <form @submit.prevent="updateUser">
          <div class="row">
            <div class="col-6">
              <label style="color: black" for="userName">Tên tài khoản:</label>
                <input
                  type="text"
                  class="form-control"
                  id="userName"
                  v-model="editedUser.name"
                  required
                />
                <label style="color: black" for="userEmail">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  id="userEmail"
                  v-model="editedUser.email"
                  @input="checkDuplicateEmail"
                  required
                />
                <label v-if="emailExists" style="color: red;">Email đã tồn tại </label> <br>
                <label style="color: black" for="userPhone">Số điện thoại:</label>
                <input
                  type="text"
                  class="form-control"
                  id="userPhone"
                  v-model="editedUser.phone"
                  required
                />
            </div>
            <!-- cột 2 -->
            <div class="col-6">
              <label style="color: black" for="userDiachi">Địa chỉ:</label>
                <input
                  type="text"
                  class="form-control"
                  id="userDiachi"
                  v-model="editedUser.diachi"
                  required
                />
                <label style="color: black" for="userPassword">Mật khẩu:</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="userPassword"
                  v-model="editedUser.password"
                  required
                />
              <button class="btn btn-primary ">Cập nhật</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        editedUser: {}, // Dữ liệu sản phẩm sẽ được chỉnh sửa
        emailExists: false
      };
    },
    methods: {
      async updateUser() {
        try {
          const UserId = this.$route.params.id;
          const updatedUser = this.editedUser;
          // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay không
          const existingUser = await this.checkExistingUser(updatedUser.email);
          if (existingUser && existingUser.id !== UserId) {
            this.emailExists = true;
            throw new Error("Email đã tồn tại trong hệ thống");
          } else {
              this.emailExists = false; // Đặt biến emailExists thành false để ẩn lỗi trên giao diện
          }

          const response = await fetch(`http://localhost:3000/users/${UserId}`, {
            method: "PUT", // hoặc 'PATCH' tùy vào phương thức bạn sử dụng để cập nhật sản phẩm
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editedUser),
          });
          if (response.ok) {
            // Hiển thị thông báo thành công
            Swal.fire({
              icon: "success",
              title: "Tài khoản đã được cập nhật thành công!",
            });
            return this.$router.push("/admin");
          } else {
            throw new Error("Failed to update user");
          }
        } catch (error) {
          console.error("Error:", error);
          // Xử lý lỗi
          Swal.fire({
            icon: "error",
            title: "Đã xảy ra lỗi khi cập nhật tài khoản",
          });
        }
      },
      // Kiểm tra email đã có trong db.json chưa
      async checkExistingUser(email) {
        const response = await fetch(`http://localhost:3000/users?email=${email}`);
        const data = await response.json();
        return data.length > 0 ? data[0] : null;
      },
      async getUserDetails() {
        const userId = this.$route.params.id; // Lấy id của sản phẩm từ route
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}`);
          if (response.ok) {
            this.editedUser = await response.json();
          } else {
            throw new Error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error:", error);
          // Xử lý lỗi
          Swal.fire({
            icon: "error",
            title: "Đã xảy ra lỗi khi cập nhật tài khoản",
          });
        }
      },
    },
    created() {
      // Trong created hook, gọi hàm getProductDetails để lấy thông tin chi tiết của sản phẩm cần chỉnh sửa
      this.getUserDetails();
    },
  };
  </script>
  <style>
  label {
    font-weight: bold;
  }
  label , input {
    margin-top: 10px;
  }
  .main {
    margin: 50px;
    padding-top: 20px;
  }
  .card {
    padding: 20px;
    margin-top: 20px;
  }
  </style>
  