<?php
	/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "creatAccount";
    cmd["account"] = 00757003;
    cmd["password"] = 00757003;

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[0] // UserID:"00757003"
        dataDB.data[1] // Permissions:1
        dataDB.data[2] // Color:'#ffffff'
        dataDB.data[3] // Nickname:"00757003"
    否則
        dataDB.errorCode = "帳號已註冊" / "資料庫異常，註冊失敗"
        dataDB.data = "" 
	*/
    function doCreatAccount($input){
    	global $conn;
    	$sql="SELECT `UserID` FROM `Users` WHERE `UserID`='".$input['account']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows > 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "帳號已註冊";
            $rtn["data"] = "";
        }
        else{
            $sql="INSERT INTO  `Users`(`UserID`,`Password`,`Permissions`,`Color`,`Nickname`) VALUES('".$input['account']."','".$input['password']."',1,'\#ffffff','".$input['account']."')";
            $resultNew=$conn->query($sql);
            if(!$resultNew){
                die($conn->error);
            }
            $sql="SELECT `UserID`,`Permissions`,`Color`,`Nickname` FROM `Users` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "資料庫異常，註冊失敗";
                $rtn["data"] = "";
            }
            else{
                $row=$result->fetch_row();
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $row;
            }
        }
        echo json_encode($rtn);
    }
?>