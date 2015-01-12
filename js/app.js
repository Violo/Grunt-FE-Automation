// Detection App Pinnata -->
if (window.navigator.standalone) {
    document.documentElement.className += " pinnata";
    } else {
        document.documentElement.className += " no-pinnata";
}

// Detection Android Device
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
if(isAndroid) {
    document.documentElement.className += " android-device";
    } else {
        document.documentElement.className += " no-android-device";
}