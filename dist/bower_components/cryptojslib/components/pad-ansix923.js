CryptoJS.pad.AnsiX923={pad:function(data,blockSize){var dataSigBytes=data.sigBytes,blockSizeBytes=4*blockSize,nPaddingBytes=blockSizeBytes-dataSigBytes%blockSizeBytes,lastBytePos=dataSigBytes+nPaddingBytes-1;data.clamp(),data.words[lastBytePos>>>2]|=nPaddingBytes<<24-lastBytePos%4*8,data.sigBytes+=nPaddingBytes},unpad:function(data){var nPaddingBytes=255&data.words[data.sigBytes-1>>>2];data.sigBytes-=nPaddingBytes}};