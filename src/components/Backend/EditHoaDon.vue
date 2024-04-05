<!-- Trong file views/editHoaDon.vue -->
<template>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <div class="main">
      <h3>Chỉnh sửa hóa đơn</h3>
      <p>Admin/editHoaDon</p>
      <div class="card">
        <form @submit.prevent="updateHoaDon">
          <div class="row">
            <div class="col-6">
                <label style="color: black" for="userName">Id tài khoản người dùng:</label>
                <input
                  type="number"
                  class="form-control"
                  id="userName"
                  v-model="editedHoaDon.user_id"
                  required
                  readonly
                />
                <label style="color: black" for="userName">Tổng Tiền:</label>
                <input
                  type="text"
                  class="form-control"
                  id="userName"
                  v-model="editedHoaDon.total_amount"
                  required
                  readonly
                />
                <label style="color: black" for="userPhone">Số điện thoại:</label>
                <input
                  type="text"
                  class="form-control"
                  id="userPhone"
                  v-model="editedHoaDon.phone"
                  required
                />
                <label style="color: black" for="userDiachi">Địa chỉ:</label>
                <input
                  type="text"
                  class="form-control"
                  id="userDiachi"
                  v-model="editedHoaDon.diachi"
                  required
                />
                <label style="color: black" for="userPassword">Trạng thái:</label
                >
                <select v-model="editedHoaDon.status">
                    <option value="1">Chưa giao</option>
                    <option value="2">Đang giao</option>
                    <option value="3">Đã giao</option>
                </select> <br>
              
            </div>
            <!-- cột 2 -->
            <div class="col-6">
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
        editedHoaDon: {}, // Dữ liệu sản phẩm sẽ được chỉnh sửa
      };
    },
    methods: {
      async updateHoaDon() {
        try {
          const HoaDonId = this.$route.params.id;
          const response = await fetch(`http://localhost:3000/hoadons/${HoaDonId}`, {
            method: "PUT", // hoặc 'PATCH' tùy vào phương thức bạn sử dụng để cập nhật sản phẩm
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editedHoaDon),
          });
          if (response.ok) {
            // Hiển thị thông báo thành công
            Swal.fire({
              icon: "success",
              title: "Hóa đơn đã được cập nhật thành công!",
            });
            return this.$router.push("/admin");
          } else {
            throw new Error("Failed to update product");
          }
        } catch (error) {
          console.error("Error:", error);
          // Xử lý lỗi
          Swal.fire({
            icon: "error",
            title: "Đã xảy ra lỗi khi cập nhật hóa đơn",
          });
        }
      },
      async getHoaDonDetails() {
        const HoaDonId = this.$route.params.id; // Lấy id của sản phẩm từ route
        try {
          const response = await fetch(`http://localhost:3000/hoadons/${HoaDonId}`);
          if (response.ok) {
            this.editedHoaDon = await response.json();
          } else {
            throw new Error("Failed to fetch hoadon details");
          }
        } catch (error) {
          console.error("Đã xảy ra lỗi khi cập nhật hóa đơn:", error);
          // Xử lý lỗi
        }
      },
    },
    created() {
      // Trong created hook, gọi hàm getProductDetails để lấy thông tin chi tiết của sản phẩm cần chỉnh sửa
      this.getHoaDonDetails();
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
  