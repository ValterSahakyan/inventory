<template>
  <div class="container mt-4">
    <Create :page="$route.params.type"/>
  </div>
</template>

<script>
import Create from '@/components/Create';

export default {
  name: 'CreateItem', components: {
    Create
  }
}
</script>