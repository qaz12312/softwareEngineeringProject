<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "editComment"
    cmd["account"] = "AuthorID" //cmd["token"]
    cmd["detail"] = "Content"
    cmd["articleID"] ="ArticleID"
    cmd["floors"] = "Floor"

    後端 to 前端:
    dataDB.status
    若 status = true:
    dataDB.status = true
    dataDB.info = ""
    dataDB.data = 更新後的留言
    否則 status = false:
    dataDB.status = false
    dataDB.data = ""
    dataDB.errorCode = "Update without permission."/"Failed to found the update board."
    */
    function doEditComment($input){
        global $conn;
        $sql="SELECT `ArticleID` FROM `Comments` NATURAL JOIN`Users`  WHERE `ArticleID`=? AND `AuthorID`=? AND`Floor`=?";  
        $arr = array($input['articleID'], $input['account'], $input['floors']);
		$result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        
        if($resultCount <= 0){
            errorCode("Update without permission.");
        }
        else{    
            $sql="UPDATE `Comments` SET `Content`=? WHERE `ArticleID`=? AND `AuthorID`=? AND`Floor`=?";
            $arr = array($input['detail'], $input['articleID'], $input['account'], $input['floors']);
            query($conn,$sql,$arr,"UPDATE");

            $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`Color` FROM `Comments` JOIN`Users` ON Users.UserID =Comments.AuthorID  WHERE `ArticleID`=? AND `AuthorID`=? AND`Floor`=?";
            $arr = array($input['articleID'], $input['account'], $input['floors']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to found the update comment.");
            }
            else{
                $rtn = successCode("Successfully edited this comment.",$result);
            }
        }
        echo json_encode($rtn);
    }
?>
