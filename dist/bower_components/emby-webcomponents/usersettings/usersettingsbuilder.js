define(["appSettings","events","browser"],function(appsettings,events,browser){"use strict";return function(){function onSaveTimeout(){saveTimeout=null,currentApiClient.updateDisplayPreferences("usersettings",displayPrefs,currentUserId,"emby")}function saveServerPreferences(){saveTimeout&&clearTimeout(saveTimeout),saveTimeout=setTimeout(onSaveTimeout,50)}var currentUserId,currentApiClient,displayPrefs,saveTimeout,self=this;self.setUserInfo=function(userId,apiClient){return saveTimeout&&clearTimeout(saveTimeout),currentUserId=userId,currentApiClient=apiClient,userId?apiClient.getDisplayPreferences("usersettings",userId,"emby").then(function(result){result.CustomPrefs=result.CustomPrefs||{},displayPrefs=result}):(displayPrefs=null,Promise.resolve())},self.getData=function(){return displayPrefs},self.importFrom=function(instance){displayPrefs=instance.getData()},self.set=function(name,value,enableOnServer){var userId=currentUserId;if(!userId)throw new Error("userId cannot be null");var currentValue=self.get(name);appsettings.set(name,value,userId),enableOnServer!==!1&&displayPrefs&&(displayPrefs.CustomPrefs[name]=null==value?value:value.toString(),saveServerPreferences()),currentValue!==value&&events.trigger(self,"change",[name])},self.get=function(name,enableOnServer){var userId=currentUserId;if(!userId)throw new Error("userId cannot be null");return enableOnServer!==!1&&displayPrefs?displayPrefs.CustomPrefs[name]:appsettings.get(name,userId)},self.enableCinemaMode=function(val){return null!=val&&self.set("enableCinemaMode",val.toString(),!1),val=self.get("enableCinemaMode",!1),!val||"false"!==val},self.enableThemeSongs=function(val){return null!=val&&self.set("enableThemeSongs",val.toString(),!1),val=self.get("enableThemeSongs",!1),"false"!==val},self.enableThemeVideos=function(val){return null!=val&&self.set("enableThemeVideos",val.toString(),!1),val=self.get("enableThemeVideos",!1),val?"false"!==val:!browser.slow},self.language=function(val){return null!=val&&self.set("language",val.toString(),!1),self.get("language",!1)},self.skipBackLength=function(val){return null!=val&&self.set("skipBackLength",val.toString()),parseInt(self.get("skipBackLength")||"15000")},self.skipForwardLength=function(val){return null!=val&&self.set("skipForwardLength",val.toString()),parseInt(self.get("skipForwardLength")||"15000")},self.serverConfig=function(config){var apiClient=currentApiClient;return config?apiClient.updateUserConfiguration(currentUserId,config):apiClient.getUser(currentUserId).then(function(user){return user.Configuration})}}});