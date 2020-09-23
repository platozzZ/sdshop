<template>
	<div class="mpvue-picker">
		<div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
		<div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
			<div class="mpvue-picker__hd" catchtouchmove="true">
			  <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
			  <div class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</div>
			</div>
			<div style="display: flex;justify-content: center;align-items: center;background: #fff;">
				<picker-view :value="value1" @change="bindChange1" class="mpvue-picker-view" indicator-style="height: 40px;" style="flex: 1;">
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
					</picker-view-column>
				</picker-view>
				~
				<picker-view :value="value2" @change="bindChange2" class="mpvue-picker-view" indicator-style="height: 40px;" style="flex: 1;">
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
					</picker-view-column>
				</picker-view>
			</div>
		</div>
	</div>
</template>

<script>
	let date = new Date()
	let hour = date.getHours()
	let minute = date.getMinutes()
	
	let hours = []
	let minutes = []
	
	for(let i=0;i<24;i++){
		if(i<10){
			hours.push('0'+i)
			continue
		}
		hours.push(i)
	}
	
	for(let i=0;i<60;i++){
		if(i<10){
			minutes.push('0'+i)
			continue
		}
		minutes.push(i)
	}
	
	export default {
	    data() {
	      return {
					hours,
					minutes,
					value:[hour,minute],
					value1: [],
					value2: [],
					/* 是否显示控件 */
					showPicker: false,
					/* 选择时间段 */
					time: [hours[hour]+':'+minutes[minute],hours[hour]+':'+minutes[minute]]
	      }
	    },
			props: ['themeColor','urseTime'],
	    methods: {
			show(data) {
				if(data){
					let sparr = []
					let arr = data.split('~')
					for(let item of arr){
						sparr.push(item.split(':'))
					}
					this.value1 = []
					this.value2 = []
					this.value1.push(...sparr[0])
					this.value2.push(...sparr[1])
					
					// 进来的时候，初始化选择的时间为原来的营业时间
					this.time = arr
				}
			  setTimeout(() => {
			    this.showPicker = true;
			  }, 0);
				
			},
			maskClick() {
			  this.pickerCancel();
			},
			pickerCancel() {
			  this.showPicker = false;
			},
			pickerConfirm(e) {
			  this.showPicker = false;
			  this.$emit('onConfirm',this.time);
			},
			showPickerView() {
			  this.showPicker = true;
			},
			bindChange1(e){
			    const val = e.detail.value
				this.time[0] = this.hours[val[0]]+':'+this.minutes[val[1]]
			},
			bindChange2(e){
			    const val = e.detail.value
				this.time[1] = this.hours[val[0]]+':'+this.minutes[val[1]]
			},
	    },
		created(){
			
		},
		watch:{
			
		}
	}
</script>

<style scoped>
	.mpvue-picker-view {
	  position: relative;
	  bottom: 0;
	  left: 0;
	  width: 100%;
	  height: 238px;
	  background-color: rgba(255, 255, 255, 1);
	}
	.picker-item {
	  text-align: center;
	  line-height: 40px;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  font-size: 16px;
	}
	.pickerMask {
	  position: fixed;
	  z-index: 1000;
	  top: 0;
	  right: 0;
	  left: 0;
	  bottom: 0;
	  background: rgba(0, 0, 0, 0.6);
	}
	.mpvue-picker-content {
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  width: 100%;
	  transition: all 0.3s ease;
	  transform: translateY(100%);
	  z-index: 3000;
	}
	.mpvue-picker-view-show {
	  transform: translateY(0);
	}
	.mpvue-picker__hd {
	  display: flex;
	  padding: 9px 15px;
	  background-color: #fff;
	  position: relative;
	  text-align: center;
	  font-size: 17px;
	}
	.mpvue-picker__hd:after {
	  content: ' ';
	  position: absolute;
	  left: 0;
	  bottom: 0;
	  right: 0;
	  height: 1px;
	  border-bottom: 1px solid #e5e5e5;
	  color: #e5e5e5;
	  transform-origin: 0 100%;
	  transform: scaleY(0.5);
	}
	.mpvue-picker__action {
	  display: block;
	  flex: 1;
	  color: #1aad19;
	}
	.mpvue-picker__action:first-child {
	  text-align: left;
	  color: #888;
	}
	.mpvue-picker__action:last-child {
	  text-align: right;
	}
</style>