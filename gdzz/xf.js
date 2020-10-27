
// 保存任务数组的配置文件
var bcpz_rw_storage = storages.create("gdzz_test_bcpz_rw");
// 首次运行先把它设置为默认勾选打造 防止为空时窗口弹出出错！
var aa = [1];
bcpz_rw_storage.put("任务数组", aa);

// 保存脚本运行状态的配置文件
var zx_jbzt_storage = storages.create("gdzz_test_jbzt");
// 首次运行先把它状态设置为false
zx_jbzt_storage.put("执行脚本状态", false);


// 相当于脚本退出前要处理的事情 强制关闭好像这个没啥效果！
// var xfc_storage = storages.create("xfxf.a.悬浮窗配置文件"); 
// events.on("exit", function(){
//     xfc_storage.put("xfc_open", false);
// });

//悬浮窗logo
importClass(java.lang.Runnable);
importClass(android.animation.ObjectAnimator)
importClass(android.animation.PropertyValuesHolder)
importClass(android.animation.ValueAnimator)
importClass(android.animation.AnimatorSet)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.TranslateAnimation)
importClass(android.animation.ObjectAnimator)
importClass(android.animation.TimeInterpolator)
importClass(android.os.Bundle)
importClass(android.view.View)
importClass(android.view.Window)

importClass(android.view.animation.AccelerateDecelerateInterpolator)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.AnticipateInterpolator)
importClass(android.view.animation.AnticipateOvershootInterpolator)
importClass(android.view.animation.BounceInterpolator)
importClass(android.view.animation.CycleInterpolator)
importClass(android.view.animation.DecelerateInterpolator)
importClass(android.view.animation.LinearInterpolator)
importClass(android.view.animation.OvershootInterpolator)
importClass(android.view.animation.PathInterpolator)
importClass(android.widget.Button)
importClass(android.widget.ImageView)
importClass(android.widget.TextView)
var logo_switch = false;//全局: 悬浮窗的开启关闭检测
var logo_buys = false;//全局: 开启和关闭时占用状态 防止多次点击触发
var logo_fx = true//全局: 悬浮按钮所在的方向 真左 假右
var time_0, time_1, time_3//全局: 定时器 点击退出悬浮窗时定时器关闭
//可修改参数
var logo_ms = 200//全局:  动画播放时间
var DHK_ms = 200//全局:  对话框动画播放时间
var tint_color = "#00000"//全局:  对话框图片颜色


/**
 * 需要三个悬浮窗一起协作达到Auto.js悬浮窗效果
 * win  子菜单悬浮窗 处理子菜单选项点击事件
 * win_1  主悬浮按钮 
 * win_2  悬浮按钮动画替身,只有在手指移动主按钮的时候才会被触发 
 * 触发时,替身Y值会跟主按钮Y值绑定一起,手指弹起时代替主按钮显示跳动的小球动画
 */
var win = floaty.rawWindow(
    <frame >//子菜单悬浮窗
        <frame id="id_logo" w="150" h="210" alpha="0"  >
            <frame id="id_0" w="44" h="44" margin="33 0 0 0" alpha="1">
                <img w="44" h="44" src="#009687" circle="true" />
                <img w="28" h="28" src="@drawable/ic_perm_identity_black_48dp" tint="#ffffff" gravity="center" layout_gravity="center" />
                <img id="id_0_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
            </frame>
            <frame id="id_1" w="44" h="44" margin="86 28 0 0" alpha="1">
                <img w="44" h="44" src="#ee534f" circle="true" />
                <img w="28" h="28" src="@drawable/ic_assignment_black_48dp" tint="#ffffff" gravity="center" layout_gravity="center" />
                <img id="id_1_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
            </frame>
            <frame id="id_2" w="44" h="44" margin="0 83 0 0" alpha="1" gravity="right" layout_gravity="right">
                <img w="44" h="44" src="#40a5f3" circle="true" />
                <img w="28" h="28" src="@drawable/ic_play_arrow_black_48dp" tint="#ffffff" margin="8" />
                <img id="id_2_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
            </frame>
            <frame id="id_3" w="44" h="44" margin="86 0 0 28" alpha="1" gravity="bottom" layout_gravity="bottom">
                <img w="44" h="44" src="#fbd834" circle="true" />
                <img w="28" h="28" src="@drawable/ic_clear_black_48dp" tint="#ffffff" margin="8" />
                <img id="id_3_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
            </frame>
            <frame id="id_4" w="44" h="44" margin="33 0 0 0" alpha="1" gravity="bottom" layout_gravity="bottom">
                <img w="44" h="44" src="#bfc1c0" circle="true" />
                <img w="28" h="28" src="@drawable/ic_settings_black_48dp" tint="#ffffff" margin="8" />
                <img id="id_4_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
            </frame>
        </frame>
        <frame id="logo" w="44" h="44" marginTop="83" alpha="1" />
        <frame id="logo_1" w="44" h="44" margin="0 83 22 0" alpha="1" layout_gravity="right" />
    </frame>
)
win.setTouchable(false);//设置子菜单不接收触摸消息

var win_1 = floaty.rawWindow(
    <frame id="logo" w="44" h="44" alpha="0.8" >//悬浮按钮
        <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
        <img id="img_logo" w="32" h="32" src="https://p.pstatp.com/origin/1373900023544dc920aa0" gravity="center" layout_gravity="center" />
        <img id="logo_click" w="*" h="*" src="#ffffff" alpha="0" />
    </frame>
)
win_1.setPosition(-30, device.height / 2)//悬浮按钮定位

var win_2 = floaty.rawWindow(
    <frame id="logo" w="{{device.width}}px" h="44" alpha="0" >//悬浮按钮 弹性替身
        <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
        <img id="img_logo" w="32" h="32" src="https://p.pstatp.com/origin/1373900023544dc920aa0" margin="6 6" />
    </frame>
)
win_2.setTouchable(false);//设置弹性替身不接收触摸消息

/**
 * 脚本广播事件
 */
var XY = [], XY1 = [], TT = [], TT1 = [], img_dp = {}, dpZ = 0, logo_right = 0, dpB = 0, dp_H = 0
events.broadcast.on("定时器关闭", function (X) { clearInterval(X) })
events.broadcast.on("悬浮开关", function (X) {
    ui.run(function () {
        switch (X) {
            case true:
                win.id_logo.setVisibility(0)
                win.setTouchable(true);
                logo_switch = true
                break;
            case false:
                win.id_logo.setVisibility(4)
                win.setTouchable(false);
                logo_switch = false
        }
    })

});

events.broadcast.on("悬浮显示", function (X1) {
    ui.run(function () {
        win_2.logo.attr("alpha", "0");
        win_1.logo.attr("alpha", "0.9");
    })
});

/**
 * 等待悬浮窗初始化
 */
var terid = setInterval(() => {
    // log("13")
    if (TT.length == 0 && win.logo.getY() > 0) {// 不知道界面初始化的事件  只能放到这里将就下了
        ui.run(function () {
            TT = [win.logo.getX(), win.logo.getY()], TT1 = [win.logo_1.getLeft(), win.logo_1.getTop()], anX = [], anY = []// 获取logo 绝对坐标
            XY = [
                [win.id_0, TT[0] - win.id_0.getX(), TT[1] - win.id_0.getY()],//  获取子菜单 视图和子菜单与logo绝对坐标差值
                [win.id_1, TT[0] - win.id_1.getX(), TT[1] - win.id_1.getY()],
                [win.id_2, TT[0] - win.id_2.getX(), 0],
                [win.id_3, TT[0] - win.id_3.getX(), TT[1] - win.id_3.getY()],
                [win.id_4, TT[0] - win.id_4.getX(), TT[1] - win.id_4.getY()]]
            // log("上下Y值差值:" + XY[0][2] + "DP值:" + (XY[0][2] / 83))
            dpZ = XY[0][2] / 83
            dpB = dpZ * 22
            XY1 = [
                [parseInt(dpZ * 41), TT1[0] - win.id_0.getLeft(), TT1[1] - win.id_0.getTop()],
                [parseInt(dpZ * -65), TT1[0] - win.id_1.getLeft(), TT1[1] - win.id_1.getTop()],
                [parseInt(dpZ * -106), TT1[0] - win.id_2.getLeft(), TT1[1] - win.id_2.getTop()],
                [parseInt(dpZ * -65), TT1[0] - win.id_3.getLeft(), TT1[1] - win.id_3.getTop()],
                [parseInt(dpZ * 41), TT1[0] - win.id_4.getLeft(), TT1[1] - win.id_4.getTop()]]
            img_dp.h_b = XY[0][2]//两个悬浮窗Y差值
            img_dp.w = parseInt(dpZ * 9)//计算logo左边隐藏时 X值
            img_dp.ww = parseInt(dpZ * (44 - 9))//计算logo右边隐藏时 X值
            logo_right = win.id_2.getX() - parseInt(dpZ * 22)
            win_1.setPosition(0 - img_dp.w, device.height / 2)
            win.id_logo.setVisibility(4)
            win.id_logo.attr("alpha", "1")
            events.broadcast.emit("定时器关闭", terid)
        })
    }
}, 100)

time_0 = setInterval(() => {
    //log("11")
}, 1000)

/**
 * 子菜单点击事件
 */
function img_down() {
    win_1.logo.attr("alpha", "0.8")
    logo_switch = false
    动画()
}
win.id_0_click.on("click", () => {
    toastLog("个人中心")
    img_down()
})

win.id_1_click.on("click", () => {
    xzrw();
    img_down()
})

win.id_2_click.on("click", () => {
    qdjb();
    img_down()
})

win.id_3_click.on("click", () => {
    // 这里放置结束功能执行的脚本内容
    jsjb();
    img_down()
})

win.id_4_click.on("click", () => {
    设置();
    img_down();
})


// 悬浮窗按钮功能 选择任务
var win_sj, Pack = "", Acti = "", XC_SJ, logo_switch_1 = true
function xzrw() {
    XC_SJ = threads.start(function () {
        logo_switch_1 = true
        win_sj = floaty.rawWindow(
            <frame w="{{device.width}}px" h="{{device.height}}px" >//模拟对话框_设置
                <frame id="off" bg="#000000" alpha="0" />
                <frame id="主控件" w="{{device.width-160}}px" h="auto" alpha="0" layout_gravity="center" >
                    <card w="*" h="*" cardCornerRadius="15dp" cardBackgroundColor="#ffffff"
                        cardElevation="30dp" foreground="?selectableItemBackground">
                        <vertical w="*" h="auto">
                            <text margin="20 20 20 10" text="选择任务，然后点击保存配置！" textSize="16sp" textStyle="bold" textColor="#000000" />
                            <scroll w="*" h="auto" marginBottom="10">
                                <vertical w="*" h="auto" paddingRight="20" paddingLeft="20">
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb1" text="01.打造熔炼" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb2" text="02.炼制药水" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb3" text="03.探索操作" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb4" text="04.家园操作" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb5" text="05.快速战斗" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb6" text="06.商店购买" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb7" text="07.每日副本" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb8" text="08.蜡像任务" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb9" text="09.世界大怪" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb10" text="10.无尽炼狱" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb11" text="11.远征迷宫" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb12" text="12.费伦酒馆" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb13" text="13.恶魔巢穴" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb14" text="14.冒险小队" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb15" text="15.购买天赋" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb16" text="16.提取羁绊" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb17" text="17.每日奖励" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb18" text="18.领取邮箱" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <horizontal w="*" h="auto">
                                        <frame layout_weight="1">
                                            <checkbox id="cb19" text="19.个人竞技" w="*" h="30" />
                                        </frame>
                                        <frame layout_weight="1">
                                            <checkbox id="cb20" text="20.待开放啦" w="*" h="30" />
                                        </frame>
                                    </horizontal>
                                    <vertical w="*" h="auto" marginTop="10">
                                        <horizontal w="*" h="auto">
                                            <frame w="80">
                                                <button id="qbxz" text="全选" w="80" h="50" textColor="#000000" textSize="16sp" typeface="normal" />
                                            </frame>
                                            <frame w="*">
                                                <button id="bcpz" text="保存配置" w="*" h="50" textColor="#000000" textSize="16sp" typeface="normal" />
                                            </frame>
                                        </horizontal>
                                        <frame layout_weight="1">
                                            <text id="bcts" margin="10 5" text="选择好后记得点击保存哦！" textSize="10sp" textStyle="bold" textColor="red" />
                                        </frame>
                                    </vertical>
                                </vertical>
                            </scroll>
                        </vertical>
                    </card>
                </frame>
            </frame>
        );
        toastLog("选择任务后点击保存配置！")
        time_3 = setInterval(() => {
            if (logo_switch_1 && win_sj.主控件.getY() > 0) {
                logo_switch_1 = false
                对话框动画(true, win_sj.off, win_sj.主控件)
                events.broadcast.emit("定时器关闭", time_3)
            }
        }, 100)
        // 读取已经保存的数组并自动勾选
        var yijingxuanze = bcpz_rw_storage.get("任务数组");
        log("已经选择"+yijingxuanze);
        threads.start(function(){
            log("不为空");
            for(var i=0;i<yijingxuanze.length;i++){
                // eval("ui.cb"+yijingxuanze[i]).checked = true;
                if(yijingxuanze[i] == 1){
                    win_sj.cb1.checked=true;
                }
                if(yijingxuanze[i] == 2){
                    win_sj.cb2.checked=true;
                }
                if(yijingxuanze[i] == 3){
                    win_sj.cb3.checked=true;
                }
                if(yijingxuanze[i] == 4){
                    win_sj.cb4.checked=true;
                }
                if(yijingxuanze[i] == 5){
                    win_sj.cb5.checked=true;
                }
                if(yijingxuanze[i] == 6){
                    win_sj.cb6.checked=true;
                }
                if(yijingxuanze[i] == 7){
                    win_sj.cb7.checked=true;
                }
                if(yijingxuanze[i] == 8){
                    win_sj.cb8.checked=true;
                }
                if(yijingxuanze[i] == 9){
                    win_sj.cb9.checked=true;
                }
                if(yijingxuanze[i] == 10){
                    win_sj.cb10.checked=true;
                }
                if(yijingxuanze[i] == 11){
                    win_sj.cb11.checked=true;
                }
                if(yijingxuanze[i] == 12){
                    win_sj.cb12.checked=true;
                }
                if(yijingxuanze[i] == 13){
                    win_sj.cb13.checked=true;
                }
                if(yijingxuanze[i] == 14){
                    win_sj.cb14.checked=true;
                }
                if(yijingxuanze[i] == 15){
                    win_sj.cb15.checked=true;
                }
                if(yijingxuanze[i] == 16){
                    win_sj.cb16.checked=true;
                }
                if(yijingxuanze[i] == 17){
                    win_sj.cb17.checked=true;
                }
                if(yijingxuanze[i] == 18){
                    win_sj.cb18.checked=true;
                }
                if(yijingxuanze[i] == 19){
                    win_sj.cb19.checked=true;
                }
            }
        });

        // 如果任务数组为全部任务，全选按钮的名称改成反选
        if(yijingxuanze.length == 19){
            win_sj.qbxz.setText("反选");
        }

        win_sj.qbxz.on("click", () => {
            qbxz();
        })
        win_sj.bcpz.on("click", () => {
            bcpz();
        })
        win_sj.off.on("click", () => {
            win_sj_off(false);
        })
        function win_sj_off(E) {
            对话框动画(false, win_sj.off, win_sj.主控件)
            threads.start(function () {
                sleep(DHK_ms)
                win_sj.close()
                clearInterval(time_1)
                XC_SJ.interrupt()
                if (E) {
                    win.close()
                    win_1.close()
                    win_2.close()
                    events.broadcast.emit("定时器关闭", time_0)
                    exit()
                }
                return
            })
        }
        time_1 = setInterval(() => {
            // log("设置")
        }, 1000)
    })
}


// 启动脚本
// 创建一个新的脚本对象变量，用来停止该脚本
var zx_jbdx
// 创建执行脚本的启动状态变量
var zx_jbzt = zx_jbzt_storage.get("执行脚本状态")
function qdjb() {
    if (zx_jbzt) {
        toastLog("脚本已经在运行");
    } else {
        zx_jbzt_storage.put("执行脚本状态", true);
        zx_jbdx = engines.execScriptFile("./zx.js");
        log("启动脚本");
        toast("启动脚本");
    }
}
// 结束脚本
function jsjb() {
    log("zx_jbdx"+zx_jbdx);
    if(zx_jbdx != undefined){
        zx_jbdx.getEngine().forceStop();
        zx_jbzt_storage.put("执行脚本状态", false);
        log("结束zx脚本");
    }
}

// 保存配置
var bcpz_rwsz = [];
function bcpz() {
    var sjsz = random(1, 4);
    if(sjsz == 1){
        win_sj.bcts.setText("保存成功！在战斗页面悬浮窗启动按钮吧！")
    }
    if(sjsz == 2){
        win_sj.bcts.setText("保存成功！！在战斗页面悬浮窗启动按钮吧！")
    }
    if(sjsz == 3){
        win_sj.bcts.setText("保存成功！！！在战斗页面悬浮窗启动按钮吧！")
    }
    if(sjsz == 4){
        win_sj.bcts.setText("保存成功！！！！在战斗页面悬浮窗启动按钮吧！")
    }
    
    bcpz_rwsz = [];
    if (win_sj.cb1.checked == true) {
        bcpz_rwsz.push(1);
    }
    if (win_sj.cb2.checked == true) {
        bcpz_rwsz.push(2);
    }
    if (win_sj.cb3.checked == true) {
        bcpz_rwsz.push(3);
    }
    if (win_sj.cb4.checked == true) {
        bcpz_rwsz.push(4);
    }
    if (win_sj.cb5.checked == true) {
        bcpz_rwsz.push(5);
    }
    if (win_sj.cb6.checked == true) {
        bcpz_rwsz.push(6);
    }
    if (win_sj.cb7.checked == true) {
        bcpz_rwsz.push(7);
    }
    if (win_sj.cb8.checked == true) {
        bcpz_rwsz.push(8);
    }
    if (win_sj.cb9.checked == true) {
        bcpz_rwsz.push(9);
    }
    if (win_sj.cb10.checked == true) {
        bcpz_rwsz.push(10);
    }
    if (win_sj.cb11.checked == true) {
        bcpz_rwsz.push(11);
    }
    if (win_sj.cb12.checked == true) {
        bcpz_rwsz.push(12);
    }
    if (win_sj.cb13.checked == true) {
        bcpz_rwsz.push(13);
    }
    if (win_sj.cb14.checked == true) {
        bcpz_rwsz.push(14);
    }
    if (win_sj.cb15.checked == true) {
        bcpz_rwsz.push(15);
    }
    if (win_sj.cb16.checked == true) {
        bcpz_rwsz.push(16);
    }
    if (win_sj.cb17.checked == true) {
        bcpz_rwsz.push(17);
    }
    if (win_sj.cb18.checked == true) {
        bcpz_rwsz.push(18);
    }
    if (win_sj.cb19.checked == true) {
        bcpz_rwsz.push(19);
    }
    bcpz_rw_storage.put("任务数组", bcpz_rwsz);
    log(bcpz_rw_storage.get("任务数组"))
}

// 全部选择
function qbxz() {
    if (win_sj.qbxz.text() == "全选") {
        win_sj.cb1.checked = true
        win_sj.cb2.checked = true
        win_sj.cb3.checked = true
        win_sj.cb4.checked = true
        win_sj.cb5.checked = true
        win_sj.cb6.checked = true
        win_sj.cb7.checked = true
        win_sj.cb8.checked = true
        win_sj.cb9.checked = true
        win_sj.cb10.checked = true
        win_sj.cb11.checked = true
        win_sj.cb12.checked = true
        win_sj.cb13.checked = true
        win_sj.cb14.checked = true
        win_sj.cb15.checked = true
        win_sj.cb16.checked = true
        win_sj.cb17.checked = true
        win_sj.cb18.checked = true
        win_sj.cb19.checked = true
        win_sj.qbxz.setText("取消")
    } else {
        win_sj.cb1.checked = false
        win_sj.cb2.checked = false
        win_sj.cb3.checked = false
        win_sj.cb4.checked = false
        win_sj.cb5.checked = false
        win_sj.cb6.checked = false
        win_sj.cb7.checked = false
        win_sj.cb8.checked = false
        win_sj.cb9.checked = false
        win_sj.cb10.checked = false
        win_sj.cb11.checked = false
        win_sj.cb12.checked = false
        win_sj.cb13.checked = false
        win_sj.cb14.checked = false
        win_sj.cb15.checked = false
        win_sj.cb16.checked = false
        win_sj.cb17.checked = false
        win_sj.cb18.checked = false
        win_sj.cb19.checked = false
        win_sj.qbxz.setText("全选")
    }

}






































var win_sj, Pack = "", Acti = "", XC_SJ, logo_switch_1 = true
function 设置() {
    XC_SJ = threads.start(function () {
        logo_switch_1 = true
        win_sj = floaty.rawWindow(
            <frame w="{{device.width}}px" h="{{device.height}}px" >//模拟对话框_设置
                <frame id="off" bg="#000000" alpha="0" />
                <frame id="主控件" w="{{device.width-160}}px" h="auto" alpha="0" layout_gravity="center" >
                    <card w="*" h="*" cardCornerRadius="15dp" cardBackgroundColor="#ffffff"
                        cardElevation="30dp" foreground="?selectableItemBackground">
                        <vertical w="*" h="auto">
                            <text margin="20 20 20 0" text="设置" textSize="24sp" textStyle="bold" textColor="#000000" />
                            <scroll w="*" h="auto" marginBottom="10">
                                <vertical w="*" h="auto">
                                    <frame w="*">
                                        <frame marginLeft="20" w="auto">
                                            <img gravity="center|center_vertical" layout_gravity="center" w="26" h="26" src="@drawable/ic_exit_to_app_black_48dp" tint="#000000" />
                                        </frame>
                                        <button id="彻底退出" text="彻底退出" paddingLeft="60" gravity="left|center_vertical" layout_gravity="center" w="*" h="60" style="Widget.AppCompat.Button.Borderless" textColor="#000000" textSize="16sp" typeface="normal" />
                                    </frame>
                                </vertical>
                            </scroll>
                        </vertical>
                    </card>
                </frame>
            </frame>
        )
        time_3 = setInterval(() => {
            if (logo_switch_1 && win_sj.主控件.getY() > 0) {
                logo_switch_1 = false
                对话框动画(true, win_sj.off, win_sj.主控件)
                events.broadcast.emit("定时器关闭", time_3)
            }
            // log("设置0")
        }, 100)
        win_sj.彻底退出.on("click", () => {
            //定时器关闭
            win_sj_off(true)
            // 彻底退出全部脚本
            engines.stopAll()
        })
        win_sj.off.on("click", () => {
            win_sj_off(false)
        })
        function win_sj_off(E) {
            对话框动画(false, win_sj.off, win_sj.主控件)
            threads.start(function () {
                sleep(DHK_ms)
                win_sj.close()
                clearInterval(time_1)
                XC_SJ.interrupt()
                if (E) {
                    win.close()
                    win_1.close()
                    win_2.close()
                    events.broadcast.emit("定时器关闭", time_0)
                    exit()
                }
                return
            })
        }
        time_1 = setInterval(() => {
            // log("设置")
        }, 1000)
    })
}


/*补间动画*/
function 动画() {
    var anX = [], anY = [], slX = [], slY = []
    if (logo_switch) {
        if (logo_fx) {
            for (let i = 0; i < XY.length; i++) {
                anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", parseInt(XY[i][1]), 0);
                anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", parseInt(XY[i][2]), 0);
                slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 0, 1)
                slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 0, 1)
            }
        } else {
            for (let i = 0; i < XY.length; i++) {
                anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", XY1[i][1], XY1[i][0]);
                anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", XY1[i][2], 0);
                slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 0, 1)
                slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 0, 1)
            }
        }
    } else {
        if (logo_fx) {
            for (let i = 0; i < XY.length; i++) {
                anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", 0, parseInt(XY[i][1]));
                anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", 0, parseInt(XY[i][2]));
                slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 1, 0)
                slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 1, 0)
            }
        } else {
            for (let i = 0; i < XY.length; i++) {
                anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", XY1[i][0], XY1[i][1]);
                anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", 0, XY1[i][2]);
                slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 1, 0)
                slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 1, 0)
            }
        }
    }
    set = new AnimatorSet();
    set.playTogether(
        anX[0], anX[1], anX[2], anX[3], anX[4],
        anY[0], anY[1], anY[2], anY[3], anY[4],
        slX[0], slX[1], slX[2], slX[3], slX[4],
        slY[0], slY[1], slY[2], slY[3], slY[4]);
    set.setDuration(logo_ms);
    threads.start(function () {//动画的结束事件一直没有明白 只能拿线程代替了
        logo_buys = true
        if (logo_switch) {
            //log("开启")
            events.broadcast.emit("悬浮开关", true)
            sleep(logo_ms)
        } else {
            //log("关闭")
            sleep(logo_ms + 100)
            events.broadcast.emit("悬浮开关", false)
        }
        logo_buys = false
    });
    set.start();
}
function 对话框动画(X, Y, Z) {//X布尔值 标识显示还是隐藏 Y背景的视图 Z对话框的视图
    var anX = [], anY = [], slX = [], slY = []
    if (X) {
        anX = ObjectAnimator.ofFloat(Z, "translationX", win_1.getX() - (Z.getRight() / 2) + dpB - Z.getLeft(), 0);
        anY = ObjectAnimator.ofFloat(Z, "translationY", win_1.getY() - (Z.getBottom() / 2) + img_dp.h_b - Z.getTop(), 0);
        slX = ObjectAnimator.ofFloat(Z, "scaleX", 0, 1)
        slY = ObjectAnimator.ofFloat(Z, "scaleY", 0, 1)
        animator = ObjectAnimator.ofFloat(Y, "alpha", 0, 0.5)
        animator1 = ObjectAnimator.ofFloat(Z, "alpha", 1, 1)
    } else {
        anX = ObjectAnimator.ofFloat(Z, "translationX", 0, win_1.getX() - (Z.getRight() / 2) + dpB - Z.getLeft());
        anY = ObjectAnimator.ofFloat(Z, "translationY", 0, win_1.getY() - (Z.getBottom() / 2) + img_dp.h_b - Z.getTop());
        slX = ObjectAnimator.ofFloat(Z, "scaleX", 1, 0)
        slY = ObjectAnimator.ofFloat(Z, "scaleY", 1, 0)
        animator = ObjectAnimator.ofFloat(Y, "alpha", 0.5, 0)
        animator1 = ObjectAnimator.ofFloat(Z, "alpha", 1, 0)
    }
    set = new AnimatorSet()
    set.playTogether(
        anX, anY, slX, slY, animator, animator1);
    set.setDuration(DHK_ms);
    set.start();
}

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY; G_Y = 0
//记录按键被按下的时间以便判断长按等动作
var downTime; yd = false;
win_1.logo.setOnTouchListener(function (view, event) {
    if (logo_buys) { return }
    // log(event.getAction())
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = win_1.getX();
            windowY = win_1.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            if (logo_switch) { return true; }
            if (!yd) {//如果移动的距离大于h值 则判断为移动 yd为真
                if (Math.abs(event.getRawY() - y) > 30 || Math.abs(event.getRawX() - x) > 30) { win_1.logo.attr("alpha", "1"); yd = true }
            } else {//移动手指时调整两个悬浮窗位置
                win_1.setPosition(windowX + (event.getRawX() - x),//悬浮按钮定位
                    windowY + (event.getRawY() - y));
                win_2.setPosition(0, windowY + (event.getRawY() - y));//弹性 替身定位(隐藏看不到的,松开手指才会出现)
            }
            return true;
        case event.ACTION_UP:                //手指弹起
            //触摸时间小于 200毫秒 并且移动距离小于30 则判断为 点击
            if (logo_buys) { return }//如果在动画正在播放中则退出事件 无操作
            if (Math.abs(event.getRawY() - y) < 30 && Math.abs(event.getRawX() - x) < 30) {
                //toastLog("点击弹起")
                if (logo_switch) {
                    logo_switch = false
                    win_1.logo.attr("alpha", "0.8")
                } else if (logo_fx) {
                    log("左边")
                    win.setPosition(windowX + (event.getRawX() - x),
                        windowY + (event.getRawY() - y) - img_dp.h_b);
                    win.id_logo.setVisibility(0)
                    logo_switch = true
                    win_1.logo.attr("alpha", "0.9")
                } else {
                    win.setPosition(win_1.getX() + (event.getRawX() - x) - logo_right,
                        win_1.getY() + (event.getRawY() - y) - img_dp.h_b);
                    win.id_logo.setVisibility(0)
                    logo_switch = true
                    win_1.logo.attr("alpha", "0.9")
                }
                动画()
            } else if (!logo_switch) {
                //toastLog("移动弹起")
                G_Y = windowY + (event.getRawY() - y)
                win_1.logo.attr("alpha", "0.8")

                if (windowX + (event.getRawX() - x) < device.width / 2) {
                    //toastLog("左边")
                    logo_fx = true
                    animator = ObjectAnimator.ofFloat(win_2.logo, "translationX", windowX + (event.getRawX() - x), 0 - img_dp.w);
                    mTimeInterpolator = new BounceInterpolator();
                    animator.setInterpolator(mTimeInterpolator);
                    animator.setDuration(300);
                    win_2.logo.attr("alpha", "0.4")//动画 替身上场
                    win_1.logo.attr("alpha", "0");//悬浮按钮隐藏
                    win_1.setPosition(0 - img_dp.w, G_Y)//悬浮按钮移动到终点位置等待替身动画结束
                    animator.start();
                } else {
                    //toastLog("右边")
                    logo_fx = false
                    animator = ObjectAnimator.ofFloat(win_2.logo, "translationX", windowX + (event.getRawX() - x), device.width - img_dp.ww);
                    mTimeInterpolator = new BounceInterpolator();
                    animator.setInterpolator(mTimeInterpolator);
                    animator.setDuration(300);
                    win_2.logo.attr("alpha", "0.4")//动画替身上场
                    win_1.logo.attr("alpha", "0");//悬浮按钮隐藏
                    win_1.setPosition(device.width - img_dp.ww, G_Y)//悬浮按钮移动到终点位置等待替身动画结束
                    animator.start();
                }
                threads.start(function () {//动画的结束事件一直没有明白 只能拿线程代替了
                    logo_buys = true
                    sleep(logo_ms + 100)
                    events.broadcast.emit("悬浮显示", 0)

                    logo_buys = false
                });
            }
            yd = false
            return true;
    }
    return true;
});

