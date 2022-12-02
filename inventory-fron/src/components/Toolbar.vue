<template>
  <div class="bg-light">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center p-2">
        <div>
          <h5 class="m-0">Home / {{ page.charAt(0).toUpperCase() + page.slice(1) }} <span v-if="detail"> / {{page.charAt(0).toUpperCase() + page.slice(1,-1)}} Detail</span></h5>
        </div>
        <div>
          <button @click="createNewItem" class="btn btn-primary" v-if="link">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ToolBar',
  props: ['page', 'link', 'detail'],
  methods: {
    createNewItem(){
      this.$router.push(this.link)
    }
  }
}
</script>