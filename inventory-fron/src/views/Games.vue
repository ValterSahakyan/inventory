<template>
  <div class="container mt-4">
    <Toolbar link="/create/games" page="Games" />
    <div class="container">
      <div class="row">
        <div v-for="[key, value] of Object.entries(games)" class="col-6 col-md-4 col-lg-4 mt-2" style="padding: 1px;" :key="key">
          <Card :id="value._id" :url="value.image" :title="value.title" :description="value.description"
                :updated="value.updated" :editLink="`/update/games/${value._id}`" type="Games"/>
        </div>
      </div>
      <nav aria-label="Page navigation example" class="mt-3">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#" @click="previousPage">Previous</a></li>
          <li class="page-item" v-for="i in (Math.ceil(totalCount/limit))" :key="i"><a :class="`page-link ${i === page ? 'active' : ''}`" href="#" @click="changePage(i)">{{i}}</a></li>
          <li class="page-item"><a class="page-link" href="#" @click="nextPage">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar';
import Card from '@/components/Card';
import axios from "axios";

export default {
  name: 'GamesComponent', components: {
    Toolbar, Card
  },
  data() {
    return {
      games: [ ],
      totalCount: 0,
      page: 1,
      limit: 6
    }
  },
  mounted() {
    axios.get(`http://localhost:5000/item/games?offset=${(this.page - 1)*this.limit}&limit=${this.limit}`,{
      headers:{
        'Accept': 'application/json'
      }
    }).then((res) => {
      this.games = res.data.items;
      this.totalCount = res.data.totalCount;
    })
  },
  watch:{
    page(){
      axios.get(`http://localhost:5000/item/games?offset=${(this.page - 1)*this.limit}&limit=${this.limit}`,{
        headers:{
          'Accept': 'application/json'
        }
      }).then((res) => {
        this.games = res.data.items;
      })
    }
  },
  methods: {
    changePage(page) {
      if(page !== this.page){
        this.page = page;
      }
    },
    nextPage() {
      if (this.page !== Math.ceil(this.totalCount/this.limit)){
        this.page += 1;
      }
    },
    previousPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
    }
  }
}
</script>