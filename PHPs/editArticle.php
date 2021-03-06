<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "editArticle";
	cmd["articleID"] = ArticleID;
	cmd["account"] = "00757003"; //cmd["token"]
	cmd["blockName"] ="美食"; // 使用者想改版
	cmd["title"] = "Title";
	cmd["content"] = "Content";
	cmd["picture"] = "Image";
	cmd['video'] = "video";
	cmd["hashTag"] ="HashTag"(array);
	cmd['anonymous'] = 0/ 1 (是否要匿名)

	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully edited this article."
		dataDB.data = ""
	否則
		dataDB.errorCode = "Update without permission."
		dataDB.data = ""
	*/
    function doEditArticle($input){ 
		global $conn;    
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }
		// $userInfo = $_SESSION[$token];
		// $user = $userInfo['account'];
		
		$user = $input['account'];
		$sql="SELECT EXISTS(SELECT 1 FROM `Article` JOIN `Users` ON Users.UserID=Article.AuthorID WHERE `ArticleID`=? AND `AuthorID`=? LIMIT 1)";  //文章是否存在
		$result = query($conn,$sql,array($input['articleID'], $user),"SELECT");
		if(!$result[0][0]){
			errorCode("Update without permission.");
		}
		else{
			if(empty($input['hashTag'])){
				$hashTag = json_encode(array(), JSON_UNESCAPED_UNICODE);
			}else{
				$hashTag = json_encode($input['hashTag'], JSON_UNESCAPED_UNICODE);
			}
			if(empty($input['picture'])){
				$input['picture'] = "";
			}
			if(empty($input['video'])){
				$input['video'] = "";
			}
			$sql="UPDATE `Article` SET `Title`=?,`Content`=?,`Image`=?,`Video`=?,`HashTag`=?,`BlockName`=?,`Anonymous`=? WHERE `ArticleID` = ? AND `AuthorID`=?";
			$arr = array($input['title'], $input['content'], $input['picture'],$input['video'], $hashTag, $input['blockName'], $input['anonymous'],$input['articleID'], $user);
			query($conn,$sql,$arr,"UPDATE");
			// writeRecord($user,$userInfo["log"],"edit for articleID:".$input['articleID']);
			writeRecord($user,"Edit Article","articleID:".$input['articleID']);
			$rtn = successCode("Successfully edited this article.", $result);
		}
		echo json_encode($rtn);
	}
?>
