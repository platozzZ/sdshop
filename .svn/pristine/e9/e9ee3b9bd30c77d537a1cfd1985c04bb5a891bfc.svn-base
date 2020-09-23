<template>
	<div class='container'>
		<heads :title='title'></heads>
		<div v-if='pageFlag'>
			<ul class='choose_attr'>
				<li @tap='_chooseAttr(item,index)' :class='{active: item.status}' v-for="(item,index) in attrList" :key='index'>
					{{item.text}}
					<img v-if='item.status' class='img' :src='chooseImg'>
				</li>
			</ul>
			<div class='btn_bottom' @tap='_saveAttr'>保存</div>
		</div>
		<div v-else>
			<div class='chooseAttrStyle'>
				<div>添加方式</div>
				<ul>
					<li @tap="attrStyle=1">
						<img :src="attrStyle==1?quan_hei:quan_hui">
						选择属性名称
					</li>
					<li @tap="attrStyle=2">
						<img :src="attrStyle==2?quan_hei:quan_hui">
						自定义属性名称
					</li>
				</ul>
			</div>
			<template v-if="attrStyle==1">
				<div class='chooseAttr'>
					<div>属性名称</div>
					<input class='input' type="text" placeholder="请选择属性名称" placeholder-style='font-size:28upx' :value='chooseAttr' disabled @tap='_clickAttr'>
					<img class='jiantou' :src="jiantou">
				</div>
				<div class='hr'></div>
				<div class='attrBox' v-for='(item,index) in attrDataList' :key='index' v-if="index">
					<div class='attr_hr'></div>
					<div class='attrBoxTitle'>
						{{index}}
						<text class='text'>(请选择属性值)</text>
						<img @tap="deleteAttr(index)" class="delete_img" :src="delete_img">
					</div>
					<div class='attrList'>
						<div :class='{active:it.status}' @tap='_chooseAttrData(it,item,index)' v-for='(it,id) in item' :key='id'>{{it.value}}</div>
					</div>
				</div>
				<div class='hr'></div>
				<scroll-view scroll-x>
					<div class='table'>
						<div class='tr'>
							<div class='th' v-for='(item,index) in attr_group' :key='index'>{{item.attr_group_name}}</div>
							<div class='th'>成本价</div>
							<div class='th'>原价</div>
							<div class='th'>售价</div>
							<div class='th'>库存</div>
							<!-- <div class='th'>库存预警</div> -->
						</div>
						<div class='tr' v-for='(items,index) in attr_arr' :key='index'>
							<div class='td' v-for='(item,index1) in items.attr_list' :key='index1'>{{item.attr_name}}</div>
							<div class='td'>
								<div>
									{{index==0?items.cbj:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.cbj">
								</div>
							</div>
							<div class='td'>
								<div>
									{{index==0?items.yj:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.yj">
								</div>
							</div>
							<div class='td'>
								<div>
									{{index==0?items.sj:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.sj">
								</div>
							</div>
							<div class='td'>
								<div>
									{{index==0?items.kucun:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.kucun">
								</div>
							</div>
							<!-- <div class='td'>
								<div>
									{{index==0?items.stockWarn:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.stockWarn">
								</div>
							</div> -->
						</div>
					</div>
				</scroll-view>
			</template>
			<template v-else>
				<div class='hr'></div>
				<div class="addAttr" :class="{'border-bottom': addList.length>0}">
					<div class="addLeft">属性名称</div>
					<input type="text" placeholder="请输入商品属性名称" v-model="addAttrName">
					<button @tap="addAttr">添加属性</button>
				</div>
				<div v-for="(item,index) in addList" :key="index">
					<div class="addAttrName">
						<div class="addLeft">{{item.attr_group_name}}</div>
						<input type="text" placeholder="请输入商品属性值" v-model="item.childValue">
						<button class="addBtn" @tap="addAttrValue(item)">添加</button>
						<button class="removeBtn" @tap="removeAttrName(index)">删除</button>
					</div>
					<div class="addAttrValue" v-if="item.attr_list.length>0">
						<div class="addLeft"></div>
						<ul>
							<li v-for="(items,indx) in item.attr_list" :key="indx" @tap="removeAttrValue(item,indx)">
								<div class="icon"></div>
								{{items.attr_name}}
							</li>
						</ul>
					</div>
				</div>
				<div class='hr'></div>
				<scroll-view scroll-x>
					<div class='table'>
						<div class='tr'>
							<div class='th' v-for='(item,index) in addList' :key='index' v-if="item.attr_list.length>0">{{item.attr_group_name}}</div>
							<div class='th'>成本价</div>
							<div class='th'>原价</div>
							<div class='th'>售价</div>
							<div class='th'>库存</div>
							<!-- <div class='th'>库存预警</div> -->
						</div>
						<div class='tr' v-for='(items,index) in attr_arr' :key='index'>
							<div class='td' v-for='(item,index1) in items.attr_list' :key='index1'>{{item.attr_name}}</div>
							<div class='td'>
								<div>
									{{index==0?items.cbj:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.cbj">
								</div>
							</div>
							<div class='td'>
								<div>
									{{index==0?items.yj:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.yj">
								</div>
							</div>
							<div class='td'>
								<div>
									{{index==0?items.sj:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.sj">
								</div>
							</div>
							<div class='td'>
								<div>
									{{index==0?items.kucun:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.kucun">
								</div>
							</div>
							<!-- <div class='td'>
								<div>
									{{index==0?items.stockWarn:''}}
									<input v-if="index>0" class='input' type="number" v-model="items.stockWarn">
								</div>
							</div> -->
						</div>
					</div>
				</scroll-view>
			</template>
			<div class='btn_bottom' @tap='_complete'>完成</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	
	export default {
		data() {
			return {
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				chooseImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/chooseMe.png',
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/xuanzehui2x.png',
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/xuanzehei2x.png',
				delete_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/deletes2x.png',
				title: '设置属性',
				pageFlag: false,  //页面切换的开关，默认是选择属性名称，false是设置属性的主页面
				access_id:'',
				attrList:[],//所有的属性名称
				chooseAttr:'',//选中的属性名称
				attrDataList:{}, //所有的属性值
				attr_group:[], //最终返回给后台的属性数据[{attr_group_name:'尺寸',attr_list:[{attr_name:'L'}]}]
				attr_arr:[],//最终返回给后台的表格数据[{attr_list:[],bar_code:'',cbj:''}]
				costM:'',  //默认成本价
				oldM:'',  //默认原价
				sellM:'',  //默认售价
				stock:'',  //默认库存
				stockWarn:'', //库存预警
				
				attrStyle: 1, //属性添加方式 1、选择  2、自定义
				addList: [],  //自定义的属性
				addAttrName: '',  //自定义属性名
			}
		},
		watch:{
			attrStyle(newVal){
				if(newVal==1){
					this._table()
				}else{
					this._abbTable()
				}
			}
		},
		onLoad(option){
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id
			
			if(uni.getStorageSync('upload_chooseAttr')){
				this.attr_group=uni.getStorageSync('upload_attr_group')
				this.attr_arr=uni.getStorageSync('upload_attr_arr')
				this.chooseAttr=uni.getStorageSync('upload_chooseAttr')
				this.title = '选择属性名称'
				this._axios(this.chooseAttr,1)
			}else if(uni.getStorageSync('upload_attr_group')){
				this.attrStyle = 2
				this.addList = uni.getStorageSync('upload_attr_group')
				this.attr_arr=uni.getStorageSync('upload_attr_arr')
				this.pageFlag = false
				this.title = '设置属性'
			}
			// costM成本价  oldM原价  sellM售价  stock库存  stockWarn库存预警  unit商品单位  pageStatus[0-上传，1-编辑，2-查看]
			this.costM=option.costM
			this.oldM=option.oldM
			this.sellM=option.sellM
			this.stock=option.stock
			this.stockWarn=option.stockWarn
		},
		methods: {
			// 删除选择的属性名
			deleteAttr(index){
				this.chooseAttr = this.chooseAttr.replace(','+index,'').replace(index+',','').replace(index,'')
				this.$delete(this.attrDataList,index)
				
				let indx = this.attr_group.filter((item,indx)=>{
					if(item.attr_group_name == index){
						this.attr_group.splice(indx,1)
					}
				})
				
				this._table()
			},
			// 自定义属性名
			addAttr(){
				this.addAttrName = this.addAttrName.replace(/(^\s*)|(\s*$)/g,'')
				if(!this.addAttrName){
					uni.showToast({
						title: '请填写属性名',
						icon: 'none'
					})
					return
				}
				
				const me =this
				
				var name = me.addAttrName
				
				let flag = me.addList.find(item=>item.attr_group_name==name)
				if(flag){
					uni.showToast({
						title: '属性名已添加',
						icon: 'none'
					})
					return
				}
				
				let data = {
					module: 'app',
					action:'mch',
					m:'get_attribute_value',
					access_id:this.access_id,
					attribute_str: name,
				}
				this.$req.post({data}).then(res=>{
					if(res.code==200&&res.list.list[name].length>0){
						let attrName = res.list.list[name]
						let attr_list = []
						attrName.filter(item=>{
							attr_list.push({
								attr_name: item.value
							})
						})
						me.addList.push({
							attr_group_name: name,
							childValue: '',
							attr_list
						})
						me._abbTable()
					}else{
						me.addList.push({
							attr_group_name: name,
							childValue: '',
							attr_list:[]
						})
					}
					me.addAttrName = ''
				})
			},
			// 删除属性名
			removeAttrName(index){
				this.addList.splice(index,1)
				this._abbTable()
			},
			// 自定义属性值
			addAttrValue(item){
				item.childValue = item.childValue.replace(/(^\s*)|(\s*$)/g,'')
				if(!item.childValue){
					uni.showToast({
						title: '请填写属性值',
						icon: 'none'
					})
					return
				}
				let flag = item.attr_list.find(items=>items.attr_name==item.childValue)
				if(flag){
					uni.showToast({
						title: '属性值已添加',
						icon: 'none'
					})
					return
				}
				item.attr_list.push({
					attr_name: item.childValue
				})
				item.childValue = ''
				this._abbTable()
			},
			// 删除属性值
			removeAttrValue(item,index){
				item.attr_list.splice(index,1)
				this._abbTable()
			},
			// 点击选择属性
			_clickAttr(){
				this._axios(this.chooseAttr)
			},
			// 选择属性名称
			_chooseAttr(item,index){
				item.status = !item.status
				if(item.status){
					// 选中进入
					let str=(this.chooseAttr?',':'') + item.text
					this.chooseAttr+=str
				}else{
					// 取消选中
					this.chooseAttr=this.chooseAttr.replace(','+item.text,'').replace(item.text+',','').replace(item.text,'')
				}
			},
			// 保存属性名称
			_saveAttr(){
				if(!this.chooseAttr){
					uni.showToast({
						title:'请选择属性名称',
						icon:'none',
					})
					return
				}
				this.attr_arr = []
				this.attr_group = []
				this._axios(this.chooseAttr,1)
			},
			// 删除属性名称
			removeAttr(){
				console.log(this.attrDataList)
			},
			// 选择子属性
			_chooseAttrData(item,items,index){
				item.status=!item.status
				if(item.status){
					// 选中子属性
					let flag=true
					for(let i=0;i<this.attr_group.length;i++){
						if(this.attr_group[i].attr_group_name==index){
							flag = false
							this.attr_group[i].attr_list.push({attr_name:item.value})
							break
						}
					}
					if(flag){
						this.attr_group.push({
							attr_group_name: index,
							attr_list:[{attr_name:item.value}]
						})
					}
				}else{
					// 取消选中
					for(let i=0;i<this.attr_group.length;i++){
						if(this.attr_group[i].attr_group_name!=index){
							continue
						}
						let attr_list=this.attr_group[i].attr_list
						for(let j=0;j<attr_list.length;j++){
							if(attr_list[j].attr_name!=item.value){
								continue
							}
							this.attr_group[i].attr_list.splice(j,1)
							if(this.attr_group[i].attr_list.length==0){
								this.attr_group.splice(i,1)
							}
							break
						}
						break
					}
				}
				
				// 计算表格数据
				this._table()
			},
			_table(){
				// 表格总行数，计算方式为所有子属性的个数相乘
				const me = this
				let listX = 0
				let attr_arr = []
				for(let i = 0;i<this.attr_group.length;i++){
					// let name = this.attr_group[i].attr_group_name
					let attr_list = this.attr_group[i].attr_list
					if(listX==0){
						listX=attr_list.length
					}else{
						listX=attr_list.length>0?(attr_list.length*listX):listX
					}
				}
				for(let i=0;i<listX;i++){	
					attr_arr.push({
				        "cbj":me.costM,
				        "yj":me.oldM,
				        "sj":me.sellM,
				        "kucun":me.stock,
						// "stockWarn":me.stockWarn,
				        "attr_list":[]
					})
				}
				this.attr_arr = attr_arr
				
				var th_title = JSON.parse(JSON.stringify(this.attr_group))
				
				this._tableList(th_title,0,listX,listX)
			},
			_abbTable(){
				// 表格总行数，计算方式为所有子属性的个数相乘
				const me = this
				let listX = 0
				let attr_arr = []
				for(let i = 0;i<this.addList.length;i++){
					let attr_list = this.addList[i].attr_list
					if(listX==0){
						listX=attr_list.length
					}else{
						listX=attr_list.length>0?(attr_list.length*listX):listX
					}
				}
				for(let i=0;i<listX;i++){	
					attr_arr.push({
				        "cbj":me.costM,
				        "yj":me.oldM,
				        "sj":me.sellM,
				        "kucun":me.stock,
						// "stockWarn":me.stockWarn,
				        "attr_list":[]
					})
				}
				this.attr_arr = attr_arr
				
				var th_title = JSON.parse(JSON.stringify(this.addList))
				this._tableList(th_title,0,listX,listX)
			},
			_tableList(th_title,i,listX,_listX){
				// 如果该循环的子项没有东西则停止递归
				if(!th_title[i]){
					if(i<(th_title.length-1)){
						th_title.splice(i,1)
						this._tableList(th_title,i,listX,_listX)
						return
					}
					return
				}
				
				// 如果该项属性的没有属性值，则删除该项重新递归
				if(th_title[i].attr_list.length==0){
					th_title.splice(i,1)
					this._tableList(th_title,i,listX,_listX)
					return
				}
				
				// _listX代表当前属性有多少行,默认为总行数 listX总行数
				var strArr = JSON.parse(JSON.stringify(this.attr_arr))
				
				var xx=0  // 代表当前行数
				var name=th_title[i].attr_group_name  //代表当前规格的标题,比如颜色/大小
				//listX为表格总行数
				if(i==0){
					// 如果当前规格是第一个
					// 当前规格有多少个,比如颜色,有蓝色白色两个
					for(var j=0;j<th_title[i].attr_list.length;j++){
						var value=th_title[i].attr_list[j].attr_name
						// 总行数除当前规格的个数,得出当前规格每个占多少行,比如白色白色白色,黑色黑色黑色
						for(var x=0;x<listX/th_title[i].attr_list.length;x++){
							strArr[xx].attr_list.push({'attr_id':'','attr_name':value,'attr_group_name':name})
							xx++
						}
					}
				}else if(i<th_title.length-1){
					// 如果当前规格不是最后一个
					// 当前规格的前一个每个属性有多少行,即当前规格和后面规格相乘的总行数
					_listX = Math.round(_listX/th_title[i-1].attr_list.length)
					// 外面这层循环代表当前属性在内循环完成之后进入新的循环,比如白色白色黑色黑色红色红色,完成之后再次白色白色黑色黑色红色红色循环,总行数除以前一个属性每个属性有多少行,得出总循环数
					for(var l=0;l<listX/_listX;l++){
						for(var j=0;j<th_title[i].attr_list.length;j++){
							var value=th_title[i].attr_list[j].attr_name
							// 当前规格的前一个每个属性行数,除当前
							for(var x=0;x<_listX/th_title[i].attr_list.length;x++){
								strArr[xx].attr_list.push({'attr_id':'','attr_name':value,'attr_group_name':name})
								xx++
							}
						}
					}
					
				}else{
					// 如果当前规格属性是最后一个,格式是x,l,xl x,l,xl循环
					for(var x=0;x<listX/th_title[i].attr_list.length;x++){
						for(var j=0;j<th_title[i].attr_list.length;j++){
							var value=th_title[i].attr_list[j].attr_name
							strArr[xx].attr_list.push({'attr_id':'','attr_name':value,'attr_group_name':name})
							xx++
						}
					}
				}
				
				
				this.attr_arr = strArr
				i++
				if(i<th_title.length){
					this._tableList(th_title,i,listX,_listX)
				}
			},
			// 请求方法
			_axios(attribute_str='',flag){
				const me = this
				let m = 'get_attribute_name'
				if(flag){
					m = 'get_attribute_value'
				}
				let data = {
					module: 'app',
					action:'mch',
					m,
					access_id:this.access_id,
					attribute_str: attribute_str,
					attr_arr: this.attr_group.length>0?JSON.stringify(this.attr_group):''
				}
				uni.request({
					url: uni.getStorageSync("url"),
					data,
					header:{
					    'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success(res){
						if(res.data.code==200){
							if(!flag){
								me.pageFlag = true
								me.title = '选择属性名称'
								me.attrList = res.data.list.attribute
							}else{
								me.pageFlag = false
								me.title = '设置属性'
								me.attrDataList=res.data.list.list
							}
						}
					}
				})

			},
			// 完成设置
			_complete(){
				if(this.attr_arr.length == 0){
					let str = this.attrStyle == 1?'请选择属性':'请添加属性'
					uni.showToast({
						title: str,
						icon: 'none'
					})
					return
				}
				
				if(this.attrStyle == 1){
					uni.setStorageSync('upload_attr_group',this.attr_group)
					uni.setStorageSync('upload_attr_arr',this.attr_arr)
					uni.setStorageSync('upload_chooseAttr',this.chooseAttr)
				}else{
					uni.setStorageSync('upload_attr_group',this.addList)
					uni.setStorageSync('upload_attr_arr',this.attr_arr)
					
					uni.removeStorageSync('upload_chooseAttr')
				}
				uni.navigateBack({
					delta:1
				})
			}
		},
		computed: {
			
		},
		components: {
			heads
		},
	}
</script>

<style lang="less">
	@import url("../../static/css/myStore/setAttr.less");
</style>