<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 15:31:42
 * @LastEditTime: 2019-09-05 10:07:21
 * @LastEditors: Please set LastEditors
 -->
<template>
	<div class='box_eva'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		
		<div  class='goods' v-for='(item,index) in goods' :key='item.id'>
			<div class='heads'>
				<img :src='item.commodityIcon' />
				<div class='heads_bottom' v-if='!add'>
					<p>商品评分</p>
					<div class='starall'>
						<img v-for="(star,itemIndex) in stars[index]" :key='itemIndex' :src="stars[index][itemIndex].show ? starOnImg : starOffImg" @tap="rating(index,itemIndex,item.commodityId)" />
					</div>
				</div>
				<div class='heads_bottom' v-if='add'>
					<p class='heads_p'>{{item.product_title}}</p>
					<p>
						规格：{{item.size}}
					</p>
				</div>
			</div>
			<div class="eva-lines"></div>
			<div class="evaluate">
				<div class="input"> 
					<textarea 
					placeholder-style="font-size:28upx;color:#b8b8b8;" 
					class='input_text' 
					rows="4" 
					maxlength="200"  
					v-model="desc[index]" 
					placeholder='请输入您对该商品的评价……' />
					
				</div>
				<div>
					<p class='add_img'>添加图片({{data[index].src.length}}/9)</p>
					<ul class='evaluat_ul'>
						<li class='evaluat_li'  v-for='(item_img,indexsrc) in data[index].src' :key='indexsrc'>
							<img class='evaluat_img' :src="item_img"  @tap='_previewImg(index,indexsrc)'/>
							<img class='img_dele' :src="delete_img"   @tap="_delete(index,indexsrc)"/>
						</li>
						
						<li class="uploadphoto" @tap="choiceImg(index,data[index].src.length)" v-if='data[index].src.length<9?true:false'>
							<img class='xiangji' :src="xiangji_img" />
							<p class="p eva-p">上传图片</p>
						</li>
						
					</ul>
					<div class="eva-clear-both"></div>
				</div>
			</div>
		</div>
		<div class="user">
			<img :src="mous ? anonymous:onanonymous"  @tap="_mous"/>
			<span>匿名发布</span>
		</div>
		
		<div class="eva-line"></div>
		<div class="card">
			<div class='button' @tap="submit()">提交</div>
		</div>
		<div v-if="show_zz" style="height: 100vh;position: absolute;top: 0;width: 100%;">
			
		</div>
	</div>
	
</template>

<script>
	// 自定义头部
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage'
	export default {
		data() {
			return {
				num:'',
				aaa:[9,8,7,6,5,4,3,2,1,0],
				title: '发布评价',
				// order_id:'',
				order_details_id:'',
				access_id: '',
				goods: [], //带评价商品信息
				goodsId:[],
				desc: [], //评论内容
				flag: [],
				// remnant: 200 , //最多输入200个字符
				index: '',
				stars: [],//单个商品的星星状态
				starnum:'',//单个商品星级数
				delete_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/delete2x.png',
				xiangji_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xiangji2x.png',
				starOffImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xing12x.png',//灰星星
				starOnImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xing22x.png',//红星星
				anonymous:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/gou2x.png',//匿名
				onanonymous:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/gouhei2x.png',//署名
				mous:true,//是否匿名
				data:[],
				imgsrc:'',//上传的·图片的地址
				show:false,//图片放大预览
				timeout:'',
				img_index:-1,
				// img_dispaly:true,
				requestTime:0,
				requestTime1:0,
				// cunt:0,
				resImg:[],
				add:'',//true为追加评论
				fastTap:true,
				combotab:false,//防止重复提交
				staus:true,
				show_zz:false,
			}
		},
		// 注册组件
		components: {
			heads
		},
		// 监听页面加载
		onLoad(option) {
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id

			this.order_details_id = option.order_details_id
			this.add = option.add
			if(this.add){
				this.title='追加评价'
			}
			this.num = option.num

			this.getEvaluatingData()
		},
		// 监听页面显示
		onShow(){
			this.$nextTick(() => {
				this.$refs.lktAuthorizeComp.handleAfterAuth(this,'../login/login?landing_code=1');
			});
		},
		// 计算属性
		computed: {
			remnant() {
				let arr = []
				for(let i = 0; i < this.desc.length; i++) {
					arr[i] = 200 - this.desc[i].length
				}
				return arr
			}
		},
		// 事件方法
		methods: {
			changeLoginStatus(){
				this.access_id = uni.getStorageSync("access_id");
				this.getEvaluatingData();
			},
			_previewImg(index,i){
				uni.previewImage({
					current:this.data[index].src[i],
					urls: this.data[index].src
				})
			},
			/**
			 * 获取评论
			 * @return { undefind}
			 */
			getEvaluatingData(){				
				let data = {
					module: 'app',
					action: 'product',
					app: 'comment',
					order_details_id:this.order_details_id,
					access_id: this.access_id,
					num:this.num
				}
				
				if(this.add){
					data.type = 1
				}
				
				this.$req.post({ data }).then(res => {
					if(res.code==200){
						this.goods = res.commentList
						this.starnum = this.goods.length
						
						let tempArr = []
						if(this.stars.length > 0) {
							this.stars = []
						} else if(this.flag.length > 0) {
							this.flag = []
						} else {
							
							for(let i = 0; i < this.goods.length; i++) {
								this.flag.push(false)
								for(let j = 0; j < 5; j++) {
									tempArr.push({ show:false })
								}
								
								this.stars.push(tempArr)
								this.data.push(new Object)
								
								tempArr = []
								
								this.data[i].commodityId = this.goods[i].commodityId
								this.data[i].size = this.goods[i].size
								this.data[i].attribute_id = this.goods[i].sid
								this.data[i].cid = ''
								this.data[i].index = ''
								this.$set(this.data[i],'src',[])
								this.$set(this.data[i],'base64_img',[])
							}
						}
					} else {
						uni.showToast({
							title: res.data.message,
							duration: 1500,
							icon: 'none'
						})
					}
				})
			},
			/**
			*	评价星星切换 
			* @param:  { pIndex:Number }
			* @param:  { sIndex:Number }
			* @param:  { id:Number }
			* @return: undefined
			*/
			rating(pIndex,sIndex,id) {
				let con = 0
				let len = this.stars[pIndex].length
				
				++sIndex
				while(con < len){
					if(con < sIndex){
						this.stars[pIndex][con].show = true
					} else{
						this.stars[pIndex][con].show = false
					}
					con++
				}
				
					this.data[pIndex].starnum = sIndex
			},
			/**
			 * 是否匿名
			 * @return { undefined }
			 * */
			_mous(){
				this.mous = !this.mous
			},
			/**
			 * 提交评论
			 * @return { undefined }
			 * */
			async submit(){
				
				if(this.combotab){
					return false
				}else{
					this.combotab = true
					
					setTimeout(() => {
						this.combotab = false
					},2000)
				}
				
				this.fastTap = false
				
				for (let i=0;i<this.data.length;i++) {
					
					if(this.desc.length == 0|| this.desc[i] == '' || this.desc.length < this.data.length){
						uni.showToast({
							title:'请您为商品评价',
							duration:1500,
							icon:'none'
						})
						this.fastTap = true
						return
					} else {
						this.fastTap = false
					}
				}
				
				if(this.title!='追加评价'){
					for (let i = 0; i < this.data.length; i++) {
						if(!this.data[i].starnum && !this.add){
							uni.showToast({
								title:'请为商品评分',
								duration:1500,
								icon:'none'
							})
							this.fastTap = true
							return false
						}else{
							this.fastTap = true
						}
					}
				}
				
				for(let i = 0; i < this.goods.length; i++){
					this.data[i].content = this.resImg[i]
				}
				
				this.requestTime1 = 0
				for(let a = 0; a <this.goods.length; a++){
					for(let j = 0; j <this.data[a].src.length; j++){
						this.requestTime1+=1
					}
				}
				
				uni.showLoading({
					title: '请稍后...'
				})
				this.show_zz = true
				if(this.add){
					for(let b = 0; b < this.goods.length; b++){
						
						if(this.requestTime1 == 0){
							let data={
								comment:this.desc[b],
								start:this.data[b].starnum,
								access_id:this.access_id,
								module:'app',
								action:'product',
								app:'t_comment',
								anonymous : this.mous? 0:1,//1匿名，2不匿名
								access_id : this.access_id,
								// orderid:me.order_id,
								order_details_id:this.order_details_id,
								goodsId:this.data[b].commodityId,
								attributeId:this.data[b].attribute_id,
								type:'1',
								num:this.num
							}
							
							this.$req.post({ data }).then(res => {
									let { code,message } = res
									if(code == 200){
										
										uni.showToast({
											title:'提交成功',
											icon:'none',
											duration:1000
										})
										
										setTimeout(() => {
											uni.redirectTo({
												url: 'evaluatEnd'
											});
											
											this.fastTap=true
										},1000)
										this.show_zz = false
									} else {
										uni.showToast({
											title:message,
											icon:'none',
											duration:1000
										})
										this.show_zz = false
										this.fastTap=true
									}
							}).catch(ree => {
								this.fastTap = true
							})
							
						} else {
							this._Timg(b)
						}
					}
						
				} else {
					for(let b = 0; b < this.goods.length; b++){
						let data = {
							comment:this.desc[b],
							start:this.data[b].starnum,
							access_id:this.access_id,
							module:'app',
							action:'product',
							app:'add_comment',
							anonymous : this.mous? 0:1,//1匿名，2不匿名
							order_details_id:this.order_details_id,
							goodsId:this.data[b].commodityId,
							attributeId:this.data[b].attribute_id,
							num:this.num
						}
						 
						if(this.staus){
							data = await this._Submission(b,data)
						}
						if(b+1 ==  this.data.length){
							uni.hideLoading();
						}
					}
				}
			},
			/**
			 * 
			 * */
			async _Submission(b,data){
				var me=this
				return new Promise((res1)=>{
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							if(res.data.code==200){
								me.data[b].cid=res.data.cid
								if(me.data[b].src.length==0){
									uni.showToast({
										title:'提交成功',
										icon:'none',
										duration:1500
									})					
									setTimeout(function(){
										me.fastTap=true
										uni.redirectTo({
											url: 'evaluatEnd'
										});
									},1500)
								}else{
									me._img(b)
								}
								
							}
							else if(res.data.code!=200){
								me.fastTap=true
								uni.showToast({
									title:res.data.message,
									icon:'none',
									duration:1000
								})
							}
						},
						error:function(err){
							me.fastTap=true
						}
					})
				})
			},
			/**
			 * 
			 * */
			async _img(b){
				var me = this
				for(var i=0;i<me.data[b].src.length;i++){
					var parameter ={
							access_id:me.access_id,
							module:'app',
							action:'product',
							app:'img_comment',
							cid:me.data[b].cid,
							upload_z_num:me.data[b].src.length,
							upload_num:i,
						}
						// #ifdef MP-WEIXIN
							parameter.store_type=1
						// #endif
						// #ifndef MP-WEIXIN
							parameter.store_type=2 
						// #endif
						//判断上次上传结果成功了才能执行下一次方法
						parameter = await this._upload(b,i,parameter)
						
				}
			},
			/**
			 * 
			 * */
			_upload(b,i,parameter){
				var me=this
				return new Promise((res1)=>{
					uni.uploadFile({
						url: uni.getStorageSync("url"),
						filePath: me.data[b].src[i],
						name: 'file',
						formData:parameter,
						success:function(res){
							var res2=JSON.parse(res.data)
							me.fastTap=true
							if(res2.code==200){
								i++
								if(i==me.data[b].src.length && me.data.length - b == 1){
									me.fastTap=true
									me.staus = false;
									uni.showToast({
										title:'提交成功',
										duration:1500,
										icon:'none'
									})
									setTimeout(function(){
										uni.navigateBack({
											delta:1
										})
									},1500)
								}else{
									me.staus = true;
								}
							}else{
								uni.showToast({
									title:res2.status,
									duration:1500,
									icon:'none'
								})
								return
							}
							res1(res2);
						},
						error:function(){
							me.fastTap=true
						}
					})
				})
			},
			/**
			 * 
			 * */
			async _Timg(b){
				var me = this
				for(var i=0;i<me.data[b].src.length;i++){
					var parameter ={
							access_id:me.access_id,
							module:'app',
							action:'product',
							app:'t_comment',
							anonymous : me.mous? 0:1,//1匿名，2不匿名
							order_details_id:me.order_details_id,
							start:me.data[b].starnum,
							comment:me.desc[b],
							goodsId:me.data[b].commodityId,
							attributeId:me.data[b].attribute_id,
							// num:me.num,
							upload_z_num:me.data[b].src.length,
							upload_num:i,
						}
						// #ifdef MP-WEIXIN
							parameter.store_type=1
						// #endif
						// #ifndef MP-WEIXIN
							parameter.store_type=2 
						// #endif
						//判断上次上传结果成功了才能执行下一次方法
						parameter = await this._upload(b,i,parameter)
						
				}
			},
			/**
			 * 上传图片
			 * @param { number } index 
			 * @param { number } indexsrc 
			 * @return { undefined }
			 * */
			choiceImg(index,indexsrc){
				let count = Number(this.aaa[indexsrc])
				uni.chooseImage({
					count:count,// 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], // 从相册选择
					success: (res) => {
						this.resImg = this.resImg.concat(res.tempFilePaths )
						this.data[index].src = this.data[index].src.concat(res.tempFilePaths)
					}
				})
		  },
		  /**
			 * 删除选中图片
			 * @param { unmber } index 操作对象位置
			 * @param { unmber } pImgIndex 选中图片下标
			 * @return { undefined }
			 * */
			_delete(index,pImgIndex){
				if(this.data[index].src.length > 0){
					this.data[index].src.splice(pImgIndex,1)
					this.resImg.splice(pImgIndex,1)
				}else{
					return
				}
		  }
		}
	}
</script>

<style scoped>
	@import url("../../static/css/evaluate/evaluating.css");
</style>
