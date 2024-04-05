<template>
    <div class="container" style="margin-top: 200px">
        <form @submit.prevent="register">
            <div class="mb-3">
                <label for="email" class="form-label">Tên</label>
                <input type="text" class="form-control" id="name" v-model="name" placeholder="Tên" />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Email" required />
                <div v-if="emailError" class="text-danger">Email không hợp lệ</div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Số điện thoại</label>
                <input type="text" class="form-control" id="phone" v-model="phone" placeholder="Số điện thoại" />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Địa chỉ</label>
                <input type="text" class="form-control" id="address" v-model="address" placeholder="Địa chỉ" />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" min="6"
                    required />
                <div v-if="passwordError" class="text-danger">
                    Password phải chứa ít nhất 6 ký tự.
                </div>
            </div>
            <button type="submit" class="btn btn-primary">
                Register
            </button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Swal from 'sweetalert2'
export default {
    name: "RegisterComponent",
    data() {
        return {
            name: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            emailError: false,
            passwordError: false,
        };
    },
    mounted(){
        this.$store.dispatch('fetchUsers')
    },
    methods: {
        validateEmail() {
            this.emailError = this.email.length < 3 || !this.email.includes("@");
        },
        validatePassword() {
            this.passwordError = this.password.length < 6;
        },
        async register() {
            try {
                const inValid=this.users.find((user)=>user.email==this.email);
                if(!inValid){
                    const maxIds = Math.max(...this.users.map(ct => ct.id)) + 1;
                    await this.$store.dispatch("register", {
                        id:maxIds.toString(),
                        name: this.name,
                        email: this.email,
                        phone: this.phone,
                        address: this.address,
                        role: 0,
                        password: this.password,
                    });

                }else{
                   
                    Swal.fire({
                    title: 'Đăng kí',
                    text: 'Thất bại',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                }
            } catch (error) {
                // Xử lý lỗi đăng nhập
                console.error("Lỗi đăng kí:", error);
            }
        },
    },
    computed: {
        ...mapState(['users']),
    }
};
</script>

<style>
/* Add your custom styles here */
</style>