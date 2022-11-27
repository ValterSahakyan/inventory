<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Inventory</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/books">Books</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/games">Games</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gifts">Gifts</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/materials">Materials</router-link>
          </li>
        </ul>
        <div class="form-group d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="title">
          <button class="btn btn-outline-success" @click="searchItems" :disabled="!title">Search</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'NavBar', data() {
    return {
      title: ''
    }
  }, methods: {
    searchItems() {
      if (this.title) {
        this.$router.push(`/search/${this.title}`)
      }
    }
  }
}
</script>