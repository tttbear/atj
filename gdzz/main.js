"ui";
// 热更新 http://dog.zzzzzz.me/tgapi.php
var nowversion = "1.0.1";

threads.start(function() {
    var gxurl = "http://pingshuke.com/gdzz.php";
    var gxres =  http.get(gxurl).body.json();
    log(gxres.gdzz_version);
    if(nowversion != gxres.gdzz_version){
        toast("更新版本 " + xres.gdzz_version );
        threads.start(function() {
            codePath = engines.myEngine().cwd() + "/main.js";
            files.write( codePath, http.get (gxres.gdzz_url) . body . string());
            engines . execScriptFile( codePath);
            exit();
        });
    }
});

// ui界面
ui.layout(
    <vertical>
        <appbar>
            <toolbar title="'GDZZ' By 小龙猫" />
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