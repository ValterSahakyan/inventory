<template>
  <Toolbar :page="page" :detail="true"/>
  <div style="width: auto;" class="mt-3">
    <div class="row">
      <div v-for="(value, index) in fields" :key="index" :class="value.column || 'col-6'">
        <div class="form-group">
          <template v-if="value.type==='input'">
            <div class="mb-3">
              <label :for="'field' + index" class="form-label">{{value.label}}</label>
              <input v-model="value.value" type="text" class="form-control" :id="'field' + index" :placeholder="value.placeholder">
            </div>
          </template>
          <template v-else-if="value.type==='select'">
            <div class="mb-3">
              <label :for="'field' + index" class="form-label">{{value.label}}</label>
              <select class="form-select" :aria-label="value.placeholder" id="'field' + index" v-model="value.value">
                <option selected disabled>{{ value.placeholder }}</option>
                <option v-for="(item, key) in value.options" :key="key" :value="item.id" >{{item.text}}</option>
              </select>
            </div>
          </template>
          <template v-else>
            <div class="mb-3">
              <label :for="'field' + index" class="form-label">{{value.label}}</label>
              <textarea v-model="value.value" class="form-control" :id="'field' + index" rows="5" :placeholder="value.placeholder"></textarea>
            </div>
          </template>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary" @click="saveItems">Save</button>
        <template v-if="id">
          <button class="btn btn-danger" @click="deleteItems">Delete</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import { fields } from '@/constants/fields';
import axios from 'axios';
import Toolbar from '@/components/Toolbar';

export default {
  name: 'CreateItem',
  props: [ 'page', 'id' ],
  components: {
    Toolbar
  },
  mounted() {
    if(this.id){
      axios.get(`http://localhost:5000/item/${this.page}/${this.id}`,{
        headers:{
          'Accept': 'application/json'
        }
      }).then((res) => {
        this.fields.map((item) => {
          item.value = res.data[item.name]
        })
      })
    }else{
      this.fields.map((item) => {
        item.value = ''
      })
    }
  },
  data(){
    return {
      fields: this.id ? fields[this.page] : fields[this.page]
    }
  },
  methods: {
    saveItems(){
      let data = {};
      this.fields.forEach((field) =>{
        data[field.name] = field.value
      })
      axios.post(`http://localhost:5000/item/${this.page}/${this.id ?? ''}`,data,{
        headers:{
          'Accept': 'application/json'
        }
      }).then(() => {
        this.fields.map((item) => {item.value = ''})

        this.$router.push(`/${this.page}`)
      })
    },
    deleteItems(){
      axios.delete(`http://localhost:5000/item/${this.page}/${this.id}`,{
        headers:{
          'Accept': 'application/json'
        }
      }).then(() => {
        this.$router.push(`/${this.page}`)
      })
    }
  }
}
</script>