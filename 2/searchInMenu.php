<?php
    /* 前端 to 後端:
    let cmd = {};
    cmd["act"] = "searchMenu";
    cmd["account"]="00757033";
    cmd["searchWord"] = "美食";
    cmd["sort"] = "time/hot";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[i] //有i筆文章
        (
        dataDB.data[i].title //第i筆文章的標題
        dataDB.data[i].blockName //第i筆文章的所屬看板
        dataDB.data[i].articleID //第i筆文章的id
        dataDB.data[i].like //第i筆文章的總愛心數
        dataDB.data[i].keep //第i筆文章的總收藏數
        dataDB.data[i].hasHeart//第i筆文章的是否按過愛心
        dataDB.data[i].hasKeep//第i筆文章的是否收藏
        ) 
    否則
        dataDB.errorCode = "Don't have any article." / "Failed to search in menu."
        dataDB.data = ""
    */
    function doSearchMenu($input)
    {
        global $conn;
        //搜尋標題+內容
        if ($input['sort'] == "time" || $input['sort'] == "hot") {
            if ($input['sort'] == "time") {
                $sql = "SELECT `Title`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `Content` LIKE '%" . $input['searchWord'] . "%' OR `Title` LIKE '%" . $input['searchWord'] . "%' ORDER BY `Times` DESC";
                $arr = array();
            }else if ($input['sort'] == "hot") {
                $sql = "SELECT `Title`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `Content` LIKE '%" . $input['searchWord'] . "%' OR `Title` LIKE '%" . $input['searchWord'] . "%' ORDER BY `cntHeart` DESC";
                $arr = array();
            }
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if ($resultCount <= 0) {    //找不到文章
                errorCode("Don't have any article.");
            } else {
                $arr = array();
                for($i=0;$i<$resultCount;$i++){//回傳找到的文章(包含關鍵字)
                    $row = $result[$i];
                    $articleID = $row['ArticleID'];
                    $sql ="SELECT `UserID` FROM `FollowHeart` WHERE `ArticleID`='".$articleID."'AND`UserID`='".$input['account']."'" ;
                    $arr = array();
                    $heart = query($conn,$sql,$arr,"SELECT");
                    $heartCount = count($heart);
                    
                    $sql ="SELECT `UserID` FROM `FollowKeep` WHERE `ArticleID`='".$articleID."'AND`UserID`='".$input['account']."'" ;
                    $arr = array();
                    $keep = query($conn,$sql,$arr,"SELECT");
                    $keepCount = count($keep);

                    $log = array("title" => $row[0],"boardName" => $row[1],"articleID" => $articleID,"like" => $row[2], "keep" => $row[3], "hasHeart" => ( $heartCount>0 ? 1 : 0), "hasKeep" => ($keepCount>0 ? 1 : 0 ));
                    $arr[$i] = $log;
                }
                $rtn = successCode($arr);
            }
        } else {
            errorCode("Failed to search in menu.");
        }
        echo json_encode($rtn);
    }
?>