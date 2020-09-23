<template>
	<div style='height: 100%;'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<ul class='message'>
			<li>
				<span style="margin-right: 30upx">收货人</span>
				<input type="text"  placeholder-style="color:#B8B8B8"  placeholder="请输入收货人名称" v-model="user_name" />
			</li>
			<li>
				<span>联系方式</span>
				<input type="number"  placeholder-style="color:#B8B8B8"  placeholder="请输入电话号码" v-model="phone" />
			</li>
			<li class="flex" @click="showMulLinkageThreePicker()">
				<div style='display: flex;align-items: center;'>
					<span>所在地区</span>
					<input type="text" disabled='true' @focus="hideKeyboard()" placeholder="请选择所在地区" v-model="city_all"  placeholder-style="color:#B8B8B8" />
				</div>
				<img class='arrow' :src="jiantou" />
			</li>
			<li>
				<span>详细地址</span>
				<input type="text" placeholder-style="color:#B8B8B8"  placeholder="请输入详细地址" v-model="address" />
			</li>
			<li class="flex adddis">
				<span>默认地址</span>
				<img class='quan_img' :src="is_default==1 ? circle_hei : circle_hui" @click='_is_default' />
			</li>
			<li id='setupButtomWrap'>		
				<div class='setup-buttom storage' @tap="_preserve_address">保存</div>
			</li>
		</ul>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onConfirm="onConfirm"></mpvue-city-picker>
		 
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { mapMutations } from 'vuex'
	import { getStorage } from '../../common/storage.js'
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	
	export default {
		data() {
			return {
				addNum:'',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				fastTap:true,
				title: '编辑地址',
				selected: '1', //组件的默认值
				cilck_index: -1, //选择省市的 index
				city_z: false, //显示隐藏状态
				city_addre: {}, //选择完省市区后存的信息
				province: '', //省
				city: '', //市
				area: '', //区
				access_id: '',
				GroupID: '', //省id
				Group_name: '', //省名称
				city_id: '', //市id
				city_name: '', //城市名称
				area_name: '', //区名称
				area_id: '', //区id
				user_name: '', //用户名
				phone: '', //电话号码
				address: '', //详细地址
				state_addre: '', //判断从添加地址(1)还是编辑地址(2)
				addr_id: '', //地址id
				city_all: '', //最终选择省市区的值
				is_default: 0, //是否默认地址
				circle_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xuanzehui2x.png', //图片地址
				circle_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xuanzehei2x.png', //图片地址
				g_name: '省份',
				c_name: '城市',
				a_name: '地区',
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				pickerText:'',
			}
		},
		onLoad(option) {
			this.addNum=option.addNum
			this.state_addre = option.state_addre
			this.addr_id = option.addr_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			
			if(this.state_addre == 2) {
				this.title = '编辑地址'
				this._axios()
			} else {
				this.title = '添加新地址'
				return
			}
			
		},
		onShow() {
			let me=this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1');
			});
		},
		methods: {
			changeLoginStatus(){
				var me = this;
				me.login_status = 1;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			hideKeyboard(){
				uni.hideKeyboard()
			},
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.city_all=e.label
			},
			...mapMutations({
				address_id: 'SET_ADDRESS_ID'
			}),
			_axios() {
				var me = this
				var data = {
					module: 'app',
					action: 'address',
					app: 'up_addsindex',
					access_id: this.access_id,
					addr_id: this.addr_id
				}
				console.log(data)
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						me.fastTap=true
						if(res.data.code==200){
						  console.log(res)
						  let {data: {data,data:{address:{address,name,tel,is_default,address_xq},city_id,county,province}}} = res
						  me.user_name = name;
						  me.phone = tel;
						  me.address = address;
						  me.city_all = province+'-'+city_id+'-'+county;
						  me.is_default=is_default;
						}else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
						
					},
					error:function(err){
						me.fastTap=true
					}
				})
			},
			//默认地址
			_is_default() {
				if(this.is_default == 1){
					this.is_default = 0
				}else{
					this.is_default = 1
				}
			},
			//保存
			_preserve_address() {
				var me = this
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				if(this.user_name && this.phone && this.city_all && this.address) {
					var data = {
						module: 'app',
						action: 'address',
						access_id: this.access_id,
						user_name: this.user_name,
						mobile: this.phone,
						place:this.city_all,
						is_default: this.is_default,
						address: this.address
					}
					// #ifdef MP
					data.store_type = 1;
					// #endif
					// #ifndef MP
					data.store_type = 2;
					// #endif
					console.log(data)
					if(this.state_addre == 2) {
						data.app = 'up_adds'
						data.addr_id = this.addr_id
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success:function(res){
								let {data: {code,message}} = res;
								if(code == 200) {
									uni.showToast({
										title: '修改成功！',
										duration: 1500,
										icon:'none'
									})
									if(me.is_default==1){
										me.$store.state.address_id_def=me.addr_id
									}
									uni.setStorageSync("lkt_address_id_def",me.addr_id);
									setTimeout(function(){
										uni.navigateBack({
											delta:1
										})
										me.fastTap=true
									},1500)
								} 
								else{
									me.fastTap=true
									uni.showToast({
										title:message,
										duration:1500,
										icon:'none'
									})
								}
							}
						})
					} 
					else if(this.state_addre == 1) {
						data.app = 'SaveAddress'
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success:function(res){
								console.log(res)
								let {data: {address_id,code,message}} = res;
								if(code == 200) {
									if(me.addNum==0){
										me.$store.state.address_id_def=address_id
									}
									else if(me.is_default==1) {
										me.$store.state.address_id_def=address_id
										// 告诉上一页，选择了默认地址
										uni.setStorageSync('address_default',1)
									}
									uni.setStorageSync("lkt_address_id_def",address_id);
									uni.showToast({
										title: '添加成功！',
										duration: 1500,
										icon:"none"
									})
									setTimeout(function(){
										uni.navigateBack({
											delta:1
										})
										me.fastTap=true
									},1500)
								} else {
									me.fastTap=true
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
								}
							}
						})
					}
				} 
				else {
					this.fastTap=true
					uni.showToast({
						title: '请填写完整信息！',
						duration: 1000,
						icon:"none"
					})
				}
			},
		},
		components: {
			heads,
			mpvueCityPicker,
		}
	}
</script>
<style scoped lang="less">
	@import url("../../static/css/address/addAddress");
</style>