<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">Shop</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Shop</li>
        </ol>
    </div>
    <!-- Single Page Header End -->

    <!-- Fruits Shop Start-->
    <div class="container-fluid fruite py-5">
        <div class="container py-5">
            <h1 class="mb-4  text-primary">Fresh fruits shop</h1>
            <div class="row g-4">
                <div class="col-lg-12">
                    <div class="row g-4">
                        <div class="col-xl-3">
                            <div class="input-group">
                                <input type="search" class="form-control p-3" placeholder="keywords"
                                    aria-describedby="search-icon-1" v-model="searchKeyword"
                                    @keyup.enter="performSearch" style="margin-top: 0" />
                                <span id="search-icon-1" class="input-group-text p-3" @click="performSearch">
                                    <i class="fa fa-search"></i>
                                </span>

                            </div>

                        </div>
                        <div class="col-6"></div>
                        <div class="col-xl-3">
                            <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                <label for="fruits">Default Sorting:</label>
                                <select id="fruits" name="fruitlist" class="border-0 form-select-sm bg-light me-3"
                                    form="fruitform" v-model="sortingOrder" @change="handleSortChange">
                                    <option value="asc">Asc</option>
                                    <option value="desc">Desc</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-3">
                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <h4 class="text-primary">Categories</h4>
                                        <ul class="list-unstyled fruite-categorie">
                                            <li v-for="cat in categories" :key="cat.id">
                                                <div class="d-flex justify-content-between fruite-name">
                                                    <a @click="filteredProductsByCategory(cat.id)"
                                                        style="cursor: pointer" :class="{
                                        'text-dark': cat.id !== selectedCategory,
                                        'text-primary': cat.id === selectedCategory,
                                    }">
                                                        <i class="fas fa-apple-alt me-2"></i>
                                                        {{ cat.name }}
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="row g-4 justify-content-start tab-content">
                                <!-- Tất cả sản phẩm -->
                                <div class="col-md-6 col-lg-6 col-xl-4" v-for="product in filteredProducts || products"
                                    :key="product.id">
                                    <div class="rounded position-relative fruite-item">
                                        <router-link :to="'/detail/' + product.id">
                                            <div class="fruite-img">
                                                <img :src="'img/' + product.image" class="img-fluid w-100 rounded-top"
                                                    alt="" />
                                            </div>
                                        </router-link>
                                        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                            style="top: 10px; left: 10px">
                                            {{ product.category_id }}
                                        </div>
                                        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                            <h6 class="text-center">{{ product.name }}</h6>
                                            <h6 class="text-left"> Số lượng tồn: {{ product.quantity }}</h6>
                                            <div class="d-flex justify-content-start flex-lg-wrap mb-3">
                                                <p class="text-dark fs-5 fw-bold mb-0 text-center">
                                                 Giá :  {{ product.price }}
                                                </p>
                                                <!-- <a style="cursor: pointer" @click="
                                                    addToCart(product.id);
                                                console.log(product.id);
                                                ">Thêm vào giỏ hàng
                                                </a> -->
                                               
                                            </div>
                                            <a href="#" style="cursor: pointer" @click="addToCart(product.id)"
                                                class="btn border border-secondary rounded-pill px-3 text-primary d-flex justify-content-center">
                                                <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to
                                                cart
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Fruits Shop End-->
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    name: "ShopCompoment",
    data() {
        return {
            sortingOrder: "asc",
            selectedCategory: null,
            filteredProducts: null,
            searchKeyword: "",
        };
    },
    mounted() {
        // Gọi action fetchProducts từ store để lấy danh sách sản phẩm từ server
        this.$store.dispatch("fetchProducts");
        this.$store.dispatch("fetchCategories");
    },
    computed: {
        // Sử dụng mapState để truy cập dữ liệu từ Vuex store
        ...mapState(["products", "categories"]),
        ...mapGetters({ allProducts: "allProducts" }),
    },
    methods: {
        addToCart(productId) {
            this.$store.dispatch("addToCart", { productId, quantity: 1 });
        },

        handleSortChange() {
            let filtered = this.allProducts;
            if (this.selectedCategory) {
                filtered = this.allProducts.filter(
                    (product) => product.category_id == this.selectedCategory
                );
            }
            if (this.sortingOrder === "asc") {
                this.filteredProducts = filtered.slice().sort((a, b) => a.id - b.id);
            } else {
                this.filteredProducts = filtered.slice().sort((a, b) => b.id - a.id);
            }
        },
        filteredProductsByCategory(id) {
            this.selectedCategory = id;
            this.handleSortChange();
        },
        performSearch() {
            let filtered = this.allProducts;
            if (this.selectedCategory) {
                filtered = filtered.filter(
                    (product) => product.category_id == this.selectedCategory
                );
            }
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase().trim();
                filtered = filtered.filter((product) =>
                    product.name.toLowerCase().includes(keyword)
                );
            }
            if (this.sortingOrder === "asc") {
                this.filteredProducts = filtered.slice().sort((a, b) => a.id - b.id);
            } else {
                this.filteredProducts = filtered.slice().sort((a, b) => b.id - a.id);
            }
            if (this.filteredProducts.length == 0) {
                alert('Không tim thấy sản phẩm phù hợp');
                this.filteredProducts = this.allProducts;
            }
        },
    },
}
</script>

<style></style>
