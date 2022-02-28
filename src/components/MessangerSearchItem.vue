<template>
  <div class="search-list-item">
    <div class="item-content" role="button">
      <div class="item-avatar">
        <img :src="avatarSrc" alt="avatar">
      </div>
      <div class="item-info">
        <div class="info-title">{{ fullName }}</div>
        <div class="info-status">last seen 2 hours ago</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  avatarSrc: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.search-list-item {
  position: relative;

  .item-content {
    padding: 0.5rem;
    gap: 0.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    flex-grow: 1;
    cursor: pointer;

    &:hover {
      background-color: rgb(244,244,245);
      border-radius: 0.75rem;
    }

    .item-avatar {
      display: flex;
      flex: none;
      width: 3.375rem;
      height: 3.375rem;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
