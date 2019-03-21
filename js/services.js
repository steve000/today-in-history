angular.module('myApp.services', [])

    .provider('Weather', function () {
        var apiKey = "";
        var currentDate = "";

        this.setApiKey = function (key) {
            if (key) {
                this.apiKey = key;
                var myDate = new Date();
                this.currentDate = myDate.getMonth() + '-' + myDate.getDate()
            }
        };

        this.getUrl = function (type, ext) {
            return "http://api.shujuzhihui.cn/api/todayhistory/getTitle" +
                "?appKey=" + this.apiKey + "&qdate=" + this.currentDate;
        }

        this.$get = function ($q, $http) {
            var self = this;
            return {
                getWeatherForecast: function (city) {
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: self.getUrl('forecast', city),
                        cache: true
                    }).success(function (data) {
                        // console.log('11', data)
                        deferred.resolve(data.RESULT);
                    }).error(function (err) {
                        deferred.reject(err)
                    });
                    return deferred.promise;
                }
            }
        }

    })

    .factory('UserService', function(){
        var defaults = {
            location: 'autoip'
        };

        var service = {
            user: {},
            save: function(){
                sessionStorage.presenty = angular.toJson(service.user);
            },
            restore: function(){
                // 从sessionStorage中拉取配置
                service.user = angular.fromJson(sessionStorage.presenty) || defaults;
                return service.user;
            }
        };
        // 立即调用它，从sessionStorage中恢复配置
        service.restore();
        return service;
    })