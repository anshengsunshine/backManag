<template>
  <el-form :rules="rules" :model="phone" ref="formRef">
    <el-form-item label="手机号" prop="num">
      <el-input v-model="phone.num" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { ElForm } from "element-plus"
import { rules } from "../config/phone-config"
import localCache from "@/utils/cache"
import { useStore } from "vuex"

export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      num: "",
      code: ""
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // console.log('真正执行登录逻辑')
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache("name", phone.num)
            localCache.setCache("password", phone.code)
          } else {
            localCache.deleteCache("name")
            localCache.deleteCache("password")
          }
          // 2.开始进行登录验证
          store.dispatch("login/phoneLoginAction", { ...phone })
        }
      })
    }

    return {
      phone,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
