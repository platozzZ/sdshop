<template>
	<div>
		<div class="scanning">
			<div id="scan_d">
				<div class='scan_ind'></div>
			</div>
			<div class='scan_banck' @click="_scan_banck">
				<img :src="back_img" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				back_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
			}
		},
		onLoad(){
			
		},
		mounted() {
			this.startRecognize()
		},
		methods:{
			//关闭扫描页面
			_scan_banck() {
				var me = this
				setTimeout(function(){
					me.cancelScan()
				}.bind(me),50)
			},
			//创建扫描控件
			startRecognize() {
				let that = this;
				if(!window.plus) return
				console.log(window.plus)
				this.scan = new plus.barcode.Barcode('scan_d')
				this.startScan()
				this.scan.onmarked = onmarked;
				function onmarked(type, result, file) {
					switch(type) {
						case plus.barcode.QR:
							type = 'QR';
							break;
						case plus.barcode.EAN13:
							type = 'EAN13';
							break;
						case plus.barcode.EAN8:
							type = 'EAN8';
							break;
						default:
							type = '其它' + type;
							break;
					}
					result = result.replace(/\n/g, '');
					that.codeUrl = result;
					if(result) {
						uni.navigateTo({
							url:"../scavenging/scavenging?result="+result
						})
					} else {
						console.log('扫描失败')
					}
					that.closeScan();
				}
			},
			//开始扫描
			startScan() {
				if(!window.plus) return;
				this.scan.start();
			},
			//关闭扫描控件
			cancelScan() {
				if(!window.plus) return;
				this.scan.cancel();
				this.closeScan()
			},
			//关闭条码识别控件
			closeScan() {
				if(!window.plus) return;
				this.scan.close();
			},
		}
	}
	
</script>

<style scoped>
	@import url("../../static/css/search/scan.css");
</style>