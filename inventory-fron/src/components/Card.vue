<template>
  <div class="card" style="width: auto; cursor: pointer;" @click="editItem">
    <div class="card-header p-0">
      <div style="background: rgba(0, 0, 0, 0.175); width: auto; height: 250px;">
        <img :src="url" alt="..." style="height: 100%; width: 100%; object-fit: contain">
      </div>
    </div>
    <div class="card-body d-flex flex-column justify-content-start">
      <h5 class="card-title text-start text-black text-decoration-none">{{ title }}</h5>
      <p class="text-start">
        {{ type }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardComponent', props: [ 'id', 'url', 'title', 'description', 'editLink', 'type' ], methods: {
    editItem() {
      this.$router.push(this.editLink);
    }
  }
}
</script>