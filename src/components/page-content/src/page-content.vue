<template>
  <as-table
    :listData="userList"
    v-bind="contentTableConfig"
    @selection-change="handleSelectionChange"
  >
    <!-- 1.header中的插槽 -->
    <template #headerHandler>
      <el-button type="primary">新建用户</el-button>
    </template>
    <!-- 2.列中的插槽 -->
    <template #status="scope">
      <el-button
        plain
        size="small"
        :type="scope.row.enable ? 'success' : 'danger'"
        >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
      >
    </template>
    <template #createAt="scope">
      <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
    </template>
    <template #handler>
      <div class="handle-btns">
        <el-button size="small" link>编辑</el-button>
        <el-button size="small" link>删除</el-button>
      </div>
    </template>
  </as-table>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue"
import { useStore } from "@/store"
import AsTable from "@/base-ui/table"
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    AsTable
  },
  setup(props) {
    const store = useStore()
    store.dispatch("system/getPageListAction", {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const handleSelectionChange = (val: any) => {
      console.log(val)
    }

    const userList = computed(() => store.state.system.usersList)
    // const userCount = computed(() => store.state.system.userCount);
    return {
      userList,
      handleSelectionChange
    }
  }
})
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
