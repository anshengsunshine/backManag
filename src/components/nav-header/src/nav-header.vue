<template>
  <div class="nav-header">
    <div class="fold-menu" @click="handleFoldClick">
      <i-ep-Fold v-if="isFold" />
      <i-ep-Expand v-else />
    </div>

    <div class="content">
      <as-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
import AsBreadcrumb from '@/base-ui/breadcrumb'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    AsBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据: [{name: , path: }]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
