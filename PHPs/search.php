<?php
    /*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "search";
    cmd["where"] = ["home"] / ["board","boardName(版的名字)"];
    cmd["option"] = "normal" / "hashTag" / "button";
    cmd["sort"] = "time" / "hot" / "collect" / "comment";
    cmd["searchWord"] = ["好吃","讚"];
    cmd["account"]="00757003"; //cmd["token"](如果使用者有登入)
    
    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Didn't find any relational article." / "Successfully search in home/board."
        (cmd["where"] = home)
        dataDB.data[i] //有i筆文章
        (
            dataDB.data[i].title        //文章的標題
            dataDB.data[i].boardName    //文章的所屬看板 (cmd["where"] = board 沒有)
            dataDB.data[i].articleID    //文章的id
            dataDB.data[i].like         //文章的總愛心數
            dataDB.data[i].keep         //文章的總收藏數
            dataDB.data[i].hasHeart     //文章的是否按過愛心
            dataDB.data[i].hasKeep      //文章的是否收藏
            dataDB.data[i].Hashtag      //文章的Hashtag
            dataDB.data[i].time         //文章的發布時間
        )
        (cmd["where"] = board)
        dataDB.data.articleList[i] //有i筆文章
        dataDB.data.topArticleID   //置頂的文章
        dataDB.data.rule           //板規
    否則
        dataDB.errorCode = "Didn't find any relational article." / "Failed to search in board."
        dataDB.data = ""
    */
    if(!isset($input["searchWord"])) {
        errorCode("You didn't input anything.");
    }
    $where = $input["where"];
    switch($where[0]){
        case "home": // 在首頁搜尋
            break;
        case "board": // 板內搜尋
            $sql = "SELECT `TopArticleID`,`Rule` FROM `Board`  WHERE `BoardName`= ?";
            $boardInfo = query($conn,$sql,array($where[1]),"SELECT");
            if(count($boardInfo)<=0){
                errorCode("This boardName: [".$where[1]."] doesn't exist");
            }
            break;
        // case "dir": // 收藏文件中搜尋
        //     $user = $input['account'];
        //     // $token =$input['token'];
        //     // if(!isset($_SESSION[$token])){//若帳號不存在
        //     //     errorCode("account doesn't exist.");
        //     // }else{
        //     //     $user = $_SESSION[$token]['account'];
        //         $sql = "SELECT EXISTS(SELECT 1 FROM `KeepDir` WHERE `DirName`= ? AND`UserID`= ? LIMIT 1)";
        //         $result = query($conn,$sql,array($where[1],$user),"SELECT");
        //         if(!$result[0][0]){
        //             errorCode("This dirName: [".$where[1]."] doesn't exist");
        //         }
        //     // }
        //     break;
        default:
            errorCode("This commend doesn't exist");
            break;
    }
    
    $sql = "SELECT `Title`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` ,`Hashtag` ,`Times` FROM `HomeHeart` NATURAL JOIN `HomeKeep`";
    switch($input["sort"]){
        case "time": // 最新
            $sql = $sql. " WHERE ";
            $orderWay = "Times";
            break;
        case "hot": // 最多愛心
            $sql = $sql. " WHERE ";
            $orderWay = "cntHeart";
            break;
        case "collect": //最多收藏
            $sql = $sql. " WHERE ";
            $orderWay = "cntKeep";
            break;
        case "comment": //最多留言數
            $sql = $sql. " LEFT JOIN `HomeComment` USING (ArticleID) WHERE ";
            $orderWay = "cntComment";
            break;
        default: 
            errorCode("Don't have this sort way.");
            break;
    }

    $searchWord = $input["searchWord"];
    $arrsize = count($searchWord);
    switch($input["option"]){
        case "normal": // 一般正常搜尋
            $sql = $sql ."(";
            $sql = $sql .str_repeat("`Content` LIKE ? OR ",  $arrsize);
            $sql = $sql .str_repeat("`Title` LIKE  ? OR ",  $arrsize-1);
            $sql = $sql . "`Title` LIKE  ?) ";
            //input query value
            [$search,$idx] = inputArr(2,$searchWord);
            if($where[0]=="board"){
                $sql = $sql . "AND `BoardName` =?";
                $search[$idx] = $where[1];
            }
            break;
        case "hashTag": // hashTag模糊搜尋
            $sql = $sql ."(";
            $sql = $sql .str_repeat("`Hashtag` LIKE  ? OR ",  $arrsize-1);
            $sql = $sql . "`Hashtag` LIKE  ?) ";
            //input query value
            [$search,$idx] = inputArr(1,$searchWord);
            if($where[0]=="board"){
                $sql = $sql . "AND `BoardName` =?";
                $search[$idx] = $where[1];
            }
            break;
        case "button": // hashTag精確搜尋
            $sql = $sql ."(";
            $sql = $sql .str_repeat("`Hashtag` LIKE  ? OR ",  $arrsize-1);
            $sql = $sql . "`Hashtag` LIKE  ?) ";
            //input query value
            [$search,$idx] = inputArr(1,$searchWord,"\"");
            if($where[0]=="board"){
                $sql = $sql . "AND `BoardName` =?";
                $search[$idx] = $where[1];
            }
            break;
        default:
            errorCode("Don't have this option way.");
            break;
    }
    doSearch($where[0],isset($boardInfo)== 1 ? $boardInfo : NULL,$sql,$orderWay,$search,empty($input['account'])== 0 ? $input['account'] : NULL);
?>
<?php

function inputArr($times,$words,$prep=""){
    $idx = 0;
    $arr = array();
    for($j=0;$j<$times;$j++){
        foreach($words as $value){
            $arr[$idx++] = "%".$prep.$value.$prep."%";
        }
    }
    return array($arr,$idx);
}

function doSearch($where,$boardInfo,$sql,$orderWay,$search,$user){
    global $conn;
    // $token = $user;
    // if(isset($_SESSION[$token])){
    //     $userInfo = $_SESSION[$token];
    //     $user = $userInfo['account'];
    //     global $input["searchWord"];
    //     writeRecord($user,$userInfo["log"],"search in".$where." about: ".json_encode($input["searchWord"], JSON_UNESCAPED_UNICODE));
    // }
    $sql = $sql." ORDER BY `".$orderWay."` DESC;";
    $result = query($conn, $sql, $search, "SELECT");
    $resultCount = count($result);
    if ($resultCount <= 0) { //找不到文章
        if($where=="board"){
            $rtn =successCode("Didn't find any relational article.", array("articleList"=>array(),"topArticleID"=>$boardInfo[0]['TopArticleID'],"rule"=>$boardInfo[0]['Rule']));
        }else{
            $rtn =successCode("Didn't find any relational article.", array());
        }
    } 
    else {
        $arr = array();
        for ($i = 0; $i < $resultCount; $i++) {
            $row = $result[$i];
            $articleID = $row['ArticleID'];
            if(!empty($user)) {
                $sql = "SELECT EXISTS(SELECT 1 FROM `FollowHeart` WHERE `ArticleID`=? AND`UserID`=? LIMIT 1)";
                $heart = query($conn, $sql, array($articleID, $user), "SELECT");
                $hasLike = $heart[0][0];

                $sql = "SELECT EXISTS(SELECT 1 FROM `FollowKeep` WHERE `ArticleID`=? AND`UserID`=? LIMIT 1)";
                $keep = query($conn, $sql, array($articleID, $user), "SELECT");
                $hasKeep = $keep[0][0];
                writeRecord($user,"Search","search in".$where." about: ".json_encode($search, JSON_UNESCAPED_UNICODE));
            } 
            else{
                $hasLike = 0 ;
                $hasKeep = 0 ;
            }
            $arr[$i] = array("title" => $row[0], "articleID" => $articleID, "like" => $row[3], "keep" => $row[4], "hasLike" => $hasLike, "hasKeep" => $hasKeep, "Hashtag" => json_decode($row[5]), "time" => $row[6]);
            if($where=="home"){
                $arr[$i] += ["boardName" => $row[1]];
            }
        }
        if($where=="board"){
            $arr = array("articleList" => $arr, "topArticleID" => $boardInfo[0][1], "rule" => $boardInfo[0][0]);
        }
        $rtn = successCode("Successfully search in ".$where.".",$arr);
    }
    echo json_encode($rtn);
}
?>
