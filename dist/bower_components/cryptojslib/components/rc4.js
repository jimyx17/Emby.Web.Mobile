!function(){function generateKeystreamWord(){for(var S=this._S,i=this._i,j=this._j,keystreamWord=0,n=0;n<4;n++){i=(i+1)%256,j=(j+S[i])%256;var t=S[i];S[i]=S[j],S[j]=t,keystreamWord|=S[(S[i]+S[j])%256]<<24-8*n}return this._i=i,this._j=j,keystreamWord}var C=CryptoJS,C_lib=C.lib,StreamCipher=C_lib.StreamCipher,C_algo=C.algo,RC4=C_algo.RC4=StreamCipher.extend({_doReset:function(){for(var key=this._key,keyWords=key.words,keySigBytes=key.sigBytes,S=this._S=[],i=0;i<256;i++)S[i]=i;for(var i=0,j=0;i<256;i++){var keyByteIndex=i%keySigBytes,keyByte=keyWords[keyByteIndex>>>2]>>>24-keyByteIndex%4*8&255;j=(j+S[i]+keyByte)%256;var t=S[i];S[i]=S[j],S[j]=t}this._i=this._j=0},_doProcessBlock:function(M,offset){M[offset]^=generateKeystreamWord.call(this)},keySize:8,ivSize:0});C.RC4=StreamCipher._createHelper(RC4);var RC4Drop=C_algo.RC4Drop=RC4.extend({cfg:RC4.cfg.extend({drop:192}),_doReset:function(){RC4._doReset.call(this);for(var i=this.cfg.drop;i>0;i--)generateKeystreamWord.call(this)}});C.RC4Drop=StreamCipher._createHelper(RC4Drop)}();