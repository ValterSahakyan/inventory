<template>
     <div class="container mt-4">
    <Toolbar link="/create/users" page="Users" />
    <div class="container">
      <div class="row">
        <div v-for="[key, value] of Object.entries(users)" class="col-6 col-md-3 col-lg-3 mt-2" style="padding: 1px;" :key="key">
          <UserCard :id="value._id" :email="value.email" :full_name="value.full_name" :editLink="`/update/users/${value._id}`" type="Users"/>
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
import UserCard from '@/components/UserCard';
import axios from "axios";

export default {
  name: 'UsersComponent', components: {
    Toolbar, UserCard
  },
  data() {
    return {
      users: [ ],
      totalCount: 0,
      page: 1,
      limit: 6
    }
  },
  mounted() {
    axios.get(`http://localhost:5000/item/users?offset=${(this.page - 1)*this.limit}&limit=${this.limit}`,{
      headers:{
        'Accept': 'application/json',
        'x-access-token': localStorage.getItem('token')

      }
    }).then((res) => {
      this.users = res.data.items;
      this.totalCount = res.data.totalCount;
    })
  },
  watch:{
    page(){
      axios.get(`http://localhost:5000/item/users?offset=${(this.page - 1)*this.limit}&limit=${this.limit}`,{
        headers:{
          'Accept': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      }).then((res) => {
        this.users = res.data.items;
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