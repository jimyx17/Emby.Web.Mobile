CryptoJS.pad.Iso10126={pad:function(data,blockSize){var blockSizeBytes=4*blockSize,nPaddingBytes=blockSizeBytes-data.sigBytes%blockSizeBytes;data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes-1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes<<24],1))},unpad:function(data){var nPaddingBytes=255&data.words[data.sigBytes-1>>>2];data.sigBytes-=nPaddingBytes}};