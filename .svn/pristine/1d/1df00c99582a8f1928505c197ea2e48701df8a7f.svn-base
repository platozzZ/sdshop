const path = require('path')

module.exports = {    
    css: {    
        loaderOptions: {    
            less: {    
                javascriptEnabled: true,    
                modifyVars: {    
                    'hack': `true;@import "${path.resolve(__dirname,'./').replace(/\\/g,'\\\\')}/laike.less";`    
                }    
            }    
        }    
    }    
}  