<template>
  <div class="card" style="width: auto; cursor: pointer;">
    <div class="card-body d-flex flex-column justify-content-start">
      <h5 class="card-title text-start text-black text-decoration-none">{{ full_name }}</h5>
      <p class="text-start">
        {{ email }}
      </p>
      <a href="#" @click="editItem">Update</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserCardComponent', props: [ 'id', 'full_name', 'email', 'editLink'], methods: {
    editItem() {
      this.$router.push(this.editLink);
    }
  }
}
</script>