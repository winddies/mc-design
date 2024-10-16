/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-14 18:18:55
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-14 18:19:11
 * @FilePath: /mc-design/packages/mc-ui/src/constants/event.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  // 权限相关

  // 登录成功
  LOGIN_SUCCESS: "login:success",
  // 获取用户信息
  FETCH_USER_INFO: "login:fetch-user-info",
  //
  // 授权隐私权限
  PRIVACY_AUTH_RESOLVED: "scope:privacy.resolved",
  // 拒绝隐私权限
  PRIVACY_AUTH_REJECT: "scope:privacy.rejected",
  // 获得位置权限
  LOCATION_AUTH_RESOLVED: "scope:userLocation.resolved",
  // 拒绝位置权限
  LOCATION_AUTH_REJECTED: "scope:userLocation.rejected",
  // 获得相机权限
  CAMERA_AUTH_RESOLVED: "scope:camera.resolved",
  // 拒绝相机权限
  CAMERA_AUTH_REJECTED: "scope:camera.rejected",
  // 获得用户信息权限
  PHONE_NUMBER_AUTH_REJECT: "scope:phoneNumber.reject",
  // 获得用户信息权限
  PHONE_NUMBER_AUTH_RESOLVED: "scope:phoneNumber.resolved",

  // 活动相关
  // 码转换失败
  ACTIVITY_CODE_CONVERSION_FAIL: "activity:code-conversion-fail",
  // 加载活动成功
  ACTIVITY_GET_INFO_SUCCESS: "activity:get-info-success",
  // 加载活动失败
  ACTIVITY_GET_INFO_FAIL: "activity:get-info-fail",
  // 抽奖失败
  ACTIVITY_LOTTERY_FAILURE: "activity:lottery-failure",
  // 抽奖成功
  ACTIVITY_LOTTERY_LUCK: "activity:lottery-luck",
  // 抽奖失败
  ACTIVITY_LOTTERY_REGRET: "activity:lottery-regret",
};
