<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <div class="card h-100">
          <div class="card-body d-flex align-items-center">
            <div>
              <h1 class="card-title text-start">Inventory system</h1>
              <p class="card-text text-start">This is modified jumbotron that occupies the entire horizontal space of its
                parent</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-6">
        <div class="card" style="border: none;">
          <div class="card-body d-flex justify-content-center">
            <Chart />
          </div>
        </div>
      </div>
    </div>
    <template v-if="isLoggedIn">
      <div class="card" style="border: none;">
        <div class="row">
          <div v-for="[key, value] of Object.entries(categories)" class="col-6 col-md-4 col-lg-3" style="padding: 0;" :key="key">
            <div class="card-body">
              <router-link class="card text-decoration-none" style="width: auto;" :to="value.link">
                <div style="background: rgba(0, 0, 0, 0.175); width: auto; height: 250px;">
                  <img :src="value.img" alt="..." style="height: 100%; width: 100%;">
                </div>

                <div class="card-body">
                  <h5 class="card-title text-start text-black text-decoration-none">{{ value.title }}</h5>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Chart from '@/components/Chart';
import { mapGetters } from "vuex";
export default {
  name: 'HomeComponent',
  components: { Chart },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data() {
    return {
      categories: [
          { title: "Books", link: "/books", img: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&h=502&fit=crop&dpr=1" },
          { title: "Games", link: "/games", img: "https://media.istockphoto.com/id/1334436084/photo/top-down-view-of-colorful-illuminated-gaming-accessories-laying-on-table.jpg?s=612x612&w=0&k=20&c=E9xnbAZoBS5LlUX0q-zxT_3m6gEZpyB2k51_U4LLMNs=" },
          { title: "Gifts", link: "/gifts", img: "https://media.istockphoto.com/id/1383842766/photo/gift-image-for-fathers-day-and-men.jpg?b=1&s=170667a&w=0&k=20&c=Ndk5R-GxsHlrSMV9DNjACm4RzW4JFP9YIDHx8VUhTTQ=" },
          { title: "Materials", link: "/materials", img: "https://image.shutterstock.com/image-illustration/set-construction-materials-tools-isolated-260nw-691574113.jpg" }
      ],
    }
  }
}
</script>