function Map() {
    this.keys = new Array();
    this.data = new Object();

    /**
     * ����һ����ֵ��
     * @param {String} key
     * @param {Object} value
     */
    this.put = function(key, value) {
        if(this.data[key] == null){
            this.keys.push(key);
            this.data[key] = value;
        }else{
            this.data[key]=this.data[key];
        }
        return true;
    };

    /**
     * ��ȡĳ����Ӧ��ֵ
     * @param {String} key
     * @return {Object} value
     */
    this.get = function(key) {
        return this.data[key];
    };

    /**
     * ɾ��һ����ֵ��
     * @param {String} key
     */
    this.remove = function(key) {
        for(var i=0;i<this.keys.length;i++){
            if(key===this.keys[i]){
                var del_keys= this.keys.splice(i,1);
                for(k in del_keys){
                    this.data[k] = null;
                }
                return true;
            }
        }
        return false;
    };

    /**
     * ����Map,ִ�д�����
     *
     * @param {Function} �ص����� function(key,value,index){..}
     */
    this.each = function(fn){
        if(typeof fn != 'function'){
            return;
        }
        var len = this.keys.length;
        for(var i=0;i<len;i++){
            var k = this.keys[i];
            fn(k,this.data[k],i);
        }
    };

    /**
     * ��ȡ��ֵ����
     * @return entity[{key,value},{key,value}]
     */
    this.entrySet = function() {
        var len = this.keys.length;
        var entrys = new Array(len);
        for (var i = 0; i < len; i++) {
            entrys[i] = {
                key : this.keys[i],
                value : this.data[this.keys[i]]
            };
        }
        return entrys;
    };

    /**
     * �ж�Map�Ƿ�Ϊ��
     */
    this.isEmpty = function() {
        return this.keys.length == 0;
    };

    /**
     * ��ȡ��ֵ������
     */
    this.size = function(){
        return this.keys.length;
    };

    this.containsKey=function(key){
        return this.keys.filter(function(v){
           if(v===key){
               return key;
           }
        }).length>0;
    };
    /**
     * ��дtoString
     */
    this.toString = function(){
        var s = "{";
        for(var i=0;i<this.keys.length;i++){
            var k = this.keys[i];
            s += k+"="+this.data[k];
            if(this.keys.length>i+1){
                s+=','
            }
        }
        s+="}";
        return s;
    };
}