<template>
  <div class="container mt-4">
    <Toolbar link="" page="Search" />
    <div class="container mt-2">
      <div class="row">
        <div v-for="(value, key) in data" class="col-6 col-md-4 col-lg-4 mt-2" style="padding: 1px;" :key="value?.id">
          <Card :id="value?.id" :url="value?.image" :title="value?.title" :description="value.description"
                :updated="value.updated"
                :editLink="`/update/${getLink(key)}/${value.id}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar';
import Card from '@/components/Card';
import axios from "axios";

export default {
  name: 'SearchComponent', components: {
    Toolbar, Card
  },
  props: ['title'],
  data() {
    return {
      data: [], counts: []
    }
  },
  mounted() {
    if (this.title) {
      this.getResult();
    } else {
      this.$router.push('/');
    }
  },
  watch: {
    title (){
      if (this.title) {
        this.getResult();
      }
    }
  },
  methods: {
    getResult(){
      axios.post(`http://localhost:5000/search`, {
        title: this.title
      }, {
        headers: {
          'Accept': 'application/json',
          'x-access-token': localStorage.getItem('token')

        }
      }).then((res) => {
        this.data = res.data.data;
        this.counts = res.data.counts;
      })
    },
    getLink(key){
      if(key < this.counts[0]){
        return 'books';
      }
      if(key < this.counts[0] + this.counts[1]){
        return 'gifts';
      }
      if(key < this.counts[0] + this.counts[1] + this.counts[2]){
        return 'games';
      }

      return 'materials';
    }
  }
}
</script>