import Vue from 'vue'
import Request from './request.js'

class methods extends Request {
	
	constructor() {
		super()
	}

	post(Parma) {
		return super.request({
			method: 'POST',
			...Parma
		})
	}
	
	get(Parma){
		return super.request({
			...Parma
		})
	}
	
	/**
	 * @description 图片上传
	 * @param { String } filePath 选中图片路径
	 * */ 
	upLoad(filePath) {
		return super.uploadimg(filePath)
	}
}

const REQ = new methods()

//添加请求拦截器
// REQ.request.use = (config) => {
// 	console.log(config)
// }

//添加响应拦截器
// REQ.response.use = (config) => {
// 	console.log(config)
// }


Vue.prototype.$req = REQ
export default REQ
