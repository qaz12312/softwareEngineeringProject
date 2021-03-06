<?php
	/*
	前端 to 後端:
	let cmd = {};
    cmd["act"] = "showAuthority";
    cmd["account"] = "00757007"; //cmd["token"]
    
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status = true:
    dataDB.info = ""
    dataDB.data.permission // 0(訪客)、1(一般使用者)、2(版主)、3(admin)
    如果是2 or 3: dataDB.data.boardName[0] //旅遊
                  dataDB.data.boardName[1] //星座
                  .....
	*/
    function doShowAuthority($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT `BoardName` FROM `Board` WHERE `UserID`=? AND `UserID` not in ('admin')";
        $result = query($conn,$sql,array($user),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $sql="SELECT `IsAdmin` FROM `Users` WHERE `UserID`=?";
            $result = query($conn,$sql,array($user),"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                $rtn = successCode("",array("permission"=>0,"boardName"=>array()));
            }else if($result[0][0]){
                $sql="SELECT `BoardName` FROM `Board` WHERE `UserID`='admin'";
                $result = query($conn,$sql,array(),"SELECT");
                $rtn = successCode("",array("permission"=>3,"boardName"=>$result));
            }else{
                $rtn = successCode("",array("permission"=>1,"boardName"=>array()));
            }
        }
        else{
            $arr = array("permission"=>2,"boardName"=>$result);
            $rtn = successCode("",$arr);
        }
		echo json_encode($rtn);
    }
?>