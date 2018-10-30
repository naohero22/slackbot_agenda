function gijiroku_function(){
  
  var botChannel;
  var botUser;
  var botIcon;       
  var botKaiginame;       
  var botComment;
  var botURL;       
  var botText;
  
  var gijiSheet = SpreadsheetApp.getActiveSheet(); //シートを取得
  var lastRow = gijiSheet.getLastRow(); //最終行の取得
  var gijiWeekAraay = gijiSheet.getRange(2,2,lastRow-1,1).getValues(); // var range=sheet.getRange(｛行番号｝,｛列番号｝,｛行数｝,｛列数｝) 
  var today= new Date();
  var currentWeek= today.getDay();
  var currentHour= today.getHours();
  
  var currentWeekString
  if(currentWeek == 1.0){
    currentWeekString = "月曜日";  
  }else if(currentWeek == 2.0){
    currentWeekString = "火曜日";  
  }else if(currentWeek == 3.0){
    currentWeekString = "水曜日";  
  }else if(currentWeek == 4.0){
    currentWeekString = "木曜日";  
  }else if(currentWeek == 5.0){
    currentWeekString = "金曜日";  
  }else if(currentWeek == 6.0){
    currentWeekString = "土曜日";  
  }else if(currentWeek == 7.0){
    currentWeekString = "日曜日";  
  }
  
  Logger.log("gijiSheet: " + gijiSheet);
  Logger.log("lastRow: " + lastRow);
  Logger.log("gijiWeekAraay: " + gijiWeekAraay);
  Logger.log("currentWeek: " + currentWeek);
  Logger.log("currentWeekString: " + currentWeekString);
  Logger.log("currentHour: " + currentHour);
  Logger.log("gijiWeekAraay.length: " + gijiWeekAraay.length);
  
 for(var i = 0; i < gijiWeekAraay.length; i++) {
   if(gijiWeekAraay[i] == currentWeekString){ //議事録曜日と現在曜日のチェック
     Logger.log("gijiWeekAraay[i]: " + gijiWeekAraay[i]);
     var gijiHour = gijiSheet.getRange(i+2,3).getValue(); // 当該行の議事録投稿時刻をチェック
     Logger.log("gijiHour: " + gijiHour);
     if(gijiHour == currentHour){
       botChannel = gijiSheet.getRange(i+2,4).getValue();
       botUser = gijiSheet.getRange(i+2,5).getValue();
       botIcon = gijiSheet.getRange(i+2,6).getValue();       
       botKaiginame = gijiSheet.getRange(i+2,7).getValue();       
       botComment = gijiSheet.getRange(i+2,8).getValue();
       botURL = gijiSheet.getRange(i+2,9).getValue();
       botText = botComment;       
       //botText = "【"+botKaiginame +"】\n"+ botComment + "\n" + "【議事録URL】\n" +botURL;
     }
   }
 }
  
  function slackPost(){
    var url        = 'https://slack.com/api/chat.postMessage';
    var token      = 'xoxp-11436800386-11436724945-312495071392-5415460a50988d5ebff70409170ac599';
    var parse      = 'full';
    //var channel    = '#bot_jikken';
    //var username   = '議事録bot'
    //var icon_emoji = ':bulb:';
    var method     = 'post'; 
    var payload = {
      'token'      : token,
      'channel'    : botChannel,
      'text'       : botText,
      'username'   : botUser,
      'parse'      : parse,
      'icon_emoji' : botIcon
    };
    var params = {
      'method' : method,
      'payload' : payload
    };
    var response = UrlFetchApp.fetch(url, params);
  }
  
  slackPost();
  
}

/*参考にした記事
https://qiita.com/a-ta/items/88cb44e8f9d741235b66
http://www.atmarkit.co.jp/ait/articles/1702/09/news021.html
https://www.tam-tam.co.jp/tipsnote/javascript/post8499.html
https://qiita.com/mayfair/items/e1d6a5d880a82b8ae398

// ０622
http://www.atmarkit.co.jp/ait/articles/1702/09/news021.html スプシのレンジで取得する。
https://qiita.com/chihiro/items/09c996d41d80f0d30e17 Loggerを使う
https://techacademy.jp/magazine/5587#sec7 日付について

*/


//var myWeek = mySheet.getRange(2,2,myRow,1).getValue(); // 最終行2列目の曜日を取得
//var allWeek = mySheet.getRange("B2:B100").getValues();
//  var ss = SpreadsheetApp.getActiveSpreadsheet(); //スプシを取得
//  var ss_url = ss.getUrl(); //スプシのURLを取得  
//  var ss_id = ss.getSheetId(); //シートのIDを取得 
  //var text = mySheet.getRange("B2:B100").getValues();
  //var myRow = mySheet.getLastRow(); //最終行の取得
  //var text = myRow
  
  
/*
function core_function(){
  var mySheet = SpreadsheetApp.getActiveSheet(); //シートを取得
  var myRow = mySheet.getLastRow(); //最終行の「行数」を取得
  var myValue = mySheet.getRange(myRow,2).getValue(); // 最終行2列目の「不具合内容」「アイディア内容」の取得
  //var myValues = mySheet.getRange(myRow,1,1,10).getValues(); //列情報全て取得する場合
  var ss = SpreadsheetApp.getActiveSpreadsheet(); //スプシを取得
  var ss_url = ss.getUrl(); //スプシのURLを取得  
  var ss_id = ss.getSheetId(); //シートのIDを取得  
  
  if(ss_id == 927008723){
  var text = "【TroubleReport_JA # " + myRow + " 】" + myValue + ss_url + "#gid=" + ss_id;
  } else if(ss_id == 1192680009){
  var text = "【Idea&Feedback_JA # " + myRow + " 】" + myValue + ss_url + "#gid=" + ss_id;
  } else if(ss_id == 1315462652){    
  var text = "【TroubleReport_EN # " + myRow + " 】" + myValue + ss_url + "#gid=" + ss_id;
  } else if(ss_id == 1453972978){    
  var text = "【Idea&Feedback_EN # " + myRow + " 】" + myValue + ss_url + "#gid=" + ss_id;
  }
  
   /*
  if(ss_id == 927008723){
    var username   = 'TroubleReport_JA';
    var icon_emoji = ':ambulance:';
  } else if(ss_id == 1192680009){    
    var username   = 'Idea&Feedback_JA';
    var icon_emoji = ':bulb:';
  } else if(ss_id == 1315462652){
    var username   = 'TroubleReport_EN';
    var icon_emoji = ':ambulance:';
  } else if(ss_id == 1453972978){    
    var username   = 'Idea&Feedback_EN';
    var icon_emoji = ':bulb:';
  }
  */
 
