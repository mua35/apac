/* 
 * Application : Global
 * ClassName   : sys_script
 * Created On  : 2019-10-10 06:18:06
 * Created By  : admin
 * Updated On  : 2019-10-10 06:22:34
 * Updated By  : admin
 * URL         : /sys_script.do?sys_id=94ea51131b50c8509614ff37dc4bcbe9
 */
(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	gs.log("Inside the BR");
	new SnDevTools().sys_metadata_Display(current);

})(current, previous);
