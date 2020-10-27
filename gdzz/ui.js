"ui";
// 热更新
var ui_version = "1.0.1";
var xf_version = "1.0.1";
var zx_version = "1.0.1";

threads.start(function () {
    var gxurl = "https://gitee.com/ttbearx/ajs/raw/master/gdzz.txt";
    var gxres = http.get(gxurl).body.json();
    log(gxres);
    codePath = engines.myEngine().cwd();
    if (ui_version != gxres.gdzz_ui_version || xf_version != gxres.gdzz_xf_version || zx_version != gxres.gdzz_zx_version) {
        threads.start(function () {
            files.write(codePath + "/ui.js", http.get(gxres.gdzz_ui_js_url).body.string());
            files.write(codePath + "/xf.js", http.get(gxres.gdzz_xf_js_url).body.string());
            files.write(codePath + "/zx.js", http.get(gxres.gdzz_zx_js_url).body.string());
            engines.execScriptFile(codePath + "/ui.js");
            exit();
        });

    }
});

// 首次运行脚本时设置悬浮窗状态为假
var xfc_open_status = false;

// 检测是否有悬浮窗权限，有的话直接开启悬浮窗
threads.start(function () {
    //在新线程执行的代码
    if (floaty.checkPermission() == true) {
        xfc_kq();
    }
});

// ui界面
ui.layout(
    <vertical>
        <appbar>
            <toolbar title="'新版本" />
        </appbar>
        <card margin="10 10 10 5">
            <vertical>
                <Switch id="autoService" text="确保本软件无障碍服务状态为开启 >" checked="{{auto.service != null}}" padding="10 10" textSize="14sp" />
                <Switch id="xfc_qx" text="确保本软件悬浮窗权限状态为开启 >" checked="{{floaty.checkPermission() == true}}" padding="10 10" textSize="14sp" />
            </vertical>
        </card>
        <card margin="10 10 10 5" height="350">
            <vertical>
                <text margin="10 5" text="注意事项：" />
                <text margin="10 5" text="1. 模拟器或云手机分辨率必须是：720*1280 ；" />
                <text margin="10 5" text="2. 不需要ROOT权限，但安卓版本必须是7.0以上；" />
                <text margin="10 5" text="3. 测试雷电模拟器最新版及云手指等操作正常" />
                <text margin="10 5" text="4. 权限开启后会显示一个悬浮按钮，如果没有弹出的话请尝试重启脚本，后续的开始/结束/彻底退出等任务都在悬浮按钮中操作；" />
                <text margin="10 5" text="5. 弹出悬浮按钮后，打开游戏到'战斗'页面，然后选择需要操作的任务，点击保存配置，最后点击启动按钮即可。" />
                <text margin="10 5" textColor="red" text="6. 脚本还在不断调试中，期间为了稳定设置间隔比较长，出现1-3秒的停顿属于正常现象请耐心等待几秒。" />
                <text margin="10 5" id="q" text="7. 有问题欢迎加QQ群7346 26126反馈o(∩_∩)o" />
            </vertical>
        </card>
    </vertical>
);
// 判断无障碍开启状态
ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
        toast("请找到本应用并开启无障碍服务。");
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
// 判断悬浮窗开启状态
ui.xfc_qx.on("check", function (checked) {
    if (!$floaty.checkPermission()) {
        // 没有悬浮窗权限，提示用户并跳转请求
        $floaty.requestPermission();
        toast("请给本应用开启悬浮窗权限，\n然后重新打开本应用使用。");
        exit();
    } else {
        toast("已有悬浮窗权限");
        ui.xfc_qx.checked = true;
        xfc_kq();
    }
});

// 当用户回到本界面时，resume事件会被触发，同步开关状态
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
    ui.xfc_qx.checked = floaty.checkPermission() == true;
    if (floaty.checkPermission() == true) {
        // 已经获得悬浮窗权限，运行悬浮窗脚本
        xfc_kq();
    }
});

// 启动悬浮窗 有判断是否要开启
function xfc_kq() {
    // toast("悬浮状态：" + xfc_open_status);
    if (xfc_open_status == false && auto.service !== null) {
        // 设置悬浮窗状态为开启
        xfc_open_status = true;
        // 非线程形式调用脚本
        require('./xf.js');
    }
}