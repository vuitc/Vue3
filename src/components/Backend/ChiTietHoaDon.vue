<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    <div class="main">

        <div class="table-data" style="margin: 40px 0 0 400px;">
            <div class="order">
                <div class="head">
                    <h3>Chỉnh sửa tài khoản người dùng</h3>
                    <p>Admin/editUser</p>
                    <h3 style="color: black">Chi tiết hóa đơn</h3>
                    <i class="bx bx-search"></i>
                    <i class="bx bx-filter"></i>
                </div>
                <table>
                    <thead>
                        <tr style="color: black; font-size: larger">
                            <th>Id hóa đơn: {{ hoadon_id }}</th>
                            <th>Id sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá tiền</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ChiTietHoaDon in filteredChiTietHoaDons" :key="ChiTietHoaDon.id">
                            <td style="color: black">{{ ChiTietHoaDon.hoadon_id }}</td>
                            <td>
                                <span class="status completed">{{ ChiTietHoaDon.product_id }}</span>
                            </td>
                            <td>
                                <span class="status completed">{{ ChiTietHoaDon.quantity }}</span>
                            </td>
                            <td>
                                <span class="status completed">{{ ChiTietHoaDon.price }}</span>
                            </td>
                            <td></td>
                            <td></td>
                            <div v-for="HoaDon in HoaDons" :key="HoaDon.id">
                                <td v-if="checkStatus(HoaDons, ChiTietHoaDon.hoadon_id) && ChiTietHoaDon.hoadon_id === hoadon_id
                                && HoaDon.status === '1' && ChiTietHoaDon.hoadon_id === HoaDon.id"
                                >
                                    <button
                                        style="width: 70px" class="btn btn-danger" 
                                        @click="deleteChiTietHoaDon(ChiTietHoaDon.id)">
                                        Xóa
                                    </button>
                                </td>
                            </div>

                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import router from "@/router";

export default {
    data() {
        return {
            hoadon_id: null,
            HoaDons: [],
            ChiTietHoaDons: [],
        };
    },
    computed: {
        filteredChiTietHoaDons() {
            if (this.ChiTietHoaDons && this.ChiTietHoaDons.length > 0) {
                return this.ChiTietHoaDons.filter(item => item.hoadon_id === this.hoadon_id);
            } else {
                return [];
            }
        }
    },
    methods: {
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
        // lấy chi tiết hóa đơn từ server
        fetchChiTietHoaDons() {
            fetch("http://localhost:3000/chitiethoadons")
                .then((response) => response.json())
                .then((data) => {
                    this.ChiTietHoaDons = data;
                    // this.ChiTietHoaDons = data.filter(item => item.hoadon_id === this.hoadon_id);
                })
                .catch((error) => {
                    console.error("Error fetching chitiethoadons:", error);
                });
        },
        // Xóa chi tiết hóa đơn
        deleteChiTietHoaDon(ChiTietHoaDonId) {
            Swal.fire({
                title: "Bạn có chắc chắn muốn xóa chi tiết hóa đơn này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Nếu người dùng xác nhận xóa chi tiết hóa đơn
                    fetch(`http://localhost:3000/chitiethoadons/${ChiTietHoaDonId}`, {
                        method: "DELETE",
                    })
                    .then((response) => {
                        if (response.ok) {
                            // Xóa chi tiết hóa đơn thành công
                            Swal.fire({
                                icon: "success",
                                title: "Chi tiết hóa đơn đã được xóa thành công!",
                            });
                            // Cập nhật giao diện nếu cần
                            return this.fetchChiTietHoaDons();
                        } else {
                            // Xảy ra lỗi khi xóa sản phẩm
                            throw new Error("Lỗi khi xóa chi tiết hóa đơn");
                        }
                    })
                    .catch((error) => {
                        // Xử lý lỗi
                        console.error("Đã xảy ra lỗi:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Lỗi!",
                            text: "Đã xảy ra lỗi khi xóa chi tiết hóa đơn.",
                        });
                    });
                }
            });
        },
         // Kiểm tra trạng thái của hóa đơn
        checkStatus(HoaDons, hoadon_id) {
            const HoaDon = HoaDons.find(hoadon => hoadon.id === hoadon_id);
            return HoaDon && HoaDon.status === '1';
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
    created() {
        // Trong created hook, gọi hàm getProductDetails để lấy thông tin chi tiết của sản phẩm cần chỉnh sửa
        this.hoadon_id = this.$route.params.id;
        this.fetchHoaDons();
        this.fetchChiTietHoaDons();
    },
    watch: {
        '$route.params.id': function (newVal) {
            this.hoadon_id = newVal;
            this.fetchChiTietHoaDons();
        }
    }
};
</script>
<style>
label {
    font-weight: bold;
}

label,
input {
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