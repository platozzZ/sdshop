<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads class='zindex99' :title='title'></heads>
		<div class='relative'>
			<div  v-if='pageStatus==2' class='seeTitle'>基础信息</div>
			<div class='pl_30'>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']">
					<div :class="[pageStatus==2?'formList2':'formList']" >
						<div :class="[pageStatus==2?'leftText2':'leftText1']" >
							<span class='must' v-if='pageStatus!=2'>*</span><span>商品标题</span>
						</div>
						<div  v-if='pageStatus==2' class='rightInput2'>
							{{proName}}
						</div>
						<div v-else class='rightInput1'>
							<input v-if='pageStatus==0' type="text" v-model="proName"
								   :placeholder-style="placeStyle" maxlength='20'  placeholder="请输入商品标题，1-20个字符" />
							<input  v-if='pageStatus==1' type="text" v-model="proName"
									:placeholder-style="placeStyle" maxlength='20'  placeholder="请输入商品标题，1-20个字符" />
						</div>
					</div>
				</div>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']">
					<div class='formList' :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span>商品副标题</span>
						</div>
						<div :class="[pageStatus==2?'rightInput2':'rightInput1']">
							<input v-if='pageStatus==0' type="text" v-model="vstName"   :placeholder-style="placeStyle" maxlength='14' placeholder="请输入商品标题，1-14个字符"   />
							<input v-else-if='pageStatus==1' type="text" v-model="vstName"   :placeholder-style="placeStyle" maxlength='14' placeholder="请输入商品标题，1-14个字符"   />
							<input v-else-if='pageStatus==2' disabled="true" type="text" v-model="vstName" />
						</div>
					</div>
				</div>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']">
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span class='must' v-if='pageStatus!=2'>*</span><span>关键字</span>
						</div>
						<div :class="[pageStatus==2?'rightInput2':'rightInput1']">
							<input type="text" v-if='pageStatus==0' v-model="keyWord" :placeholder-style="placeStyle" maxlength='14' placeholder="请输入商品标题，1-14个字符"   />
							<input type="text" v-if='pageStatus==1' v-model="keyWord" :placeholder-style="placeStyle" maxlength='14' placeholder="请输入商品标题，1-14个字符"   />
							<input type="text" v-if='pageStatus==2' v-model="keyWord" disabled="true"/>
						</div>
					</div>
				</div>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']">
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span class='must' v-if='pageStatus!=2'>*</span><span>商品重量</span>
						</div>
						<div :class="[pageStatus==2?'rightInput2':'rightInput1']">
							<input type="number" v-if='pageStatus==0' v-model="proWegiht"   :placeholder-style="placeStyle" maxlength='14' placeholder="请填写商品重量(单位：g/克)"   />
							<input type="number" v-if='pageStatus==1' v-model="proWegiht"   :placeholder-style="placeStyle" maxlength='14' placeholder="请填写商品重量(单位：g/克)"   />
							<input type="text" v-if='pageStatus==2' disabled='true' v-model="proWegiht"
								   :placeholder-style="placeStyle" maxlength='14'  />
						</div>
					</div>
				</div>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']">
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span>商品条形码</span>
						</div>
						<div :class="[pageStatus==2?'rightInput2':'rightInput1']">
							<input type="text" v-if='pageStatus==0' v-model="proCode"
								   :placeholder-style="placeStyle"  placeholder="请填写商品条形码" />
							<input type="text" v-if='pageStatus==1' v-model="proCode"
								   :placeholder-style="placeStyle"  placeholder="请填写商品条形码" />
							<input type="text" v-if='pageStatus==2' v-model="proCode"  disabled="true"
								   :placeholder-style="placeStyle" />
						</div>
					</div>
				</div>
				<!-- pageStatus:'',[0-上传，1-编辑，2-查看] -->
				<div :class="[pageStatus==2?'formDiv1':'formDiv']">
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span class='must' v-if='pageStatus!=2'>*</span><span>商品类名</span>
						</div>
						<div :class="[pageStatus==2?'rightInput2':'rightInput1']" @tap='showProClass()'>
							<input v-if='chooseClass.length==0' type="text" :placeholder-style="placeStyle" placeholder="请选择商品主类名">
							<input v-else type="text" disabled="true" :placeholder-style="placeStyle"
								   v-model="chooseClass[chooseClass.length-1].pname" placeholder="请选择商品主类名"  />
							<div v-if='pageStatus!=2' class='jiantouDiv' >
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>
				
				<div :class="[pageStatus==2?'formDiv1':'formDiv']" @tap='showProBrand()'>
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span class='must' v-if='pageStatus!=2'>*</span><span>商品品牌</span>
						</div>
						<div :class="[pageStatus==2?'rightInput2':'rightInput1']">
							<input type="text" v-if='pageStatus==0' disabled="true"   :placeholder-style="placeStyle"
								   v-model="proBrand" placeholder="请选择商品品牌" />
							<input type="text" v-if='pageStatus==1' disabled="true"   :placeholder-style="placeStyle"
								   v-model="proBrand.brand_name" placeholder="请选择商品品牌" />
							<input type="text" v-if='pageStatus==2' disabled="true"   :placeholder-style="placeStyle"
								   v-model="proBrand.brand_name" />
							<div v-if='pageStatus!=2' class='jiantouDiv' >
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']">
					<div :class="[pageStatus==2?'formList2':'formList1']">
						<div :class="[pageStatus==2?'leftText2':'leftText']" :style="pageStatus==2?'height: 39upx;':''">
							<span class='must' v-if='pageStatus!=2'>*</span><span>展示图</span>
						</div>
						<div class='rightInput' v-if='pageStatus!=2' >
							<div class='upImg1' v-for='(item,index) in showImg' :key='index' >
								<img class='wh_100' :src="item" alt="">
								<img :src="delImg" @tap='_delImg(index)' class='delImg'>
								<div v-if='index!=0' class='setMainImg' @tap='_setMain(index)'>设为主图</div>
								<div v-else class='mainImg'>主图</div>
							</div>
							<div v-if='showImg.length!=5' class='upImg' @tap='_chooseImg(showImg.length)'>
								<img :src="textIcon" style='width: 40upx;height: 34upx;' alt="">
								<div class='max_5'>最多上传五张</div>
							</div>
							<div class='jianyi'>（建议尺寸为375*375）</div>
						</div>
						<div class='rightInput' v-else>
							<div class='upImg1' v-for='(item,index) in showImg' :key='index' >
								<img class='wh_100' :src="item" alt="">
								<div v-if='index==0' class='mainImg'>主图</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class='hr'></div>
			<div class='pl_30'>
				<div class='formDiv'  v-if='pageStatus!=2'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span>成本价</span>
						</div>
						<div class='rightInput1'>
							<input type="digit"  v-model="costM" placeholder="请设置商品的默认成本价" @input='_cbj' :placeholder-style="placeStyle"/>
						</div>
					</div>
				</div>
				<div class='formDiv'  v-if='pageStatus!=2'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span>原价</span>
						</div>
						<div class='rightInput1'>
							<input type="digit" v-model="oldM" placeholder="请设置商品的默认原价" @input='_yj' :placeholder-style="placeStyle"/>
						</div>
					</div>
				</div>
				<div class='formDiv'  v-if='pageStatus!=2'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span>售价</span>
						</div>
						<div class='rightInput1'>
							<input type="digit" v-model="sellM" placeholder="请设置商品的默认售价" @input='_sj' :placeholder-style="placeStyle"/>
						</div>
					</div>
				</div>
				<div class='formDiv' v-if='pageStatus!=2'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span>库存</span>
						</div>
						<div class='rightInput1'>
							<input type="number" v-model="stock" placeholder="请设置商品的默认库存" @input='_kc' :placeholder-style="placeStyle"/>
						</div>
					</div>
				</div>
				<div class='formDiv' v-if='pageStatus!=2' >
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span>库存预警</span>
						</div>
						<div class='rightInput1'>
							<input type="number" v-model="stockWarn" placeholder="请填写库存预警" @input='_kcyj' :placeholder-style="placeStyle"/>
						</div>
					</div>
				</div>
				<div class='formDiv' v-if='pageStatus!=2'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span>单位</span>
						</div>
						<div class='rightInput1' @tap='showProUnit()'>
							<input disabled="t rue" v-if='pageStatus==0' v-model="unit" placeholder="请设置商品的默认单位"   :placeholder-style="placeStyle"/>
							<input disabled="true" v-if='pageStatus==1' v-model="unit" :placeholder-style="placeStyle"/>
							<input disabled="true" v-if='pageStatus==2' v-model="unit" />
							<div v-if='pageStatus!=2' class='jiantouDiv'  >
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>
				<div class='formDiv' v-if='pageStatus!=2'>
					<div class='formList'>
						<div class='leftText1'>
							<span>设置属性</span>
						</div>
						<div v-if='pageStatus!=2' class='rightInput1' @tap='_setAttr()'>
							<input disabled="true" v-model="setProt" placeholder="请设置商品的属性"   :placeholder-style="placeStyle"/>
							<div class='jiantouDiv'>
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if='pageStatus==2' class='seeTitle'>商品属性</div>
			<template v-if='pageStatus!=2'>
				<template v-for="(item,index) in attr_group">
					<div class='formDiv' :key="index" style="margin-left: 30rpx;" v-if="item.attr_list.length>0">
						<div class='formList'>
							<div class='leftText1'>
								<span>{{item.attr_group_name}}</span>
							</div>
							<div class='rightInput1' style="flex-wrap: wrap;height: auto;min-height: 90rpx;padding: 20rpx 20rpx 20rpx 0;">
								<span class="attrSpan" v-for="(items,indx) in item.attr_list" :key="indx"><span v-if="indx>0">，</span>{{items.attr_name}}</span>
							</div>
						</div>
					</div>
				</template>
			</template>
			<div class='attrList table' :style='{width:tableList}' v-if='attr_group.length>0&&pageStatus==2'>
				<div class='attrListHead tr'  >
					<div class='list2 th' v-for='(item,index) in attr_group' :key='index'>
						{{item.attr_group_name}}
					</div>
					<div class='list1 th'>成本价</div>
					<div class='list1 th'>原价</div>
					<div class='list1 th'>售价</div>
					<div class='list1 th'>库存</div>
				</div>
				<div class='attrListBody tr' v-for='(items,index) in attr_arr' :key='index'>
					<div class='tr'>
						<div class='list2  aa td' v-for='(item,index1) in items.attr_list' :key='index1'>
							<span class='a1'>{{item.attr_name}}</span>
						</div>
						<div class='list1 td'>{{items.cbj}}</div>
						<div class='list1 td'>{{items.yj}}</div>
						<div class='list1 td'>{{items.sj}}</div>
						<div class='list1 td'>{{items.kucun}}</div>
					</div>
				</div>
			</div>
			<div class='hr'></div>
			<div  v-if='pageStatus==2' class='seeTitle'>商品设置</div>
			<div class='pl_30'>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']" @tap='showProFreight()'>
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span class='must' v-if='pageStatus!=2'>*</span><span>运费设置</span>
						</div>
						<div class='rightInput1' :style="pageStatus==2?'height: auto;':''">
							<input type="text" disabled="true" v-if='pageStatus==0' v-model="freightSet" placeholder="请选择运费模板"   :placeholder-style="placeStyle"/>
							<input type="text" disabled="true" v-if='pageStatus==1' v-model="freightSet.name" placeholder="请选择运费模板"   :placeholder-style="placeStyle"/>
							<input type="text" disabled="true" v-if='pageStatus==2' v-model="freightSet.name" class='font_28'/>
							<div v-if='pageStatus!=2' class='jiantouDiv' >
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>

				<div :class="[pageStatus==2?'formDiv1':'formDiv']">
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span>显示标签</span>
						</div>
						<div v-if='pageStatus!=2' class='rightInput1 boxChoose'>
							<div  class='boxChooseDiv' v-for='(item,index) in s_type' :class='{"active":item.status}' :key='index' @tap='_chooseSType(index)' >{{item.name}}</div>
						</div>
						<div v-else class='rightInput1 boxChoose h_auto'>
							<template v-for='(item,index) in s_type'>
								<div class='font_28' v-if='item.status' :key='index'  >{{item.name}}</div>
							</template>
						</div>
					</div>
				</div>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']">
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span class='must' v-if='pageStatus!=2'>*</span><span>支持活动</span>
						</div>
						<div v-if='pageStatus!=2' class='rightInput1 boxChoose scroll'>
							<div  v-for='(item,index) in plugin_list.active' :key='index'>
								<div class='boxChooseDiv' @tap='_changeActive(index)'  :class='{"active":item.status}' v-if='type_status == 0'>
									{{item.name}}
								</div>
								<div class='boxChooseDiv'  :class='{"active":item.status}' v-else >
									{{item.name}}
								</div>
							</div>
						</div>
						<div v-else class='rightInput1 boxChoose h_auto scroll'>
							<div  v-for='(item,index) in plugin_list.active' :key='index'>
								<div class='font_28' v-if='item.status' >
									{{item.name}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']" v-if='show_adrStatus '>
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span>显示位置</span>
						</div>
						<div v-if='pageStatus!=2' class='rightInput1 boxChoose'>
							<div  class='boxChooseDiv' v-for='(item,index) in show_adr' :class='{"active":item.status}' :key='index' @tap='_chooseShowAdr(index)'>{{item.name}}</div>
						</div>
						<div v-else class='rightInput1 boxChoose h_auto'>
							<template v-for='(item,index) in show_adr'>
								<div class='font_28' v-if='item.status' :key='index' >{{item.name}}</div>
							</template>
						</div>
					</div>
				</div>
				<div :class="[pageStatus==2?'formDiv1':'formDiv']"  v-if='distributorsStatus'>
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span class='must' v-if='pageStatus!=2'>*</span><span>等级绑定</span>
						</div>
						<div class='rightInput1' @tap='showProDistributors()'>
							<input type="text" disabled="true" v-if='pageStatus==0' v-model="distributorsSet" placeholder="不绑定等级的会员商品"   :placeholder-style="placeStyle"/>
							<input type="text" disabled="true" v-if='pageStatus==1' v-model="distributorsSet.name" placeholder="不绑定等级的会员商品"   :placeholder-style="placeStyle"/>
							<input class='font_30' type="text" disabled="true" v-if='pageStatus==2' v-model="distributorsSet.name"/>
							<div v-if='pageStatus!=2' class='jiantouDiv' >
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class='hr'></div>
			<div  v-if='pageStatus==2' class='seeTitle'>详细内容</div>
			<div  v-if='pageStatus==2' >
				<wxParse v-if='showContent' :content="content"></wxParse>
			</div>
			<div class='pl_30'>
				<div  v-if='pageStatus!=2' class='formDiv border_bottom_0'>
					<div :class="[pageStatus==2?'formList2':'formList']">
						<div :class="[pageStatus==2?'leftText2':'leftText1']">
							<span class='must' v-if='pageStatus!=2'>*</span><span>商品详情</span>
						</div>
						<div v-if='pageStatus!=2' class='rightInput1' @tap='_toGoodDetail()'>
							<input type="text" disabled="true" :placeholder-style="placeStyle"/>
							<div class='jiantouDiv' >
								<img :src="jiantou"  alt="">
							</div>
						</div>
						<div v-else class='rightInput1'>
							
						</div>
					</div>
				</div>
			</div>
			<div class='hr'></div>

			<div v-if='pageStatus==0' class='submitDiv'>
				<div class='submitBtn div1' @tap='_Check("no")'>保存到本地</div>
				<div class='submitBtn div2' @tap='_Check("yes")'>提交审核</div>
			</div>
			<div v-else-if='pageStatus==1' class='submitDiv'>
				<div class='submitBtn div1' @tap='_Check("no")'>保存到本地</div>
				<div class='submitBtn div2' @tap='_Check("yes")'>提交审核</div>
			</div>
			<div v-else @tap='back()' class='submitDiv'>
				<div class='submitBtn div3'>返回</div>
			</div>
			<div v-if='chooseClassFlag' ref="proClassPicker" class='mask' @touchmove.stop.prevent>
				<div>
					<p class='mask_title'>
						选择商品类别
						<img class='closeImg' :src="closeImg" @tap='_closeClass'>
					</p>
					<scroll-view scroll-x class='chooseValueBox'>
						<div class='flex'>
							<p class='chooseValue' v-for='(item,index) in chooseClass' :key='index'>
								<text class='fenge' v-if='index!=0'>&gt;</text>
								<text class='span' @tap='del_Class(item,index)'>{{item.pname}}</text>
							</p>
						</div>
					</scroll-view>
					<scroll-view scroll-y class='chooseBox'>
						<ul>
							<li :class="{'active1':item.status}" v-for='(item,index) in arrClass' :key='index' :value='item.cid' @tap='_chooseClass(item,index)'>
								{{item.pname}}
								<img class='img' v-if='item.status' :src="chooseImg">
							</li>
						</ul>
					</scroll-view>
				</div>
			</div>
			
			<mpvue-picker v-show='proBrandShow' :themeColor="themeColor" ref="proBrandPicker" :mode="mode" :deepLength="deepLength"
						  :pickerValueDefault="proBrandPickerDefault" @onConfirm="onConfirmProBrand" :pickerValueArray="proBrandPickerArray"></mpvue-picker>
			<mpvue-picker v-show='proFreightShow' :themeColor="themeColor" ref="proFreightPicker" :mode="mode" :deepLength="deepLength"
						  :pickerValueDefault="proFreightPickerDefault" @onConfirm="onConfirmProFreight" :pickerValueArray="proFreightPickerArray"></mpvue-picker>
			<mpvue-picker v-show='proDistributorsShow' :themeColor="themeColor" ref="proDistributorsPicker" :mode="mode" :deepLength="deepLength"
						  :pickerValueDefault="proDistributorsPickerDefault" @onConfirm="onConfirmProDistributors" :pickerValueArray="proDistributorsPickerArray"></mpvue-picker>
			<mpvue-picker v-show='proUnitShow' :themeColor="themeColor" ref="proUnitPicker" :mode="mode" :deepLength="deepLength"
						  :pickerValueDefault="proUnitPickerDefault" @onConfirm="onConfirmProUnit" :pickerValueArray="proUnitPickerArray"></mpvue-picker>
		</div>
	</div>
</template>

<script>
    import heads from '../../components/header.vue'
    import mpvuePicker from '../../components/mpvuePicker.vue'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue' 
	import {
		LaiKeTui_axios,
		LaiKeTui_editor,
		LaiKeTui_see,
		LaiKeTui_showProClass,
		LaiKeTui_onConfirmProClass,
		LaiKeTui_showProBrand,
		LaiKeTui_onConfirmProBrand,
		LaiKeTui_delImg,
		LaiKeTui_setMain,
		LaiKeTui_chooseImg,
		LaiKeTui_cbj,
		LaiKeTui_yj,
		LaiKeTui_sj,
		LaiKeTui_kc,
		LaiKeTui_kcyj,
		LaiKeTui_showProUnit,
		LaiKeTui_setAttr,
		LaiKeTui_showProFreight,
		LaiKeTui_onConfirmProFreight,
		LaiKeTui_chooseSType,
		LaiKeTui_changeActive,
		LaiKeTui_chooseShowAdr,
		LaiKeTui_showProDistributors,
		LaiKeTui_onConfirmProDistributors,
		LaiKeTui_Check,
		LaiKeTui_request,
		LaiKeTui_p_id,
		LaiKeTui_p_id1,
	} from '../../static/js/myStore/uploadPro.js'
    export default {
        data() {
            return {
				title: '上传商品',
				access_id:'',
				textIcon:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/hhhh2x.png',
				delImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/delImg.png',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				closeImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/close2x.png',
				chooseImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/chooseMe.png',
				shop_id:'',
                status:'',
				p_id:'',
                pageStatus:'',//[0-上传，1-编辑，2-查看]
				widthArr:[],
				tableWidth:0,
                upImgNum:[5,4,3,2,1],
				themeColor: '#007AFF',
                mode: '',
                deepLength: 1,
				res:[],
				proName:'',
                vstName:'',
				keyWord:'',
                proWegiht:'',
				proCode:'',
                proClass:'',
				proClassId:'',
				proClassShow:false,
				proClassPickerArray:[],
                proClassPickerDefault: [],
				proClassSmall:'',
				proClassSmallId:'',
                proClassSmallShow:false,
				proClassSmallPickerArray:[],
				proClassSmallPickerDefault: [],
				proBrand:'',
				proBrandId:'0',
				proBrandShow:false,
                proBrandPickerArray:[],
                proBrandPickerDefault: [],
				showImg:[],
				showImgOld:'',//原图 --用于对照
				showImgNewAdd:[],
				initial:'',
				costM:'',
				oldM:'',
				sellM:'',
				stock:'',
				stockWarn:'',
				unit:'',
				setProt:'',
				proUnitShow:false,
				proUnitPickerArray:[],
				proUnitPickerDefault: [],
				// attr:'',
				// attrList:'',
				freightSet:'',
				freightSetId:'',
				proFreightShow:false,
				proFreightPickerArray:[],
				proFreightPickerDefault: [],
				s_type:'',
				plugin_list:[],
				active:[],

				show_adrStatus:true,
                show_adr:'',
				distributorsStatus:false,
				distributorsSet:'',
                distributorsSetId:'',
				proDistributorsShow:false,
                proDistributorsPickerArray:[],
				proDistributorsPickerDefault: [],
				downLineStatus:false,
                downLineAdd:'',
				showContent:false,//是否显示商品详情
				content:'',///商品详情
               
                frames_status:'',
                display_position:'',
                //以下为不必要数据
                fxStatus:'',
                s_typeStr:[],
                fastTap:true,
                secondClass:[],//二级类名数组
                haveChildrenClass:1,//是否有副类[1-有，-1-没有]
				
				type_status:'', // 商品类型状态
				check_Flag:true,  //限制提交按钮只能点一次
				placeStyle:'color:#b8b8b8;font-size:28upx',
				
				chooseClassFlag:false,
				arrClass:[],  //现在分类的数据 {id:'',name:'美妆护肤'}
				chooseClass:[],  //选中的分类  {id:'',name:'美妆护肤'}
				
				attr_group:[],//设置属性的表格标题
				attr_arr:[],//设置属性的表格数据
				
				richList: '',  //商品详情
				platform1:'android',//平台
				
				loadFlag: false, //已经加载完，用来规避监听事件改编属性表格
            }
        },
		watch:{
			costM(val){
				if(this.attr_arr && this.attr_arr.length>0 && this.loadFlag){
					this.attr_arr.filter(item=>{
						item.cbj = val
					})
					
					uni.setStorageSync('upload_attr_arr',this.attr_arr)
				}
			},
			oldM(val){
				if(this.attr_arr && this.attr_arr.length>0 && this.loadFlag){
					this.attr_arr.filter(item=>{
						item.yj = val
					})
					
					uni.setStorageSync('upload_attr_arr',this.attr_arr)
				}
			},
			sellM(val){
				if(this.attr_arr && this.attr_arr.length>0 && this.loadFlag){
					this.attr_arr.filter(item=>{
						item.sj = val
					})
					
					uni.setStorageSync('upload_attr_arr',this.attr_arr)
				}
			}
		},
        onLoad(option){
			var me = this;
			this.platform1 =  uni.getSystemInfoSync().platform;	
            me.$nextTick(function(){
            	me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
            		me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
            		me.shop_id = uni.getStorageSync('shop_id')?uni.getStorageSync('shop_id'):me.$store.state.shop_id
            		me.showContent = false;
            		me.status=option.pageStatus
            		if(option.p_id){
            		    me.p_id=option.p_id
            		}
            		if(!me.status){
            		    me.pageStatus=0;
						LaiKeTui_axios(me)
            		}
            		else if(me.status=="editor"){
            		    me.title='编辑商品'
            		    me.pageStatus=1
						LaiKeTui_editor(me)
            		}
            		else if(me.status=="see"){
            		    me.title='商品详情'
            		    me.pageStatus=2
						LaiKeTui_see(me)
            		}
            	});
            });
        },
        onShow() {
			this.platform1 =  uni.getSystemInfoSync().platform;	
            if(this.pageStatus!=2){
                if(uni.getStorageSync('upload_attr_group')){
                	this.attr_group=uni.getStorageSync('upload_attr_group')
                	this.attr_arr=uni.getStorageSync('upload_attr_arr')
                }
            }
            this.tableWidth=this.$store.state.tableWidth
			
			if(this.$store.state.detaiFlag){
				this.richList = this.$store.state.goodsDetail
				this.$store.state.detaiFlag = undefined
			}
        },
		onUnload() {
			uni.removeStorageSync('upload_attr_group')
			uni.removeStorageSync('upload_attr_arr')
			uni.removeStorageSync('upload_chooseAttr')
		},
		beforeDestroy() {
            var me=this
            this.$store.state.goodsDetail=[]
			me.fastTap = true
            uni.request({
                url: uni.getStorageSync("url"),
                data:{
                    module:'app',
                    action:'mch',
                    m:'del',
                    access_id:me.access_id,
                    shop_id:me.shop_id,
                },
                header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                method:'POST',
                success:function(res){

                }

            })
        },
        
		methods: {
			// 返回
            back(){
                uni.navigateBack({
                    delta:1
                })
            },
			// 获取分类
			showProClass(){
				var me=this
				LaiKeTui_showProClass(me)
			},
			//选中类名
			_chooseClass(item,index){
				// 每一个级别的分类只能选一次
				for(let i=0;i<this.arrClass.length;i++){
					if(this.arrClass[i].status || this.arrClass[i].chooseMe){
						return
					}
				}
				if(!item.chooseMe){
					item.chooseMe=true
					this.arrClass[index] = item
				}
				var me=this
				LaiKeTui_onConfirmProClass(me,item)
			},
			// 删除类名
			del_Class(item,index){
				this.chooseClass=this.chooseClass.splice(0,index)
				console.log(this.chooseClass)
				if(this.chooseClass.length == 0){
					this.proClassId = 0
				}else{
					this.proClassId = this.chooseClass[this.chooseClass.length - 1].cid
				}
				// if(index>0){
				this.chooseClass.push({pname:'请选择'})
				
				this.showProClass()
			},
			// 选择品牌
			showProBrand() {
				if(!this.proClassId){
					return uni.showToast({
						icon: 'none',
						title: '请选择商品类名！'
					})
				}
				var me=this
				LaiKeTui_showProBrand(me)
			},
			// 点击品牌
			onConfirmProBrand(e) {
				var me=this
				LaiKeTui_onConfirmProBrand(me,e)
			},
			// 删除图片
			_delImg(index){
				var me=this
				LaiKeTui_delImg(me,index)
			},
			// 设为主图
			_setMain(index){
			    var me=this
				LaiKeTui_setMain(me,index)
			},
			// 选择图片
			_chooseImg(num){
			    var me=this
				LaiKeTui_chooseImg(me,num)
			},
			// 成本价
			_cbj(e){
				var me=this
				LaiKeTui_cbj(me,e)
			},
			// 原价
			_yj(e){
				var me=this
				LaiKeTui_yj(me,e)
			},
			// 售价
			_sj(e){
				var me=this
				LaiKeTui_sj(me,e)
			},
			// 库存
			_kc(e){
				var me=this
				LaiKeTui_kc(me,e)
			},
			// 库存预警
			_kcyj(e){
				var me=this
				LaiKeTui_kcyj(me,e)
			},
			// 选择单位
			onConfirmProUnit(e) {
			    this.unit = e.label
			    this.show=false
			},
			// 显示单位
			showProUnit() {
				var me=this
				LaiKeTui_showProUnit(me)
			},
			// 设置属性
			_setAttr(){
			    var me=this
				LaiKeTui_setAttr(me)
			},
			// 运费
			showProFreight() {
				var me=this
				if(me.pageStatus!=2){
					LaiKeTui_showProFreight(me);
				}
			},
			// 点击运费
			onConfirmProFreight(e) {
				var me=this
				LaiKeTui_onConfirmProFreight(me,e)
			},
			// 显示标签
			_chooseSType(index){
			    var me=this
				LaiKeTui_chooseSType(me,index)
			},
			// 支持活动
			_changeActive(num){
				var me=this
				LaiKeTui_changeActive(me,num)
			},
			// 显示位置
			_chooseShowAdr(index){
			    var me=this
				LaiKeTui_chooseShowAdr(me,index)
			},
			// 等级绑定
			showProDistributors(){
				var me=this
				LaiKeTui_showProDistributors(me)
			},
			// 点击分销等级
			onConfirmProDistributors(e) {
				var me=this
				LaiKeTui_onConfirmProDistributors(me,e)
			},
			_downLineStatus:function(e){
			    this.downLineStatus=e.target.value
			},
			// 商品详情
			_toGoodDetail(){
			    uni.navigateTo({
			        url:'../myStore/goodsDetail'
			    })
			},
			// 提交
			_Check(type){
				if(this.check_Flag){
					this.check_Flag = false
					var me=this
					LaiKeTui_Check(me,type)
				}
			},
			async _request(type){
			    var me = this
				LaiKeTui_request(me,type)
			},
			
            _p_id(i,data){
                var me=this
                LaiKeTui_p_id(i,data,me)
            },
            _p_id1(i,data){
                var me=this
                LaiKeTui_p_id1(i,data,me)
            },
			/**
			 * 获取
			 */
			getGoodsDetailsContext(){
				var me = this;
				let myGoodsInfo = me.$store.state.goodsDetail;
				let htmlStr = "";
				for(var x in myGoodsInfo){
					let elementHtmlInfo = myGoodsInfo[x];
					let tagType = elementHtmlInfo.tagType;
					let style = elementHtmlInfo.style;
					let htmlText = elementHtmlInfo.value;
					switch(tagType){
						case 'p':
						case 'P':
						htmlStr += "<"+tagType+" style=\""+style+"\">"+htmlText+"</"+tagType+">";
						break;
						case 'image':
						htmlStr += "<img style=\""+style+"\" src=\""+htmlText+"\" />";
						break;
					}
				}
				
				return htmlStr;
			},
            // pageStatus:'',//[0-上传，1-编辑，2-查看]
         
            _fxStatus:function(e){
                this.fxStatus=e.target.value
            },
			
			// 关闭类名选择
			_closeClass(){
				this.chooseClassFlag=false
				if(this.chooseClass.length>1){
					this.chooseClass.length=this.chooseClass.length-1
				}
			}
        },
        computed: {
            widthArr1:function(){
                return this.widthArr
            },
            tableList:function(){
                if(this.attr_group.length==0){
                    var width=750
                    return uni.upx2px(width)+'px'
                }
                else{
                    var width=this.tableWidth*2+130*5
                    return uni.upx2px(width)+'px'
                }
            },
        },
        components: {
            heads,
            mpvuePicker,
			wxParse
        },
    }
</script>

<style lang="less">
	@import url("../../static/css/myStore/uploadPro.less");
</style>