//CollectionCatalog
var CollectionCatalog = [];
var value=[];
var dirNames = ["漫威宇宙", "衣服買起來", "必去", "好好吃", "55", "22", "COOL", "YA" ];
var dirIDs = [ "1", "2", "3", "4", "5", "6", "7", "8" ];
$( document ).ready( function() 
{
        initial();
        document.querySelector('.addRow').addEventListener('click',
        function () {
                // let cmd = {};
                // cmd[ "act" ] = "addKeepDir";
                // cmd[ "account" ] = sessionStorage().getItem("Helen-UserID")
                // //cmd[ "dirIDs"] = dirIDs[ CollectionCatalog.indexOf( $(this).closest( "td" ).prev().find( "select" ).val() )];
                // cmd[ "dirName" ] = $('#input2').val();
                // $.post( "../index.php", cmd, function( dataDB ) 
                // {
                //     dataDB = JSON.parse( dataDB );

                //     if( dataDB.status == false )
                //     {
                //         swal({
                //             title: "新增看板失敗<br /><small>&lt;" + cmd.userID + ", " + $(this).text() +"&gt;</small>",
                //             type: "error",
                //             text: dataDB.errorCode
                //         });
                //     }
                //     else
                //     {
                //         swal({
                //             title: "新增看板成功<br /><small>&lt;" + cmd.userID + ", " + $(this).text() +"&gt;</small>",
                //             type: "success"

                //         }).then(( result ) => {
                //             if ( result ) 
                //             {
                //                 location.reload();
                //             }
                //         });
                //     }
                // });
                    let status = true;
                    if( status == false )
                    {
                        swal({
                            title: "增加收藏失敗",
                            type: "error",
                            text: "dataDB.errorCode",
                        });
                    }
                    else
                    {
                        swal({
                            title: "增加收藏成功" ,
                            type: "success"

                        })
                        var value = $('#input2').val();
                        console.log(value)
                        values.push(value);
                        const div = document.createElement('div');
                        
                        div.classList.add('Page');
                        
                        div.innerHTML = `
                        <div class="PageName">
                                    <div class="value"> 
                                        
                                    
                                        <span class="currency"><span class="WhichPage" id="cjgtxt">`+ document.getElementById('input2').value+ `</span>
                                
                                        </div>
                                </div>
                                <ul class="deals">
                                    <li>:):)</li>
                                    </ul>
                                
                                        <button class="more">more</button>
                                
                                </div>
                                
                                
                        `;
                        if(value!="")
                        {
                            document.querySelector('.row').appendChild(div)
                        }
                        $('#getValues').click(function(){
                            alert(values);
                        });
                        $(document).on('click','.more',function(){
                            console.log("more2")
                            swal({
                            title: '歡迎',
                            type: 'info',
                            text: '本訊息1秒後自動關閉',
                            width: 400,
                            showConfirmButton: false,
                            timer: 1000,
                        }).then(
                            function () { },
                            function (dismiss) {
                                if (dismiss === 'timer') {
                                    sessionStorage.setItem("Helen-act", "newCollectionCatalog");
                                    //sessionStorage.setItem( "Helen-articleID", articles[ thisArticle ].articleID );
                                    window.location.href = "../html/sub.html";
                                }
                            }
                        )
                    });
                        


                    }
                
                });
            });
        function funName1(id) {
            $("#chgtxt").text($("#txt1").val());
        }
        function initial()
        {
            let isValid = checkPermission();
            if( !isValid ) return;
        
            let cmd = {};
            cmd[ "act" ] = "newCollectionCatalog";
            // dirIDs = sessionStorage.getItem( "Helen-dirIDs" );
            // dirIDs = JSON.parse( boardIDs );
            // dirName = sessionStorage.getItem( "Helen-dirName" );
            // dirName = JSON.parse( boardNames );

            // $.post( "../index.php", cmd, function( dataDB )
            // {   
            //     dataDB = JSON.parse( dataDB );

            //     if( dataDB.status == false )
            //     {
            //         swal({
            //             title: "載入頁面失敗",
            //             type: "error",
            //             text: dataDB.errorCode
            //         })
            //     }
            //     else
            //     {
            //         let content = $( ".tabContent tbody" );
            //         content.empty();

            //         CollectionCatalog = dataDB.data;

            //         let validBoards = boardNames;
            //         for( let i in dataDB.data )
            //         {
            //             validBoards = arrayRemove( validBoards, dataDB.data[i].boardName );
            //         }

            //         let empty = true;
            //         let oneRow = "";
            //         let selectBlock = "";
            //         let buttonBlock = "";

            //         let validOptions = "";
            //         let validlis = "";
            //         for( let j in validBoards )
            //         {
            //             validOptions += "<option value='" + validBoards[j] + "'>" + validBoards[j] + "</option>";
            //             validlis += "<li><a href='#''>" + validBoards[j] + "</a></li>";
            //         }

            //         for( let i in dataDB.data )
            //         {
            //             empty = false;

            //             if( dataDB.data[parseInt(i) - 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) - 1].userID )
            //             {
            //                 oneRow = "<tr>" + 
            //                             "<td><img class='head' src='" + dataDB.data[i].color + ".png' alt='" + dataDB.data[i].color + "'></td>" +
            //                             "<td>" + dataDB.data[i].userID + "@mail.ntou.edu.tw</td>" +
            //                             "<td>";
            //             }

            //             selectBlock = "<div class='input-group input-group-lg mt-3'>" +
            //                                 "<select class='form-control' style='background-color: brown; color: white;'>" +
            //                                     "<option value='" + dataDB.data[i].boardName + "' selected>" + dataDB.data[i].boardName + "</option>" +
            //                                     validOptions + 
            //                                 "</select>" +
            //                         "</div>";

            //             oneRow += selectBlock;

            //             if( dataDB.data[parseInt(i) + 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) + 1].userID )
            //             {
            //                 oneRow += "</td><td>";

            //                 buttonBlock = "<div class='input-group input-group-lg mt-3'>" +
            //                                 "<div class='dropdown'>" +
            //                                     "<button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown' style='width: 40px !important;'>" +
            //                                         "<i class='fa fa-plus'></i>" +
            //                                     "</button>&nbsp;" +
            //                                     "<button class='btn btn-danger' type='button' style='width: 40px !important;'>" +
            //                                         "<i class='fa fa-minus'></i>" +
            //                                     "</button>" +
            //                                     "<ul class='dropdown-menu'>" +
            //                                         validlis +
            //                                     "</ul>" +
            //                                 "</div>" +
            //                             "</div>";

            //                 oneRow += buttonBlock + "</td></tr>";

            //                 content.append( oneRow );
            //             }
            //         }

            //         if( empty )
            //         {
            //             let emptyMessage = "<tr>" + 
            //                                     "<td colspan='4'>目前沒有版主</td>" +
            //                                 "</tr>";
            //             content.append( emptyMessage );
            //         }

            //         let addNewModerator = "<tr>" +
            //                                 "<td style='text-align: center;'>" +
            //                                     "<span class='glyphicon glyphicon-plus'></span>" +
            //                                 "</td>" +
            //                                 "<td>" +
            //                                     "<input type='text' id= 'account' class='textInput'>" +
            //                                         "@mail.ntou.edu.tw" +
            //                                 "</td>" +
            //                                 "<td>" +
            //                                     "<div class='input-group input-group-lg mt-3'>" +
            //                                         "<select class='form-control rounded-pill' style='background-color: brown; color: white;'>" +
            //                                         validOptions +
            //                                         "</select>" +
            //                                     "</div>" +
            //                                 "</td>" +
            //                                 "<td>" +
            //                                     "<div class='input-group mt-3'>" +
            //                                         "<button type='button' class='btn btn-success btn-lg'>" + 
            //                                             "<span class='glyphicon glyphicon-ok'></span> 確認" +
            //                                         "</button>" +
            //                                     "</div>" +
            //                                 "</td>" +
            //                             "</tr>";
            //         content.append( addNewModerator );
            //     }
            // });

            let content = $( ".tabContent tbody" );
            content.empty();

            let boards = [ "資工版", "電機版", "美食版", "企鵝版", "aa版", "bb版", "cc版", "dd版" ];

            let dataDB = {};
            dataDB[ "data" ] = [ { "userID": "00757000", "color": "red", "boardName": "資工版" }, 
                                    { "userID": "00757000", "color": "red", "boardName": "電機版" }, 
                                    { "userID": "00757001", "color": "blue", "boardName": "美食版" }, 
                                    { "userID": "00757002", "color": "green", "boardName": "企鵝版" } ];

            CollectionCatalog = dataDB.data;

            let validBoards = boards;
            for( let i in dataDB.data )
            {
                validBoards = arrayRemove( validBoards, dataDB.data[i].boardName );
            }

            let empty = true;
            let oneRow = "";
            let selectBlock = "";
            let buttonBlock = "";

            let validOptions = "";
            let validlis = "";
            for( let j in validBoards )
            {
                validOptions += "<option value='" + validBoards[j] + "'>" + validBoards[j] + "</option>";
                validlis += "<li><a>" + validBoards[j] + "</a></li>";
            }

            for( let i in dataDB.data )
            {
                empty = false;

                if( dataDB.data[parseInt(i) - 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) - 1].userID )
                {
                    oneRow = "<tr>" + 
                                "<td><img class='head' src='" + dataDB.data[i].color + ".png' alt='" + dataDB.data[i].color + "'></td>" +
                                "<td>" + dataDB.data[i].userID + "@mail.ntou.edu.tw</td>" +
                                "<td>";
                }

                selectBlock = "<div class='input-group input-group-lg mt-3'>" +
                                    "<select class='form-control' style='background-color: brown; color: white;'>" +
                                        "<option value='" + dataDB.data[i].boardName + "' selected>" + dataDB.data[i].boardName + "</option>" +
                                        validOptions + 
                                    "</select>" +
                                "</div>";

                oneRow += selectBlock;

                if( dataDB.data[parseInt(i) + 1] === undefined || dataDB.data[i].userID != dataDB.data[parseInt(i) + 1].userID )
                {
                    oneRow += "</td><td>";

                    buttonBlock = "<div class='input-group input-group-lg mt-3'>" +
                                    "<div class='dropdown'>" +
                                        "<button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown' style='width: 40px !important;'>" +
                                            "<i class='fa fa-plus'></i>" +
                                        "</button>&nbsp;" +
                                        "<button class='btn btn-danger' type='button' style='width: 40px !important;'>" +
                                            "<i class='fa fa-minus'></i>" +
                                        "</button>" +
                                        "<ul class='dropdown-menu'>" +
                                            validlis +
                                        "</ul>" +
                                    "</div>" +
                                    "</div>";

                    oneRow += buttonBlock + "</td></tr>";

                    content.append( oneRow );
                }
            }

            if( empty )
            {
                let emptyMessage = "<tr>" + 
                                        "<td colspan='4'>目前沒有版主</td>" +
                                    "</tr>";
                content.append( emptyMessage );
            }

            let addNewModerator = "<tr>" +
                                    "<td style='text-align: center;'>" +
                                        "<span class='glyphicon glyphicon-plus'></span>" +
                                    "</td>" +
                                    "<td>" +
                                        "<input type='text' id= 'account' class='textInput'>" +
                                            "@mail.ntou.edu.tw" +
                                    "</td>" +
                                    "<td>" +
                                        "<div class='input-group input-group-lg mt-3'>" +
                                            "<select class='form-control rounded-pill' style='background-color: brown; color: white;'>" +
                                            validOptions +
                                            "</select>" +
                                        "</div>" +
                                    "</td>" +
                                    "<td>" +
                                        "<div class='input-group mt-3'>" +
                                            "<button type='button' class='btn btn-success btn-lg'>" + 
                                                "<span class='glyphicon glyphicon-ok'></span> 確認" +
                                            "</button>" +
                                        "</div>" +
                                    "</td>" +
                                    "</tr>";
            content.append( addNewModerator );
                
                }