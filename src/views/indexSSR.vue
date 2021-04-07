<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <ul>
      <li><span>店铺ID：</span><span>{{investInfo.shopID}}</span></li>
      <p>换1行</p>
      <p>换2231行</p>
      <p>换3行</p>
      <li><span>桌台描述：</span><span>{{investInfo.qrCodeInfo.tableTagStr}}</span></li>
        <router-link to="/about">关于</router-link>
      <hello-world></hello-world>
<!--      <li><span>借款余额</span><span>{{borrowAmount}}</span></li>
      <li><span>在借用户数</span><span>{{borrowUserNum}}</span></li>
      <li><span>累计交易金额</span><span>{{addUpTxAmount}}</span></li>
      <li><span>累计交易笔数</span><span>{{addUpTxCount}}</span></li>
      <li><span>累计注册用户</span><span>{{addUpRegisteredUser}}</span></li>
      <li><span>今日新增借款</span><span>{{todayNewLoan}}</span></li>
      <li><span>今日新增还款</span><span>{{todayNewRepayment}}</span></li>
      <li><span>新增注册用户</span><span>{{todayNewRegisteredUser}}</span></li>-->
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import { fetchInvest } from '@/api/index.js'
export default {
  name: 'home',
  data () {
    return {
      investAmount: '',
      investUserNum: ''
    }
  },
  components: {
    'hello-world': HelloWorld
  },
  computed: {
    investInfo () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$route.query.id = 11157
      return (this.$store.state.invest[this.$route.query.id] && this.$store.state.invest[this.$route.query.id].data) || {}
    }
  },
  // 因为执行改代码的时候，组件还未挂载，获取不到this对象，所以要把store 路由信息等传递进来，这样可以同步了
  asyncData (context) {
    console.log('这里是 123 的结果-------------', 123)
    // console.log('这里是 context 的结果-------------', context)
    return context.store.dispatch('FETCH_INVEST', { id: 11157 })
  },
  methods: {
    investMoneyAndUser () {
      return this.$store.dispatch('FETCH_INVEST', this.$route.params)
    },
    initData () {
      this.investMoneyAndUser().then(data => {
        console.log('在投数据相关:', data)
        this.investDateRise = data.investDateRise
        this.investMonthRise = data.investMonthRise
        this.investAmount = data.investAmount
        this.investUserNum = data.investUserNum
      })
    }
  },
  // Fetch comments when mounted on the client
  beforeMount () {
    // this.investMoneyAndUser()
  },
  watch: {
    // investInfo: 'investMoneyAndUser'
  },
  created () {
    console.log('这里是 created函数 的结果-------------', 123)
    // this.investMoneyAndUser()
  }
}
</script>
