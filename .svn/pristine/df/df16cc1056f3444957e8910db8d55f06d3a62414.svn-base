class Request {
	constructor() {
		this.URI = uni.getStorageSync("url") || ''
	}

	request(Parma) {

		return new Promise((resolve, reject) => {
			// 请求拦截
			if(typeof this.request.use === 'function'){
				this.request.use(Parma)
			}
			
			uni.request({
				url: uni.getStorageSync("url") ,
				method: Parma.method || 'GET',
				data: Parma.data || {},
				header: Parma.header || { 'content-type':'application/x-www-form-urlencoded' },
				success:(res) => {
					if(this.response(res)){
						resolve(res.data)
					}
				},
				fail:(err) => {
					// TODO:错误处理
					// 错误自行.catch处理
					reject(err)
				}
			})
		})
	}
	
	uploadimg(filePath) {
		return new Promise((resolve, reject) => {
			let data = {
				module: 'app',
				action: 'mch',
				m: 'uploadImgs'
			}
			
			// #ifdef MP-WEIXIN
			data.store_type = 1
			// #endif
			
			// #ifndef MP-WEIXIN
			data.store_type = 2
			// #endif
			
			uni.uploadFile({
				url: uni.getStorageSync("url"),
				filePath: filePath,
				name: 'image',
				formData: data,
				success: (res) => {
					let Data = JSON.parse(res.data)
					if(Data.code == 200){
						resolve(Data)
					} else {
						reject(Data)
					}
				}
			})
	
		})
	}
	
	response(res){
		let { statusCode } = res

		// 响应拦截
		if(typeof this.response.use === 'function'){
			this.response.use(res)
		}
		
		if(statusCode === 200){
			return true
		}
		return false
	}

}

export default Request