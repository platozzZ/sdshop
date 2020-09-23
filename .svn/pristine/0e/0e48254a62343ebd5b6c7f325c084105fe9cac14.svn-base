import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		url:'https://xiaochengxu.houjiemeishi.com/V3/index.php?store_id=1',//此出只做默认值处理
		loginProvider: "",
		access_id:'',//授权ID
		cart_id:[],//购物车ID
		pro_id:'',//产品ID
		user_phone:'',//用户名
		address_id:'',//地址id
		address_id_def:'',//默认地址id
		order_id:'',//订单id
		type:'',//搜索商品展示页面，判断从那个页面输入
		scroll_t:'',//搜索页面的滚动条距离
		status:'',//订单分类状态
		cindex:0,//全部产品的左边分类标题
		arr_home:[],
		data_height:'',
		tabIndex:1,
		halfWidth:'',
		shouquan:false,
		nCart:[],
		bindding_num:"",
		bind_status:"",
		bind_promise:"",
		head_id:"",
		pay_lx:"",
		frompage:'',
		storeId:'',
		shop_id:'',
		store_expNum:'',
		attrList:'',
		attr:'',
		payRes:[],
		tableWidth:0,
		goodsDetail:'',
		h_content:'',
		cart_num:0,//购物车商品数量
		seckilldata: null,
		replayGoods: [],  //直播回放的商品
	},
	mutations: {
		setseckilldata(state, val){
			state.seckilldata = val
		},
		SET_NCART(state, nCart) {
			state.nCart = nCart
		},
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.access_id = null
		},
		SET_ACCESS_ID(state, access_id) {
			state.access_id = access_id
		},
		SET_HALF_WIDTH(state, halfWidth) {
			state.halfWidth = halfWidth
		},
		SET_DATA_HEIGHT(state, data_height) {
			state.data_height = data_height
		},
		SET_TAB_INDEX(state, tabIndex) {
			state.tabIndex = tabIndex
		},
		SET_CART_ID(state, cart_id) {
			state.cart_id = cart_id
		},
		SET_USER_PHONE(state, user_phone) {
			state.user_phone = user_phone
		},
		SET_PRO_ID(state, pro_id) {
			state.pro_id = pro_id
		},
		SET_ADDRESS_ID(state, address_id) {
			state.address_id = address_id
		},
		SET_ORDER_ID(state, order_id) {
			state.order_id = order_id
		},
		SET_TYPE(state, type) {
			state.type = type
		},
		SET_CINDEX(state, cindex) {
			state.cindex = cindex
		},
		SET_STATUS(state, status) {
			state.status = status
		},
		SET_BINDDING_NUM(state, bindding_num) {
			state.bindding_num = bindding_num
		},
		SET_H_CONTENT(state, h_content) {
			state.h_content = h_content
		},
		SET_BIND_STATUS(state, bind_status) {
			state.bind_status = bind_status
		},
		SET_BIND_PPOMISE(state, bind_promise) {
			state.bind_promise = bind_promise
		},
		SET_HEAD_ID(state, head_id) {
			state.head_id = head_id
		},
		SET_PAY_LX(state, pay_lx) {
			state.pay_lx = pay_lx
		},
		SET_CART_NUM(state, cart_num){
			state.cart_num = cart_num
		},
		SET_REPLAY_GOODS(state, goods){
			state.replayGoods = goods
		},
		
	},
	actions: {
		// lazy loading access_id
		getUseraccess_id: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.access_id) {
					resolve(state.access_id)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 access_id
								const access_id = '123456789'
								console.log('uni.request mock access_id[' + access_id + ']');
								commit('setaccess_id', access_id)
								resolve(access_id)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
