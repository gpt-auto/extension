/* ==============================================================================================

          MMMMMMMM               MMMMMMMMBBBBBBBBBBBBBBBBB           GGGGGGGGGGGGG
          M:::::::M             M:::::::MB::::::::::::::::B       GGG::::::::::::G
          M::::::::M           M::::::::MB::::::BBBBBB:::::B    GG:::::::::::::::G
          M:::::::::M         M:::::::::MBB:::::B     B:::::B  G:::::GGGGGGGG::::G
          M::::::::::M       M::::::::::M  B::::B     B:::::B G:::::G       GGGGGG
          M:::::::::::M     M:::::::::::M  B::::B     B:::::BG:::::G              
          M:::::::M::::M   M::::M:::::::M  B::::BBBBBB:::::B G:::::G              
          M::::::M M::::M M::::M M::::::M  B:::::::::::::BB  G:::::G    GGGGGGGGGG
          M::::::M  M::::M::::M  M::::::M  B::::BBBBBB:::::B G:::::G    G::::::::G
          M::::::M   M:::::::M   M::::::M  B::::B     B:::::BG:::::G    GGGGG::::G
          M::::::M    M:::::M    M::::::M  B::::B     B:::::BG:::::G        G::::G
          M::::::M     MMMMM     M::::::M  B::::B     B:::::B G:::::G       G::::G
          M::::::M               M::::::MBB:::::BBBBBB::::::B  G:::::GGGGGGGG::::G
          M::::::M               M::::::MB:::::::::::::::::B    GG:::::::::::::::G
          M::::::M               M::::::MB::::::::::::::::B       GGG::::::GGG:::G
          MMMMMMMM               MMMMMMMMBBBBBBBBBBBBBBBBB           GGGGGG   GGGG
                                                                        
          FEU INSTITUTE OF TECHNOLOGY
          CANVAS BEHAVIOR AND THEME OVERRIDE
          Author: Dr. Manuel B. Garcia
          Author URL: https://manuelgarcia.info
          Author URL: https://designrshub.com
          Author Contact: mbgarcia@feutech.edu.ph
          Version: 2.3
          Since: October 21, 2021;

============================================================================================== */

/* CANVAS SETTINGS
========================================= */
var MBG_PRIORITIZE_NETWORK_MAP = true; // Transfer Network Map link after Home in Course Navigation
var MBG_HIDE_SELECTED_NETWORK_MAP = true; // Hide Network Map link to unfinished courses
var MBG_HIDE_SYLLABUS_SUMMARY = true; // Remove course summary in the syllabus page
var MBG_HIDE_COURSE_NAV_IC = false; // Remove course navigations from Institutional Courses (IC_)
var MBG_IC_MODULES_ONLY = true; // Disabled other pages of IC except module page (IC_)
var MBG_MILES_USER_ROLE_RESTRICTION = true; // Show the MILES App to students Only
var MBG_NETWORK_MAP_BETA = true; // Append "(Beta)" in the Network Map Title


var $MBG_MILES_CREDENTIALS_DESKTOP = $('[aria-label="Courses Navigation Menu"] ul li:contains("MILES Credentials")');
var $MBG_MILES_CREDENTIALS_MOBILE = $('#mobileContextNavContainer span span a:contains("MILES Credentials")').parent().parent();

var $MBG_MILES_LCAR_DESKTOP = $('[aria-label="Courses Navigation Menu"] ul li:contains("MILES LCAR")');
var $MBG_MILES_LCAR_MOBILE = $('#mobileContextNavContainer span span a:contains("MILES LCAR")').parent().parent();

/* NETWORK MAP MENU
========================================= */
if(MBG_PRIORITIZE_NETWORK_MAP == true){
     var $CVS_GLOBAL_MENU = $('[aria-label="Courses Navigation Menu"] ul li:first-child');
     var $MBG_MILES_NETWORK_MAP_DESKTOP = $('[aria-label="Courses Navigation Menu"] ul li:contains("MILES Network Map")');
     var $CVS_MOBILE_MENU = $('#mobileContextNavContainer span span a:contains("Home")').parent().parent();
     var $MBG_MILES_NETWORK_MAP_MOBILE = $('#mobileContextNavContainer span span a:contains("MILES Network Map")').parent().parent();
        
     // DESKTOP
     $CVS_GLOBAL_MENU.after($MBG_MILES_LCAR_DESKTOP);
     $CVS_GLOBAL_MENU.after($MBG_MILES_CREDENTIALS_DESKTOP);
     $CVS_GLOBAL_MENU.after($MBG_MILES_NETWORK_MAP_DESKTOP);

     $MBG_MILES_NETWORK_MAP_DESKTOP.attr("signature", "MBG"); 
     if(MBG_NETWORK_MAP_BETA == true){
          $MBG_MILES_NETWORK_MAP_DESKTOP.find("a").text("Network Map (Beta)");
     }
     
     // MOBILE
     $(".mobile-header-title").on("click touchend", function(){ 
          if( $("#mobileContextNavContainer").children().length )
          setTimeout(function(){ CHECK_MOBILE(); }, 1000);
     });

     function CHECK_MOBILE(){
          var $CVS_MOBILE_MENU = $('#mobileContextNavContainer span span a:contains("Home")').parent().parent();
          var $MBG_MILES_NETWORK_MAP_MOBILE = $('#mobileContextNavContainer span span a:contains("Network Map")').parent().parent();
        
          if( $('#mobileContextNavContainer span span a:contains("Network Map")').length == 1 ){
               $CVS_MOBILE_MENU.after($MBG_MILES_CREDENTIALS_MOBILE);
               $CVS_MOBILE_MENU.after($MBG_MILES_NETWORK_MAP_MOBILE);
               $MBG_MILES_NETWORK_MAP_MOBILE.attr("signature", "MBG");
               if(MBG_NETWORK_MAP_BETA == true){
                    $MBG_MILES_NETWORK_MAP_MOBILE.find("a").children().children().next().text("Network Map (Beta)");
               }
          } else {
               CHECK_MOBILE();
          }
     
     }
 
}

/* SYLLABUS CUSTOMIZATION 
========================================= */
if(MBG_HIDE_SYLLABUS_SUMMARY == true){
     $("#syllabusContainer").prev().hide();
     $("#syllabusContainer").hide();
}

/* GET COURSE DETAILS MANUALLY
========================================= */
var $CANVAS_USERNAME = $(".ic-avatar img").attr("alt");
var $CANVAS_URL = window.location.pathname.split("/");
var $MBG_COURSE_TITLE = $("#crumb_course_" + $CANVAS_URL[2]).text().split("_");
if($MBG_COURSE_TITLE == ""){ $MBG_COURSE_TITLE = $("[href='/courses/" + $CANVAS_URL[2] + "'] span").text().split("_"); }

var $CANVAS_PREFIX = $MBG_COURSE_TITLE[0];
var $CANVAS_LONG_TITLE = $MBG_COURSE_TITLE[1].split("-");
var $CANVAS_COURSE_CODE = $CANVAS_LONG_TITLE[0];

if($CANVAS_COURSE_CODE.indexOf('/') > -1) {
     $CANVAS_COURSE_CODE = $CANVAS_LONG_TITLE[0].split("/");
     $CANVAS_COURSE_CODE = $CANVAS_COURSE_CODE[0];
}


/* HIDDEN NETWORK MAP AND LCAR ON NON-STUDENTS ACCOUNT
========================================= */
if(MBG_MILES_USER_ROLE_RESTRICTION == true){
     var $MBG_MILES_SETTINGS = $('[aria-label="Courses Navigation Menu"] ul li:contains("Settings")');
     
     // REMOVE LINKS FOR TEACHERS
     if($MBG_MILES_SETTINGS.text() == "Settings" && $CANVAS_USERNAME != "Manuel Garcia"){
          $MBG_MILES_NETWORK_MAP_DESKTOP.remove();
          $MBG_MILES_NETWORK_MAP_MOBILE.remove();
     }

     // REMOVE LINKS FOR STUDENTS
     if($MBG_MILES_SETTINGS.text() == ""){
          $MBG_MILES_LCAR_DESKTOP.remove();
          $MBG_MILES_LCAR_MOBILE.remove();
     }
}

/* HIDDEN NETWORK MAP ON COURSES WITHOUT NETWORK MAP
========================================= */
if(MBG_HIDE_SELECTED_NETWORK_MAP == true){
     var HIDDEN_NETWORK_MAP = ["MEMELEMLAB1", "ACDCMACH", "ACDCMACHL", "EEINTC02", "EEINTC2", "CPEINTERN", "CPI129", "INTERNS", "CPEPROGLA1", "EEINFOTECA", "EEINFOTEC", "ITECOMPSYSL", "ITECOMPSYSLA", "ITADELEC1A", "ITADELEC1", "ITADELEC1A", "ICERT001", "ITCERT001", "ITEACCTNG", "BASIACT", "ACCOUNT", "IEA103", "IEA113", "ITEACCTNG", "ITEINTERN1", "CS0041", "INTERN1", "ITEI119", "INTERN2", "ITEI229", "CS0043", "ITEINTERN2", "EPROG", "CE0002L", "ECESEMF", "ECEFTPS", "ECESEMFIELD", "ECS711", "ESEMECE", "MMA0055", "EEINTERN", "EEOJT", "EES337", "EESEMFIELD", "EES712", "ESPLTEE", "CIRCTWO", "CIRCUITS2", "CIRCUITS2A", "ECIRTWO", "EEC203", "NCIRTWO", "COE0031", "CEFT111", "CESEMINARS", "ESEMFIT", "CE0005", "FLUIDSLAB", "FLUIDSLABA", "CE0067", "CEINTERNSHIP", "CEIN136", "MEINTERN", "ME0013", "ME0013L", "THERMO1", "THERMIC", "THE103", "ETHERMO", "METELEC1", "METELEC2", "METELEC3", "METELEC4", "MELAW", "MECORREL01", "MECORREL1", "MECORREL02", "MECORREL2", "MECORREL03", "MECORREL3", "MEB103", "EBAMENG", "MECHENG"];
     var found = HIDDEN_NETWORK_MAP.includes($CANVAS_COURSE_CODE);

     if(found == true){
          $MBG_MILES_NETWORK_MAP_DESKTOP.remove()
          $MBG_MILES_NETWORK_MAP_MOBILE.remove();
     }
}

/* HIDDEN NAVIGATION MENU FOR IC
========================================= */
if(MBG_HIDE_COURSE_NAV_IC == true){
     if($CANVAS_PREFIX == "IC"){
          $("#left-side").remove();
          $("#mobileContextNavContainer").remove();
          $("#courseMenuToggle").remove();
          $("#mobileHeaderArrowIcon").remove();
          $("#main").attr("style", "margin-left: 0px !important");

          if(MBG_IC_MODULES_ONLY == true){
               var $CANVAS_URL = window.location.pathname.split("/");
               if($CANVAS_URL[3] != "modules"){ 
                    var $CANVAS_MODULE = $CANVAS_URL[0] + "/" + $CANVAS_URL[1] + "/" + $CANVAS_URL[2] + "/modules";
                    window.location.replace($CANVAS_MODULE); 
               }
          }
     }

}

/* FULL SCREEN FOR MOBILE VIEWPORT
========================================= */
if( $('[data-tool-id="mbg_miles"]').length == 1 ){
     $("body").attr("style", "overflow: hidden;").append("<div style='display: none'>MILES Network Map is developed by: <a rel='dofollow' target='_blank' href='https://manuelgarcia.info'>Manuel B. Garcia</a> of <a rel='dofollow' target='_blank' href='https://designrshub.com'>Designrshub</a></div>");
     if(window.innerWidth < 768){ $("#content").attr("style", "padding: 0"); }
}


/* ==============================================================================================

          MMMMMMMM               MMMMMMMMBBBBBBBBBBBBBBBBB           GGGGGGGGGGGGG
          M:::::::M             M:::::::MB::::::::::::::::B       GGG::::::::::::G
          M::::::::M           M::::::::MB::::::BBBBBB:::::B    GG:::::::::::::::G
          M:::::::::M         M:::::::::MBB:::::B     B:::::B  G:::::GGGGGGGG::::G
          M::::::::::M       M::::::::::M  B::::B     B:::::B G:::::G       GGGGGG
          M:::::::::::M     M:::::::::::M  B::::B     B:::::BG:::::G              
          M:::::::M::::M   M::::M:::::::M  B::::BBBBBB:::::B G:::::G              
          M::::::M M::::M M::::M M::::::M  B:::::::::::::BB  G:::::G    GGGGGGGGGG
          M::::::M  M::::M::::M  M::::::M  B::::BBBBBB:::::B G:::::G    G::::::::G
          M::::::M   M:::::::M   M::::::M  B::::B     B:::::BG:::::G    GGGGG::::G
          M::::::M    M:::::M    M::::::M  B::::B     B:::::BG:::::G        G::::G
          M::::::M     MMMMM     M::::::M  B::::B     B:::::B G:::::G       G::::G
          M::::::M               M::::::MBB:::::BBBBBB::::::B  G:::::GGGGGGGG::::G
          M::::::M               M::::::MB:::::::::::::::::B    GG:::::::::::::::G
          M::::::M               M::::::MB::::::::::::::::B       GGG::::::GGG:::G
          MMMMMMMM               MMMMMMMMBBBBBBBBBBBBBBBBB           GGGGGG   GGGG
                                                                        
          FEU INSTITUTE OF TECHNOLOGY
          CANVAS BEHAVIOR AND THEME OVERRIDE
          Author: Dr. Manuel B. Garcia
          Author URL: https://manuelgarcia.info
          Author URL: https://designrshub.com
          Author Contact: mbgarcia@feutech.edu.ph
          Version: 2.3
          Since: October 21, 2021;

============================================================================================== */