<template>
  <div class="messenger-search">
    <scroll-dynamic
      class="search-scroll-container"
      :is-loading-condition="isLoadingCondition"
      :is-loading-bottom-date="isLoadingBottomDate"
      :is-loading-top-date="isLoadingTopDate"
      :offset-before-loading="200"
      @end-add-trigger="addElementToEnd"
      @start-delete-trigger="deleteElementsFromStart"
      @start-add-trigger="addElementToStart"
      @end-delete-trigger="deleteElementsFromEnd"
    >
      <div class="search-header">
        <div class="search-header-title">Chats and Contacts</div>
        <a-button type="text">Show more</a-button>
      </div>
      <div class="search-list">
        <template v-for="item in items" :key="item.fullName">
          <messanger-search-item :avatar-src="item.avatar" :full-name="item.fullName" />
        </template>
      </div>
    </scroll-dynamic>
  </div>
</template>

<script setup>
import MessangerSearchItem from '@/components/MessangerSearchItem.vue';
import ScrollDynamic from '@/components/ScrollDynamic.vue';
import { computed, ref } from 'vue';
import { faker } from '@faker-js/faker';

const items = ref([]);
const isLoadingCondition = computed(() => items.value.length < 90);
const isLoadingTopDate = ref(false);
const isLoadingBottomDate = ref(true);

const addElementToEnd = async () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 30; ++i) {
    items.value.push({
      avatar: faker.image.avatar(),
      fullName: faker.name.findName(),
    });
  }
};

const deleteElementsFromStart = async () => {
  items.value.splice(0, 30);
  isLoadingTopDate.value = true;
};

const addElementToStart = async () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 30; ++i) {
    items.value.unshift({
      avatar: faker.image.avatar(),
      fullName: faker.name.findName(),
    });
  }
};

const deleteElementsFromEnd = async () => {
  items.value.splice(items.value.length - 30, 30);
};

addElementToEnd();
</script>

<style lang="scss" scoped>
.messenger-search {
  overflow: hidden;
  height: 100%;

  .search-scroll-container {
    padding: 0.5rem;
  }

  .search-section {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    border-top: 1px solid #DADCE0FF;
    overflow: hidden;
    height: 100%;
    overflow-y: auto;
    pointer-events: auto;

    .search-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .search-list {

    }
  }
}
</style>
