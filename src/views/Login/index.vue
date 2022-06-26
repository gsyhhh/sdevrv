 <template>
  <div>
    <van-nav-bar title="登录">
      <!-- <van-icon name="cross" slot="left" /> v2写法-->
      <template v-slot:left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '号码格式不正确',
          },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            pattern: /^\d{6}$/,
            message: '号码格式不正确,验证码的长度必须是6位',
          },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            @click="onSendSms"
            v-else
            size="small"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13966666666',
      code: '246810',
      time: 5 * 1000,
      isCountDownShow: false// 默认不显示倒计时
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true // 显示倒计时
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        console.log('验证失败')
        this.$toast.fail('手机格式不对')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}

</script>

 <style scoped lang="less">
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 70px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.95;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
}
</style>
