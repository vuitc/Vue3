<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h1 class="text-center text-white display-6">Shop Detail</h1>
    <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item"><a href="#">Pages</a></li>
      <li class="breadcrumb-item active text-white">Shop Detail</li>
    </ol>
  </div>
  <!-- Single Page Header End -->

  <!-- Single Product Start -->
  <div class="container-fluid py-5 mt-5">
    <div class="container py-5">
      <div class="row g-4 mb-5">
        <div class="col-lg-12 col-xl-12">
          <div class="row g-4">
            <div class="col-lg-6">
              <div class="border rounded">
                <a href="#" v-if="detail">
                  <img
                    :src="'/img/' + detail.image"
                    class="img-fluid w-100 rounded-top"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div v-if="detail" class="col-lg-6">
              <h4 class="fw-bold mb-3 text-primary">{{ detail.name }}</h4>
              <h5 class="mb-3 text-danger">{{ detail.price }}đ</h5>
              <div class="d-flex mb-4">
                <!-- Rating stars: You can replace this with actual rating data if available -->
                <i class="fa fa-star text-secondary"></i>
                <i class="fa fa-star text-secondary"></i>
                <i class="fa fa-star text-secondary"></i>
                <i class="fa fa-star text-secondary"></i>
                <i class="fa fa-star"></i>
              </div>
              <!-- Description: Replace with actual detail description -->
              <p class="mb-4">{{ detail.description }}</p>
              <p class="mb-4">Số lượng tồn: {{ detail.quantity }}</p>
              <p class="mb-4">
                <!-- Additional details: You can add more detail details here -->
              </p>
              <div class="input-group quantity mb-5" style="width: 100px" v-if="detail">
                <div class="input-group-btn" style="padding-top:14px">
                  <button class="btn btn-sm btn-minus rounded-circle bg-light border" @click="decrementQuantity" style="">
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control form-control-sm text-center border-0"
                  :min="1"
                  :max="detail.quantity"
                  v-model="quantity"
                  readonly
                  style="max-height: 40px;"
                />
                <div class="input-group-btn" style="padding-top:14px">
                  <button class="btn btn-sm btn-plus rounded-circle bg-light border" @click="incrementQuantity" style="">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <!-- Add to cart button -->
              <a
              @click="addToCart(detail.id)"
                class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                v-if="detail"
                ><i class="fa fa-shopping-bag me-2 text-primary" ></i> Add to cart</a
              >
            </div>

           
           
          </div>
        </div>
      </div>
    
    </div>
  </div>

  <!-- Single Product End -->
</template>

<script>
export default {
  name: "DetailComponent",
  data() {
    return {
      detail: {},
      quantity:1,
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      try {
        const productId = this.$route.params.id; // Lấy id từ route params, không phải từ this.route.params.id
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        if (response.ok) {
          this.detail = await response.json();
        } else {
          throw new Error("Failed to fetch product details");
        }
      } catch (error) {
        console.error(error);
      }
    },
    incrementQuantity() {
      if(this.quantity>=this.detail.quantity){
        this.quantity=this.detail.quantity;
      }else{
        this.quantity++;
      }
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart(productId) {
            this.$store.dispatch("addToCart", { productId, quantity:this.quantity });
    },
  },
};
</script>



<style></style>
