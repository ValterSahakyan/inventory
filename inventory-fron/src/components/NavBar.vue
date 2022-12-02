<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container">
      <template v-if="!isLoggedIn">
        <div style="display: flex; justify-content: space-between; width: 100%">
          <router-link class="navbar-brand" to="/">Inventory</router-link>
          <div style="width: 100%; display: flex; justify-content: flex-end;">
            <button @click="signin" class="btn btn-primary">Sign in</button>
          </div>
        </div>
      </template>
      <template v-else>
        <div style="display: flex; justify-content: space-between">
          <router-link class="navbar-brand" to="/">Inventory</router-link>
        </div>
      </template>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <template v-if="isLoggedIn">
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
            <li class="nav-item">
              <router-link class="nav-link" to="/users">Users</router-link>
            </li>
          </ul>
          <div class="form-group d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="title">
            <button class="btn btn-outline-success" @click="searchItems" :disabled="!title">Search</button>
          </div>
          <template v-if="isLoggedIn">
            <div class="form-group d-flex">
              <button class="btn btn-outline-info" @click="logout">Sign out</button>
            </div>
          </template>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'NavBar', props: [ 'user' ], data() {
    return {
      title: ''
    }
  }, computed: {
    ...mapGetters([ "isLoggedIn", "isAdmin" ])
  }, methods: {
    searchItems() {
      if (this.title) {
        this.$router.push(`/search/${this.title}`)
      }
    }, logout() {
      localStorage.removeItem('token')
      location.reload();
    }, signin() {
      this.$router.push('/sigin')
    },
  }
}
</script>