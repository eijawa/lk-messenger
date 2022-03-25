import { defineStore } from 'pinia';
import {
  computed, DefineComponent, ref, shallowRef,
} from 'vue';
import { LeftColumnComponentsList, LeftColumnComponent } from '@/types/MessengerSettings';
import Sidebar from '@/views/leftColumn/SidebarView.vue';

export const useMessengerSettingsStore = defineStore('messengerSettingsStore', () => {
  const leftColumnActiveComponent = shallowRef(Sidebar);
  const leftColumnActiveComponentGetter = computed(() => leftColumnActiveComponent.value);
  const leftColumnComponentsList: LeftColumnComponentsList = [
    {
      name: 'Sidebar',
      path: 'components/SidebarView',
    },
    {
      name: 'Settings',
      path: 'views/leftColumn/settings/SettingsView',
    },
  ];

  const leftColumnActiveComponentChange = async (componentName: string) => {
    const searchedComponentInfo = leftColumnComponentsList.find(
      (component: LeftColumnComponent) => component.name === componentName,
    );
    if (typeof searchedComponentInfo !== 'undefined') {
      leftColumnActiveComponent.value = (
        await import(`../${searchedComponentInfo.path}.vue`) as DefineComponent
      ).default as DefineComponent;
    } else {
      throw new Error(`component "${componentName}" not found`);
    }
  };

  const isChatOpened = ref<boolean>(false);

  return {
    leftColumnActiveComponent,
    leftColumnActiveComponentGetter,
    leftColumnActiveComponentChange,
    isChatOpened,
  };
});
