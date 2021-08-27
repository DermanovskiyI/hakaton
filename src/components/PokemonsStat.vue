<template>
    <div>
        <div><b>{{stat.stat.name}}</b>:{{stat.base_stat}}</div>
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
