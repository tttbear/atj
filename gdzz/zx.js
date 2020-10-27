// 执行任务脚本

// 任务数组的配置文件
var bcpz_rw_storage = storages.create("gdzz_test_bcpz_rw"); //任务数组 []
var rw_arr = bcpz_rw_storage.get("任务数组");
log(rw_arr);
// 保存脚本运行状态的配置文件
var zx_jbzt_storage = storages.create("gdzz_test_jbzt"); // 执行脚本状态 true/false
//请求截图
if (!requestScreenCapture()) {
    toast("请求截图失败！\n\n下次请允许并选择'总是允许/不再提示'");
    rw_exit();
}

if(rw_arr.length > 0){
    // 00. 判断是否在战斗页面
    if (rw_0() == false) {
        toast("请打开游戏，在'战斗'页面运行脚本！");
        rw_exit();
    }
    // // 调试用
    // rw_19();
    // 读取任务数组计次循环执行任务
    for (var i = 0; i < rw_arr.length; i++) {
        // log("正在执行任务：" + rw_arr[i]);
        this["rw_" + rw_arr[i]]();

        // 如果是快速战斗，那就多进行一次炼制药水
        if(rw_arr[i] == 5){
            sleep(1000);
            rw_2();
        }
    }
}else{
    toast("请先选择并保存配置，再启动。")
}




//------------------------------------------------------------------------任务功能
// 00. 判断是否在战斗页面
function rw_0() {
    if (rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_00_01_zhandou.png") != null) {
        return (true);
    }
    return (false);
}
// 01. 打造熔炼
function rw_1() {
    // 打开打造页面
    sleep(1000);
    click(650, 1240);
    // 判断是否成功打开
    // 点击鉴定
    sleep(1000);
    click(80, 600);
    // 点击鉴定一个装备
    sleep(1000);
    click(438, 338);
    sleep(1000);
    click(438, 338);
    sleep(500);
    click(438, 338);
    sleep(500);
    click(438, 338);
    // 熔炼装备
    // 判断橙色红色装备是否选中，如果选中的话就取消选中
    // 橙色

    if (rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_01_02_chengse.png") != null) {
        click(358, 674);
    }
    // 红色
    if (rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_01_03_hongse.png") != null) {
        click(415, 674);
    }
    // 点击熔炼
    sleep(500);
    click(570, 670);
    sleep(500);
    click(570, 670);
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(340, 1240);
}
// 02. 炼制操作
function rw_2() {
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_02_01_lianzhitubiao.png", 0, [], 0.7);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 10, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(50, 888, 688, 888, 1000)
        }
        // 点击进入炼制
        sleep(500);
        click(666, 700);
    }
    // 检查是否有炼制完成并点击收获
    sleep(1000);
    for (var i = 0; i < 5; i++) {
        var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_02_02_lianzhiwancheng.png", 0, [], 0.8);
        if (p != null) {
            log("炼制完成" + i + "坐标为" + p.x + "x" + p.y - 40);
            click(p.x, p.y - 40);
            sleep(1000);
        }
        sleep(300);
    }
    // 开启新的炼制 五个都点击一次
    sleep(500);
    click(560, 888);
    sleep(500);
    click(160, 888);
    sleep(500);
    click(260, 888);
    sleep(500);
    click(360, 888);
    sleep(500);
    click(460, 888);
    // 返回战斗页面
    // 判断有没有关闭按钮，有的话就×掉
    rw_gban();
    sleep(1000);
    click(340, 1240);
}
// 03. 探索操作
function rw_3() {
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_03_01_tansuotubiao.png", 0, [], 0.7);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 10, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(50, 888, 688, 888, 1000)
        }
        // 点击进入探索
        sleep(500);
        click(483, 1125);
    }
    // 滑动到顶部
    sleep(1000);
    swipe(380, 900, 380, 300, 500)
    // 判断是否可以收获
    sleep(300);
    for (var i = 0; i < 4; i++) {
        var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_03_02_shouhuo.png", 0, [], 0.8);
        log("探索收获" + i );
        if (p != null) {
            click(p.x - 10, p.y + 34);
            sleep(1500);
            click(p.x - 100, p.y + 34);
            sleep(1500);
            click(p.x - 10, p.y + 34);
            sleep(1500);
        }
        sleep(300);
    }
    // 返回战斗页面
    // 判断有没有关闭按钮，有的话就×掉
    rw_gban();
    sleep(1000);
    click(340, 1240);
}
// 04. 家园操作 还需要判断是否能领取再点击
function rw_4(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_04_01_jiayuantubiao.png", 0, [], 0.7);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(50, 888, 688, 888, 1000)
        }
        // 点击进入家园
        sleep(500);
        click(650, 970);
    }
    // 【宠物】
    // 弹出奖励
    sleep(1500);
    click(630, 150);
    // 领取奖励
    sleep(1500);
    click(630, 150);
    // 喂养
    sleep(1000);
    click(360, 970);
    // 退出喂养
    sleep(1000);
    click(670, 240);
    // 【房间】
    sleep(1000);
    click(368, 295);
    // 房间收获 两次点击
    rw_qran();
    // 如果是没有奖励的时候，点击房间就进入房间了，这时候要退出
    sleep(1000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_04_04_out.png", 0, [], 0.8);
    if (p != null) {
        log("进入房间了正在退出：" + p);
        click(p.x + 20, p.y + 10);
    }
    // 【非酋】
    sleep(1000);
    click(130, 470);
    // 召唤
    sleep(1000);
    click(360, 1120);
    // 点击 多按几次直接进入非酋
    for(var i=0;i<10;i++){
        sleep(600);
        click(130, 470);
    }
    // 退出非酋
    sleep(1000);
    click(666, 90);
    // 【花园】
    sleep(1000);
    swipe(688, 888, 166, 888, 1000)
    // 收获
    sleep(1000);
    click(366, 460);
    // 收获点击确认两次
    rw_qran();
    // 种植
    sleep(1000);
    click(366, 460);
    // 一键选种
    sleep(1000);
    click(240, 1127);
    // 一键种植
    sleep(3000);
    click(360, 1127);
    rw_qran();
    // 退出种植
    sleep(3000);
    click(680, 150);
    // 退出家园
    sleep(3000);
    click(690, 40);
    // 返回战斗页面
    // 判断有没有关闭按钮，有的话就×掉
    rw_gban();
    sleep(1000);
    click(340, 1240);
}
// 05. 快速战斗
function rw_5(){
    // 点击快速战斗 6次
    for(var i=0;i<6;i++){
        sleep(1000);
        click(634, 530);
        // 确认
        sleep(1000);
        click(454, 738);
        // 确认
        sleep(1000);
        click(500, 250);
    }
    // 判断有没有关闭按钮，有的话就×掉
    rw_gban();
    sleep(1000);
    click(340, 1240);
}
// 06. 商店购买
function rw_6(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_06_01_shangdiantubiao.png", 0, [], 0.8);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(50, 888, 688, 888, 1000)
        }
        // 点击进入商店
        sleep(500);
        click(250, 777);
    }
    // 全部购买
    sleep(1000);
    click(666, 666);
    // 确认
    rw_qran();
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(375, 1248);
}
// 07. 每日副本
function rw_7(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_07_01_meirifubentubiao.png", 0, [], 0.8);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(50, 888, 688, 888, 1000)
        }
        // 点击进入副本
        sleep(500);
        click(230, 988);
    }
    // 点击扫荡
    sleep(1000);
    click(546, 88);
    // 确认两次
    rw_qran();
    // 购买次数
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(370, 1240);
}
// 08. 蜡像任务
function rw_8(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_08_01_laxiangtubiao.png", 0, [], 0.8);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(50, 888, 688, 888, 1000)
        }
        // 点击进入蜡像馆
        sleep(500);
        click(520, 360);
    }
    // 考验
    sleep(1500);
    click(520, 180);
    // 扫荡
    sleep(1500);
    click(240, 270);
    //确认两次
    rw_qran();
    // 奖励
    sleep(1000);
    click(600, 180);
    for(var i=0;i<12;i++){
        sleep(600);
        click(566, 380);
    }
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(370, 1240);
}
// 09. 世界大怪
function rw_9(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_09_01_shijiebosstubiao.png", 0, [], 0.8);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(688, 888, 50, 888, 1000)
        }
        // 点击进入世界大怪
        sleep(500);
        click(130, 180);
    }
    for(var i =0;i<3;i++){
        log("第"+i+"次挑战");
        // 点击挑战
        sleep(1000);
        click(350, 850);
        // 跳过
        sleep(1000);
        for(var j=0;j<15;j++){
            var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_09_02_tiaoguozhandou.png", 0, [], 0.8);
            if (p != null) {
                sleep(500);
                click(350, 660);
                break;
            }
            sleep(1000);
        }
        // 胜利 
        rw_qran();
    }
    // 完成奖励
    sleep(5000);
    click(580, 966);
    //确认一次
    rw_qran();
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(370, 1240);
}
// 10. 无尽炼狱 以下严格检查确认取消按钮
function rw_10(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_10_01_wujintubiao.png", 0, [], 0.8);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(688, 888, 50, 888, 1000)
        }
        // 点击进入无尽炼狱
        sleep(1000);
        click(100, 468);
    }
    // 点击扫荡
    sleep(1000);
    click(590, 210);
    sleep(1000);
    // 确认两次
    rw_qran();
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(370, 1240);
}
// 11. 远征迷宫
function rw_11(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_11_01_yuanzhengtubiao.png", 0, [], 0.8);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(688, 888, 50, 888, 1000)
        }
        // 点击进入远征迷宫
        sleep(500);
        click(430, 550);
    }
    // 点击扫荡
    sleep(1000);
    click(360, 730);
    // 确定两次
    rw_qran();
    // 点击关闭
    sleep(1000);
    click(544, 300);
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(370, 1240);
}
// 12. 费伦酒馆
function rw_12(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_12_01_feiluntubiao.png", 0, [], 0.8);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(688, 888, 50, 888, 1000)
        }
        // 点击进入费伦酒馆
        sleep(500);
        click(280, 760);
    }
    // 免费召唤一次
    sleep(1000);
    click(460, 860);
    // 再点一次弹出奖励
    sleep(1000);
    click(460, 860);
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(370, 1240);
}
// 13. 恶魔巢穴
function rw_13(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_13_01_emotubiao.png", 0, [], 0.8);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(688, 888, 50, 888, 1000)
        }
        // 点击进入恶魔巢穴
        sleep(500);
        click(360, 1060);
    }
    // 点击扫荡
    sleep(1000);
    click(550, 90);
    // 确定两次
    rw_qran();
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(370, 1240);
}
// 14. 冒险小队
function rw_14(){
    log("开始冒险小队");
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_14_01_maoxiantubiao.png", 0, [], 0.85);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标xiaodui" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(688, 888, 50, 888, 1000)
        }
        sleep(300);
        swipe(50, 888, 688, 888, 1000)
        // 点击进入冒险
        sleep(500);
        click(470, 820);
    }
    // 点击悬赏任务
    sleep(1000);
    click(66, 270);
    // 领取 // 不会弹出奖励窗口
    sleep(1000);
    click(620, 280);
    // 选择
    sleep(1000);
    click(420, 280);
    // 开启
    sleep(1000);
    click(520, 280);
    // 关闭
    sleep(1000);
    click(486, 40);
    // 退出小队
    sleep(1000);
    click(486, 40);
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(370, 1240);
}
// 15. 购买天赋4次
function rw_15(){
    // 点击角色
    sleep(1000);
    click(200, 1240);
    // 点击属性
    sleep(1000);
    click(200, 700);
    // 点击天赋
    sleep(1000);
    click(230, 1095);
    // 点击购买
    sleep(1000);
    click(310, 230);
    // 购买4次
    for(var i=0;i<4;i++){
        sleep(1000);
        click(360, 420);
    }
    // 点击返回战斗页面
    rw_gban();
    sleep(1000);
    click(370, 1240);
}
// 16. 提取羁绊
function rw_16(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_16_01_hechengguan.png", 0, [], 0.8);
    if (p != null) {
        log("提前找到坐标：" + p);
        click(p.x + 10, p.y + 10);
    } else {
        log("没有找到任务图标" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(50, 888, 688, 888, 1000)
        }
        // 点击进入合成馆
        sleep(500);
        click(313, 453);
    }
    // 点击获取羁绊
    sleep(1000);
    click(644, 1134);
    // 放入
    sleep(1000);
    click(424, 624);
    // 提取 判断有没有确认按钮
    rw_qran();
    sleep(1000);
    click(558, 624);
    // 返回战斗页面
    // 判断有没有关闭按钮，有的话就×掉
    rw_gban();
    // 点击战斗页面
    sleep(1000);
    click(370, 1240);
}
// 17. 每日奖励 顺便把武器强化任务做了
function rw_17(){
    // // 进入角色
    // sleep(1000);
    // click(200, 1240);
    // // 点击左上角第一个武器
    // sleep(1000);
    // click(126, 888);
    // // 点击强化3次
    // for(var i=0;i<3;i++){
    //     sleep(1000);
    //     click(460, 406);
    // }
    // // 点击空白处
    // sleep(1000);
    // click(70, 1240);
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 点击每日任务奖励
    sleep(1000);
    click(360, 240);
    // 查找领取按钮并点击
    var jqwb = 0
    while(true){
        sleep(1000);
        var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_17_01_lingqu.png", 0, [], 0.9);
        if (p != null) {
            log("找到领取按钮" + p);
            click(p.x + 10, p.y + 10);
        }else{
            //多增加两次判断领取
            jqwb++;
            log("增加检查"+jqwb);
            if(jqwb>2){
                break;
            }
        }
    }
    // 点击上方宝箱
    sleep(1000);
    click(170,320);
    sleep(1000);
    click(170,320);
    sleep(1000);
    click(310,320);
    sleep(1000);
    click(310,320);
    sleep(1000);
    click(460,320);
    sleep(1000);
    click(460,320);
    sleep(1000);
    click(600,320);
    sleep(1000);
    click(600,320);
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(370,1240);
}
// 18. 领取邮箱
function rw_18(){
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 点击邮箱
    sleep(1000);
    click(455, 245);
    // 领取
    sleep(1000);
    click(614, 216);
    // 删除
    sleep(1000);
    click(500, 216);
    // 返回战斗页面
    rw_gban();
    sleep(1000);
    click(340, 1240);
}
// 18. 个人竞技
function rw_19(){
    log("开始个人竞技");
    // 点击主城
    sleep(1000);
    click(70, 1240);
    // 判断是否找到任务图标找到就直接点击，跳过滑动
    sleep(2000);
    var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_19_01_jingjitubiao.png", 0, [], 0.85);
    if (p != null) {
        click(p.x + 20, p.y + 10);
    } else {
        log("没有找到任务图标xiaodui" + p);
        // 延迟几秒等待主城云雾动画结束
        sleep(3000);
        // 将画面滑动到最左边
        for (var i = 0; i < 3; i++) {
            swipe(688, 888, 50, 888, 1000)
        }
        sleep(300);
        swipe(50, 888, 688, 888, 1000)
        // 点击进入个人竞技
        sleep(500);
        click(456, 588);
    }
    // 首次进入可能有提示领取赛季奖励 点击确认
    rw_qran();
    // 查找并挑战
    for(var i=0;i<5;i++){
        sleep(1000);
        var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_19_02_tiaozhan.png", 0, [], 0.85);
        if (p != null) {
            click(p.x + 20, p.y + 10);
            sleep(1000);
            // 跳过
            for(var j=0;j<15;j++){
                var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_09_02_tiaoguozhandou.png", 0, [], 0.8);
                if (p != null) {
                    sleep(500);
                    click(350, 660);
                    break;
                }
                sleep(1500);
            }
        } else{
            break;
        }
        // 战斗结果
        rw_qran();
    }
    // 点击3次挑战奖励
    sleep(1000);
    click(580, 950);
    // 奖励
    rw_qran();
    // 退出
    rw_gban();
    // 返回战斗页面
    sleep(500);
    click(370, 1240);
    sleep(500);
    click(370, 1240);
}





//------------------------------------------------------------------------ 公共功能
// rw_tpjc_type参数非1为普通找图，1为区域找图 
// rw_tpjc_qyzb区域坐标为数组如[400, 500, 300, 200]。400/500是起始点的坐标300是宽200是高
// rw_tpjc_qyfz 图片相识度阀值0-1
// 传入大图(截图)、小图路径 识图返回坐标或者null
function rw_tpjc(rw_tpjc_dt, rw_tpjc_xtlj, rw_tpjc_type, rw_tpjc_qyzb, rw_tpjc_qyfz) {

    var rw_tpjc_xt = images.read(rw_tpjc_xtlj);
    // 判断图片是否存在
    if (!rw_tpjc_xt) {
        toastLog("缺失文件" + rw_tpjc_xtlj);
        exit();
    }

    var rw_tpjc_qyfzls = rw_tpjc_qyfz;
    if (rw_tpjc_qyfzls == undefined) {
        rw_tpjc_qyfzls = 0.95;
    }
    if (rw_tpjc_type == 1) {
        // 区域找图
        var rw_tpjc_result = images.findImage(rw_tpjc_dt, rw_tpjc_xt, { threshold: rw_tpjc_qyfzls, region: rw_tpjc_qyzb });
    } else {
        // 全图找图
        var rw_tpjc_result = images.findImage(rw_tpjc_dt, rw_tpjc_xt, { threshold: rw_tpjc_qyfzls });
    }
    // 删除临时图片数据释放内存
    rw_tpjc_xt.recycle();
    log("任务识图检测结果" + rw_tpjc_result);
    return (rw_tpjc_result);
}

rw_exit();
// 任务执行完毕后要设置配置文件：脚本运行状态为false
function rw_exit() {
    // 退出任务后清空任务数组
    var bcpz_rw_storage = storages.create("gdzz_test_bcpz_rw");
    var aa = [1];
    bcpz_rw_storage.put("任务数组", aa);
    zx_jbzt_storage.put("执行脚本状态", false);
    toastLog("1.0.1任务脚本已经停止！");
    exit();
}
function rw_qran(){
    for(var i=0; i<5; i++){
        sleep(1000);
        var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_00_02_queding.png", 0, [], 0.8);
        if (p != null) {
            log("找到确认按钮：" + p);
            click(p.x + 20, p.y + 20);
        }else{
            break;
        }
    }
}
function rw_gban(){
    for(var i=0; i<5; i++){
        sleep(1000);
        var p = rw_tpjc(captureScreen(), "./res/img/720x1280dpi320/gdzz_00_01_guanbi.png", 0, [], 0.8);
        if (p != null) {
            log("找到关闭按钮：" + p);
            click(p.x + 20, p.y + 20);
        }else{
            break;
        }
    }
}

// 读取任务数组，依次执行

//------------------------------------------------------------------------ 功能调试
// 01. 打造熔炼
// rw_1();
// 02. 炼制操作
// rw_2();
// 03. 探索操作
// rw_3();
// 04. 家园操作
// rw_4();
// 05. 快速战斗
// rw_5();
// 06. 商店购买
// rw_6();
// 07. 每日副本
// rw_7();
// 08. 蜡像任务
// rw_8();
// 09. 世界大怪
// rw_9();
// 10. 无尽炼狱
// rw_10();
// 11. 远征迷宫
// rw_11();
// 12. 费伦酒馆
// rw_12();
// 13. 恶魔巢穴
// rw_13();
// 14. 冒险小队 //不完整
// rw_14();
// 15. 购买天赋4次
// rw_15();
// 16.提取羁绊
// rw_16();
// 17. 每日奖励
// rw_17();
// 18. 领取邮箱
// rw_18();