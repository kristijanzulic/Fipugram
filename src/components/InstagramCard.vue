<template>
  <div class="card text-center velicina">
    <div class="card-header">{{ info.descriptions }}</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="info.url" />
    </div>
    <div class="card-footer text-muted">{{ postedFromNow }}</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["info"],
  name: "InstagramCard",
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
};
</script>

<style scoped>
.velicina {
  width: 500px;
  margin-bottom: 20px;
}
</style>
