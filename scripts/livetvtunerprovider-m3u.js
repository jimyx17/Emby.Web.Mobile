define(["jQuery"],function($){"use strict";function reload(page,providerId){page.querySelector(".txtDevicePath").value="",providerId&&ApiClient.getNamedConfiguration("livetv").then(function(config){var info=config.TunerHosts.filter(function(i){return i.Id==providerId})[0];page.querySelector(".txtDevicePath").value=info.Url||""})}function submitForm(page){Dashboard.showLoadingMsg();var info={Type:"m3u",Url:page.querySelector(".txtDevicePath").value,EnableTvgId:!0},id=getParameterByName("id");id&&(info.Id=id),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("LiveTv/TunerHosts"),data:JSON.stringify(info),contentType:"application/json"}).then(function(){Dashboard.processServerConfigurationUpdateResult(),Dashboard.navigate("livetvstatus.html")},function(){Dashboard.hideLoadingMsg(),Dashboard.alert({message:Globalize.translate("ErrorSavingTvProvider")})})}$(document).on("pageinit","#liveTvTunerProviderM3UPage",function(){var page=this;$("form",page).on("submit",function(){return submitForm(page),!1}),$("#btnSelectPath",page).on("click.selectDirectory",function(){require(["directorybrowser"],function(directoryBrowser){var picker=new directoryBrowser;picker.show({includeFiles:!0,callback:function(path){path&&$(".txtDevicePath",page).val(path),picker.close()}})})})}).on("pageshow","#liveTvTunerProviderM3UPage",function(){var providerId=getParameterByName("id"),page=this;reload(page,providerId)})});