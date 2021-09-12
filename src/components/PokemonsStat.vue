<template>
    <div class="stat__text">
        <div><b>{{stat.stat.name}}</b>: {{stat.base_stat}}</div>
    </div>
</template>

<script>
export default {
  props: {
    stat: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.stat__text {
  min-width: 100px;
  margin-bottom: 10px;
}
.stat__text:last-child {
  margin-bottom: 0px;
}
</style>
