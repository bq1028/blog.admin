import webpack from 'webpack';

let base = {
    entry: '',
    output: {
        path: '',
        filename: 'compile.js'
    },
    module: {
        loaders: [
            { 
                test: /\.vue$/, 
                loader: 'vue'
            }, { 
                test: /\.js$/, 
                loader: 'babel',
                exclude: /node_modules/
            }, { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader' 
            }, { 
                test: /\.json/, 
                loader: "json" 
            }, {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname
            }
        ]
    },
    plugins: [],
    vue: {
        loaders: {
            js: 'babel'
        }
    }
};

/*
 * @description 设置入口
 * @params {object} 需要被对象
 * @return {object} 克隆结果
 */    
let clone = function (obj){  
    let o;  
    if(typeof obj == "object") {  
        if(obj === null){  
            o = null;  
        } else {  
            if(obj instanceof Array){  
                o = [];  

                for(let i = 0, len = obj.length; i < len; i++){  
                    o.push(clone(obj[i]));  
                }  
            } else if(obj instanceof RegExp){
                o = obj;
            } else {  
                o = {};  

                for(let k in obj){  
                    o[k] = clone(obj[k]);  
                }  
            }  
        }  
    }else{  
        o = obj;  
    }  

    return o;  
};

export default {
    /*
     * @description 设置入口
     * @params {string} 入口
     * @return none
     */    
    setEntry: function(entry) {
        base.entry = entry;
    },
    /*
     * @description 设置输出路径
     * @params {string} 输出路径
     * @return none
     */    
    setEnv: function(output) {
        base.output.path = output;
    },    
    /*
     * @description 设置输出的文件名
     * @params {string} 输出的文件名
     * @return none
     */    
    setFileName: function(filename) {
        base.output.filename = filename;
    },        
    /*
     * @description 获取
     * @params {string} 入口
     * @params {string} 输出路径    
     * @params {string} 输出文件名称    
     * @return {object}
     */    
    get: function(entry, output, filename) {
        if(entry) {
            this.setEntry(entry);
        }

        if(output) {
            this.setEnv(output);
        }

        if(filename) {
            this.setFileName(filename);
        } else {
            this.setFileName('app.js')
        }

        return clone(base);        
    }
}