<template>
  <li class="modal__item">
    <div class="modal__stat-name"><b>{{stat.stat.name}}</b></div>
    <div class="modal__stat-value">{{stat.base_stat}}</div>
  </li>
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
.modal__item {
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal__item:last-child {
  margin-right: 0;
}
.modal__stat-name {
  margin-bottom: 10px;
}
</style>
