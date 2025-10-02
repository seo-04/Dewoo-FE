<template>
  <div> 
    <FavoriteItem
      v-for="(item, idx) in list" :key="item.fno"
      :info="item"
    />
  </div>
</template>

<script>
import FavoriteItem from './FavoriteItem.vue';

export default {
  components: {FavoriteItem},
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped scss>
</style>