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
                $sql3 = "SELECT `Title`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `Content` LIKE '%" . $input['searchWord'] . "%' OR `Title` LIKE '%" . $input['searchWord'] . "%' ORDER BY `Times` DESC";
                $result = $conn->query($sql3);
                if (!$result) {
                    die($conn->error);
                }
            }else if ($input['sort'] == "hot") {
                $sql3 = "SELECT `Title`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM HomeHeart NATURAL JOIN HomeKeep WHERE `Content` LIKE '%" . $input['searchWord'] . "%' OR `Title` LIKE '%" . $input['searchWord'] . "%' ORDER BY `cntHeart` DESC";
                $result = $conn->query($sql3);
                if (!$result) {
                    die($conn->error);
                }
            }

            if ($result->num_rows <= 0) {    //找不到文章
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "Don't have any article.";
                $rtn["data"] = "";
            } else {
                $arr = array();
                for ($i = 0; $i < $result->num_rows; $i++) {    //回傳找到的文章(包含關鍵字)
                    $row = $result->fetch_row();
                    $sqlHeart ="SELECT `UserID` FROM `FollowHeart` WHERE `ArticleID`='".$row[1]."'AND`UserID`='".$input['account']."'" ;
                    $heart = $conn->query($sqlHeart);
                    if (!$heart) {
                        die($conn->error);
                    }
                    $sqlKeep ="SELECT `UserID` FROM `FollowKeep` WHERE `ArticleID`='".$row[1]."'AND`UserID`='".$input['account']."'" ;
                    $keep = $conn->query($sqlKeep);
                    if (!$keep) {
                        die($conn->error);
                    }
                    $log = array("title" => "$row[0]",  "boardName" => "$row[1]", "like" => "$row[2]", "keep" => "$row[3]", "hasHeart" => ( $heart->num_rows>0 ? 1 : 0), "hasKeep" => ($keep->num_rows>0 ? 1 : 0 ));
                    $arr[$i] = $log;
                }
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $arr;
            }
        } else {
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "Failed to search in menu.";
            $rtn["data"] = "";
        }
        echo json_encode($rtn);
    }
?>