<template>
  <div class="container mt-4">
    <Create :page="$route.params.type" :id="$route.params.id"/>
  </div>
</template>

<script>
import Create from '@/components/Create';

export default {
  name: 'UpdateItem', components: {
    Create
  }
}
</script>