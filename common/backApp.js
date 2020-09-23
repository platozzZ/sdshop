//返回APP首页
let backApp = {
    default: this,// for typescript
	thisBack(that){
		// that.$bridge.call("cmmc.pushGoBack")
		that.$bridge.call("cmmc.pushGoBack", '', (data) => {});
	}
}

module.exports = backApp;
// export function backApp(that){
// 	console.log(that);
// 	that.$bridge.call("cmmc.pushGoBack")
// }