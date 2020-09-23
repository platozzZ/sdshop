/*设置storage*/
export function setStorage(name,value) {
    	uni.setStorage({
    		key:name,
    		data:value,
    		success: function(){
				console.log('setSuccess')
    		}
    	})
}

/*获取storage*/
export function getStorage(name){
			var res1
    	uni.getStorage({
    		key:name,
			success: function(res){
				res1=res.data
				console.log('getSuccess')
			}
    	})
			return res1
			console.log(res1)
}

/*删除storage*/
export function removeStorage(name){
    	uni.removeStorage({
    		key:name,
				success: (res) => {
					console.log('removeSuccess')
				}
    	})
}