// var articles = [{ "title": "海大附近有甚麼推薦的美食嗎？", "articleID": "123", "like": 1111, "keep": 2222, "hasLike": 1, "hasKeep": 0 }, 
//                 { "title": "學餐評價", "articleID": "456", "like": 1000, "keep": 2188, "hasLike": 0, "hasKeep": 1 }];

var articles = [];
var thisAccount = sessionStorage.getItem( "Helen-account" );
var thisBoardName = sessionStorage.getItem( "Helen-boardName" );
var thisSearching = sessionStorage.getItem( "Helen-search" );
var rule;
var topArticleID;
var keepMenu;
var isModerator;

$( document ).ready( function()
{
    initial();

    $( ".topnav a" ).click( function()
    {
        $( ".topnav a" ).removeClass( "active" );
        $( this ).addClass( "active" );
        sessionStorage.setItem( "Helen-sort", $(this).text() );
        location.reload();
    });

    $( ".tabContent button" ).has( ".glyphicon-pencil" ).click( function ()
    {
        swal({
            title: "版規",
            input: "textarea",
            inputPlaceholder: "請輸入文字...",
            showCancelButton: true,
            confirmButtonText: "送出",
            cancelButtonText: "取消",
            animation: false

            }).then(( result ) => {
                let topArticleName = $( ".card" ).has( ".glyphicon-pushpin.top" ).find( ".articleTitle" ).eq( 0 ).text();

                let cmd = {};
                cmd[ "act" ] = "editBoard";
                cmd[ "account" ] = thisAccount;
                cmd[ "oldBoardName" ] = thisBoardName;
                cmd[ "newBoardName" ] = "";
                cmd[ "rule" ] = result;

                $.post( "../index.php", cmd, function( dataDB )
                {
                    dataDB = JSON.parse( dataDB );

                    if( dataDB.status == false )
                    {
                        swal({
                            title: "修改版規失敗",
                            type: "error",
                            text: dataDB.errorCode
                        }).then(( result ) => {}, ( dismiss ) => {} );
                    }
                    else
                    {
                        swal({
                            title: "已成功修改版規",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000,
                
                        }).then(( result ) => {}, ( dismiss ) => {
                            if ( result ) 
                            {
                                $( "#rule" ).html( "版規：" + escapeHtml(result).split("\n").join("<br/>") );
                            }
                            else
                            {
                                $( "#rule" ).html( "版規： 無");
                            }
                        });
                    }
                });

                // swal({
                //     title: "已成功修改版規",
                //     type: "success",
                //     showConfirmButton: false,
                //     timer: 1000,
        
                // }).then(( result ) => {}, ( dismiss ) => {
                //     if ( result ) 
                //     {
                //         $( "#rule" ).html( "版規：" + escapeHtml(result).split("\n").join("<br/>") );
                //     }
                //     else
                //     {
                //         $( "#rule" ).html( "版規： 無");
                //     }
                // });
            }, ( dismiss ) => {} );
    });

    $( ".pushpinBtn" ).click( function()
    {
        if( !isModerator ) return;
        
        var tempTr = this.closest( "tr" );
        var tempTbody = this.closest( "tbody" );

        // let status = true;
        // if( status == false )
        // {
        //     swal({
        //         title: "置頂失敗",
        //         type: "error",
        //         text: "dataDB.errorCode"

        //     }).then(( result ) => {}, ( dismiss ) => {} );
        // }
        // else
        // {
        //     swal({
        //         title: "已成功置頂<br/><small>&lt;" + $( ".articleTitle", tempTr ).text() + "&gt;<small>",
        //         type: "success",
        //         showConfirmButton: false,
        //         timer: 1000,
    
        //     }).then(( result ) => {}, ( dismiss ) =>
        //     {
        //         if( dismiss )
        //         {
        //             $( ".pushpinBtn" ).removeClass( "top" );
        //             $( this ).addClass( "top" );

        //             tempTr.remove();
        //             tempTbody.prepend( tempTr );
        //         }
        //     });
        // }
        
        let cmd = {};
        cmd[ "act" ] = "TopArticleChange";
        cmd[ "account" ] = thisAccount;
        cmd[ "articleID" ] = articles.find( (element) => element.title == $( ".articleTitle", tempTr ).text() ).articleID;
        cmd[ "boardName" ] = thisBoardName;

        $.post( "../index.php", cmd, function( dateDB )
        {
            dataDB = JSON.parse( dataDB );

            if( dataDB.status == false )
            {
                swal({
                    title: "置頂失敗",
                    type: "error",
                    text: dataDB.errorCode,

                }).then(( result ) => {}, ( dismiss ) => {} );
            }
            else
            {
                swal({
                    title: "已成功置頂<br/><small>&lt;" + $( ".articleTitle", tempTr ).text() + "&gt;<small>",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000,
        
                }).then(( result ) => {}, ( dismiss ) =>
                {
                    if( dismiss )
                    {
                        $( ".pushpinBtn" ).removeClass( "top" );
                        $( this ).addClass( "top" );

                        tempTr.remove();
                        tempTbody.prepend( tempTr );
                    }
                });
            }
        });
    });

    $( ".articleTitle" ).parent().click( function() 
    {
        let thisArticle = articles.find( (element) => element.title == $( ".articleTitle", this ).text() );
        sessionStorage.setItem( "Helen-articleID", thisArticle.articleID );
        location.href =  "../html/post.html";
    });

    $( "button" ).has( ".glyphicon-heart" ).click( function()
    {
        let chosen = $( this ).find( "span" );
        let title = $( this ).closest( "tr" ).find( ".articleTitle" ).text();
        let thisArticle = articles.find( (element) => element.title == title );

        let cmd = {};
        cmd[ "act" ] = "heart";
        cmd[ "accout" ] = thisAccount;
        cmd[ "articleID" ] = thisArticle.articleID;

        $.post( "../index.php", cmd, function( dataDB )
        {
            dataDB = JSON.parse( dataDB );

            if( dataDB.status == false )
            {
                swal({
                    title: "錯誤！",
                    type: "error",
                    text: "dataDB.errorCode"
        
                }).then(( result ) => {}, ( dismiss ) => {} );
            }
            else
            {
                if( $( chosen ).hasClass( "text-danger" ) )
                {
                    $( chosen ).removeClass( "text-danger" );
                    $( chosen ).addClass( "text-light" );
                    $( this ).addClass( "btn-danger" );
                    
                    thisArticle.like = parseInt(thisArticle.like) + 1;
                    $( chosen ).eq(1).html( thisArticle.like );
                }
                else
                {
                    $( this ).removeClass( "btn-danger" );
                    $( chosen ).addClass( "text-danger" );
                    $( chosen ).removeClass( "text-light" );

                    thisArticle.like = parseInt(thisArticle.like) - 1;
                    $( chosen ).eq(1).html( thisArticle.like );
                }
            }
        });

        // if( $( chosen ).hasClass( "text-danger" ) )
        // {
        //     $( chosen ).removeClass( "text-danger" );
        //     $( chosen ).addClass( "text-light" );
        //     $( this ).addClass( "btn-danger" );
            
        //     thisArticle.like = parseInt(thisArticle.like) + 1;
        //     $( chosen ).eq(1).html( thisArticle.like );
        // }
        // else
        // {
        //     $( this ).removeClass( "btn-danger" );
        //     $( chosen ).addClass( "text-danger" );
        //     $( chosen ).removeClass( "text-light" );

        //     thisArticle.like = parseInt(thisArticle.like) - 1;
        //     $( chosen ).eq(1).html( thisArticle.like );
        // }
    });

    $( "button" ).has( ".glyphicon-star" ).click( function()
    {
        let chosen = $( this ).find( "span" );
        let title = $( this ).closest( "tr" ).find( ".articleTitle" ).text();
        let thisArticle = articles.find( (element) => element.title == title );

        if( keepMenu === undefined ) keepMenu = getKeepMenu();
        if( keepMenu.length == 0 )
        {
            swal({
                title: "錯誤",
                type: "error",
                text: "沒有可用的收藏分類哦",

            }).then(( result ) => {}, ( dismiss ) => {} );
        }

        // if( $( chosen ).hasClass( "text-warning" ) )
        // {
        //     swal({
        //         title: "選擇收藏目錄",
        //         input: 'select',
        //         inputOptions: keepMenu,
        //         showCancelButton: true,
        //         confirmButtonText: "確定",
        //         cancelButtonText: "取消",

        //     }).then((result) => {
        //         //
        //         let status = true;
        //         //
        //         if( status == false )
        //         {
        //             swal({
        //                 title: "錯誤！",
        //                 type: "error",
        //                 text: "dataDB.errorCode"
            
        //             }).then(( result ) => {}, ( dismiss ) => {} );
        //         }
        //         else
        //         {
        //             swal({
        //                 title: "收藏成功<br/><small>&lt;" + keepMenu[result] + "&gt;</small>",
        //                 type: "success",
        //                 showConfirmButton: false,
        //                 timer: 1000,
                
        //             }).then(( result ) => {}, ( dismiss ) => {
        //                 $( chosen ).removeClass( "text-warning" );
        //                 $( chosen ).addClass( "text-light" );
        //                 $( this ).addClass( "btn-warning" );

        //                 thisArticle.keep = parseInt( thisArticle.keep ) + 1;
        //                 $( chosen ).eq(1).html( thisArticle.keep );
        //             });
        //         }

        //     }, ( dismiss ) => {} );
        // }
        // else
        // {
        //     //
        //     let status = true;
        //     //
        //     if( status == false )
        //     {
        //         swal({
        //             title: "錯誤！",
        //             type: "error",
        //             text: "dataDB.errorCode",
        
        //         }).then(( result ) => {}, ( dismiss ) => {} );
        //     }
        //     else
        //     {
        //         $( this ).removeClass( "btn-warning" );
        //         $( chosen ).addClass( "text-warning" );
        //         $( chosen ).removeClass( "text-light" );

        //         thisArticle.keep = parseInt( thisArticle.keep ) - 1;
        //         $( chosen ).eq(1).html( thisArticle.keep );
        //     }
        // }
        
        if( $( chosen ).hasClass( "text-warning" ) )
        {
            swal({
                title: "選擇收藏目錄",
                input: 'select',
                inputOptions: keepMenu,
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",

            }).then((result) => {

                let cmd = {};
                cmd[ "act" ] = "keep";
                cmd[ "accout" ] = thisAccount;
                cmd[ "articleID" ] = thisArticle.articleID;
                cmd[ "dirName" ] = keepMenu[result];

                $.post( "../index.php", cmd, function( dataDB )
                {
                    dataDB = JSON.parse( dataDB );

                    if( dataDB.status == false )
                    {
                        swal({
                            title: "錯誤！",
                            type: "error",
                            text: dataDB.errorCode,
                
                        }).then(( result ) => {}, ( dismiss ) => {} );
                    }
                    else
                    {
                        swal({
                            title: "收藏成功<br/><small>&lt;" + keepMenu[result] + "&gt;</small>",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000,
                    
                        }).then(( result ) => {}, ( dismiss ) => {
                            $( chosen ).removeClass( "text-warning" );
                            $( chosen ).addClass( "text-light" );
                            $( this ).addClass( "btn-warning" );
    
                            thisArticle.keep = parseInt( thisArticle.keep ) + 1;
                            $( chosen ).eq(1).html( thisArticle.keep );
                        });
                    }
                });

            }, ( dismiss ) => {});
        }
        else
        {
            let cmd = {};
            cmd[ "act" ] = "keep";
            cmd[ "accout" ] = thisAccount;
            cmd[ "articleID" ] = thisArticle.articleID;
            cmd[ "dirName" ] = "";

            $.post( "../index.php", cmd, function( dataDB )
            {
                dataDB = JSON.parse( dataDB );

                if( dataDB.status == false )
                {
                    swal({
                        title: "錯誤！",
                        type: "error",
                        text: dataDB.errorCode,
            
                    }).then(( result ) => {}, ( dismiss ) => {} );
                }
                else
                {
                    $( this ).removeClass( "btn-warning" );
                    $( chosen ).addClass( "text-warning" );
                    $( chosen ).removeClass( "text-light" );

                    thisArticle.keep = parseInt( thisArticle.keep ) - 1;
                    $( chosen ).eq(1).html( thisArticle.keep );
                }
            });
        }
    });

    $('body').on('keydown','textarea', function(e)
    {
        if(e.which === 13)
        {
            e.preventDefault();
            var value = e.target.value;
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;

            if(start === end)
            {
                value = value.substring(0, start) + "\n" + value.substring(start, value.length);
            }
            else
            {
                value = value.substring(0, start) + "\n" + value.substring(end, value.length);
            }

            e.target.value = value;
        }

        return e.which !== 13;
    });
});

function initial()
{
    if( !thisAccount ) thisAccount = "";
    if( !thisBoardName ) thisBoardName = "";

    if( !thisSearching )
    {
        forNormal();
    }
    else
    {
        thisSearching = JSON.parse( thisSearching );
        forSearching();
    }

    checkPermission();
}

function forNormal()
{
    let cmd = {};
    cmd[ "act" ] = "sortInBoard";
    cmd[ "account"] = thisAccount;
    cmd[ "boardName" ] = thisBoardName;
    cmd[ "sort" ] = ($( ".contentArea h3" ).text().trim() == "熱門") ? "hot" : "time";

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode,

            }).then(( result ) => {}, ( dismiss ) =>
            {
                if ( dismiss )
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>500 Internal Server Error</h1>";
                    $( "body" ).append( httpStatus );
                }
            });
        }
        else
        {
            rule = dataDB.data.rule;
            topArticleID = dataDB.data.topArticleID;
            articles = dataDB.data.articleList;

            $( ".tabContent h2" ).html( 
                thisBoardName + "版" + 
                "<button style='float:right' type='button' class='btn btn-default btn-lg'>" +
                    "<span class='glyphicon glyphicon-pencil'> 編輯</span>" +
                "</button>" 
            );
            $( ".tabContent h3" ).html( sessionStorage.getItem( "Helen-sort" ) );
            $( ".topnav a" ).removeClass( "active" );
            $( ".topnav a:contains(" + sessionStorage.getItem( "Helen-sort" ) + ")" ).addClass( "active" );

            $( "#rule" ).html( "版規：" + rule.split("\n").join("<br/>") );

            $( ".tabContent tbody" ).empty();

            for( let i in articles )
            {
                let oneRow = "<tr>" +
                                "<td>" +
                                    "<div class='card'>" +
                                        "<div class='card-body row'>" +
                                            "<span class='col-md-2'>" + 
                                                "<button type='button' class='btn pushpinBtn'>" +
                                                    "<span class='glyphicon glyphicon-pushpin'></span>" +
                                                "</button>" +
                                            "</span>" +
                                            "<span class='col-md-6'>" +
                                                "<span class='articleTitle'>" + articles[i].title + "</span>" +
                                            "</span>" +
                                            "<span class='col-md-4'>";

                if( articles[i].hasLike == 1 )
                {
                    oneRow += "<button type='button' class='btn btn-danger'>" +
                                    "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-heart text-danger'></span><span class='text-danger heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }

                if( articles[i].hasKeep == 1 )
                {
                    oneRow += "<button type='button' class='btn btn-warning'>" +
                                    "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-heart text-warning'></span><span class='text-warning heartaa'> " 
                                        + articles[i].keep + "</span></button>";
                }
                                                
                oneRow += "</span></div></div></td></tr>";

                $( ".tabContent tbody" ).append( oneRow );
            }

            if( topArticleID != "" )
            {
                let topArticle = articles.find( (element) => element.articleID == topArticleID );

                if( topArticle !== undefined )
                {
                    topArticle = topArticle.title;

                    $( "span.articleTitle:contains('" + topArticle + "')" ).closest( "tr" ).find( ".pushpinBtn").addClass( "top" );

                    let tempTr = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( "tr" );
                    let tempTbody = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( ".tabContent tbody" );

                    tempTr.remove();
                    tempTbody.prepend( tempTr );
                }

                if( articles.length == 0 )
                {
                    let isEmpty = "<tr>" +
                                    "<td>" +
                                        "文章列表為空";
                                    "</td>" +
                                "</tr>";
                    $( ".tabContent tbody" ).append( isEmpty );
                }
            }
        }
    });

    // let status = true;
    // if( status == false )
    // {
    //     swal({
    //         title: "載入頁面失敗",
    //         type: "error",
    //         text: "dataDB.errorCode",

    //     }).then(( result ) => {}, ( dismiss ) =>
    //     {
    //         if ( dismiss )
    //         {
    //             $( "body" ).empty();
    //             let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>500 Internal Server Error</h1>";
    //             $( "body" ).append( httpStatus );
    //         }
    //     });
    // }
    // else
    // {
    //     rule = "dataDB.data.rule";
    //     topArticleID = "123";

    //     $( ".tabContent h2" ).html( 
    //         thisBoardName + "版" + 
    //             "<button style='float:right' type='button' class='btn btn-default btn-lg'>" +
    //                 "<span class='glyphicon glyphicon-pencil'> 編輯</span>" +
    //             "</button>" 
    //     );
    //     $( ".tabContent h3" ).html( sessionStorage.getItem( "Helen-sort" ) );
    //     $( ".topnav a" ).removeClass( "active" );
    //     $( ".topnav a:contains(" + sessionStorage.getItem( "Helen-sort" ) + ")" ).addClass( "active" );

    //     $( "#rule" ).html( "版規：" + rule.split("\n").join("<br/>") );

    //     $( ".tabContent tbody" ).empty();

    //     for( let i in articles )
    //     {
    //         let oneRow = "<tr>" +
    //                         "<td>" +
    //                             "<div class='card'>" +
    //                                 "<div class='card-body row'>" +
    //                                     "<span class='col-md-2'>" + 
    //                                         "<button type='button' class='btn pushpinBtn'>" +
    //                                             "<span class='glyphicon glyphicon-pushpin'></span>" +
    //                                         "</button>" +
    //                                     "</span>" +
    //                                     "<span class='col-md-6'>" +
    //                                         "<span class='articleTitle'>" + articles[i].title + "</span>" +
    //                                     "</span>" +
    //                                     "<span class='col-md-4'>";

    //         if( articles[i].hasLike == 1 )
    //         {
    //             oneRow += "<button type='button' class='btn btn-danger'>" +
    //                             "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
    //                                 + articles[i].like + "</span></button>";
    //         }
    //         else
    //         {
    //             oneRow += "<button type='button' class='btn btn-secondary'>" +
    //                             "<span class='glyphicon glyphicon-heart text-danger'></span><span class='text-danger heartaa'> " 
    //                                 + articles[i].like + "</span></button>";
    //         }

    //         if( articles[i].hasKeep == 1 )
    //         {
    //             oneRow += "<button type='button' class='btn btn-warning'>" +
    //                             "<span class='glyphicon glyphicon-star text-light'></span><span class='text-light heartaa'> " 
    //                                 + articles[i].like + "</span></button>";
    //         }
    //         else
    //         {
    //             oneRow += "<button type='button' class='btn btn-secondary'>" +
    //                             "<span class='glyphicon glyphicon-star text-warning'></span><span class='text-warning heartaa'> " 
    //                                 + articles[i].keep + "</span></button>";
    //         }
                                            
    //         oneRow += "</span></div></div></td></tr>";

    //         $( ".tabContent tbody" ).append( oneRow );
    //     }

    //     if( topArticleID != "" )
    //     {
    //         let topArticle = articles.find( (element) => element.articleID == topArticleID );

    //         if( topArticle !== undefined )
    //         {
    //             topArticle = topArticle.title;

    //             $( "span.articleTitle:contains('" + topArticle + "')" ).closest( "tr" ).find( ".pushpinBtn").addClass( "top" );

    //             let tempTr = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( "tr" );
    //             let tempTbody = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( ".tabContent tbody" );

    //             tempTr.remove();
    //             tempTbody.prepend( tempTr );
    //         }

    //         if( articles.length == 0 )
    //         {
    //             let isEmpty = "<tr>" +
    //                             "<td>" +
    //                                 "文章列表為空";
    //                             "</td>" +
    //                         "</tr>";
    //             $( ".tabContent tbody" ).append( isEmpty );
    //         }
    //     }
    // }
}

function forSearching()
{
    let cmd = {};
    cmd[ "act" ] = "searchBoard";
    cmd[ "account"] = thisAccount;
    cmd[ "searchBoard" ] = thisBoardName;
    cmd[ "sort" ] = ($( ".contentArea h3" ).text().trim() == "熱門") ? "hot" : "time";
    cmd[ "content" ] = thisSearching.content;
    cmd[ "hashtag" ] = thisSearching.hashtag;

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );
        sessionStorage.setItem( "Helen-search", "" );
        thisSearching = "";

        if( dataDB.status == false )
        {
            swal({
                title: "載入頁面失敗",
                type: "error",
                text: dataDB.errorCode,

            }).then(( result ) => {}, ( dismiss ) =>
            {
                if ( dismiss )
                {
                    $( "body" ).empty();
                    let httpStatus = "<h1 style='font-weight: bolder; font-family: Times, serif;'>500 Internal Server Error</h1>";
                    $( "body" ).append( httpStatus );
                }
            });
        }
        else
        {
            rule = dataDB.data.rule;
            topArticleID = dataDB.data.topArticleID;
            articles = dataDB.data.articleList;

            $( ".tabContent h2" ).html( 
                thisBoardName + "版" + 
                "<button style='float:right' type='button' class='btn btn-default btn-lg'>" +
                    "<span class='glyphicon glyphicon-pencil'> 編輯</span>" +
                "</button>" 
            );
            $( ".tabContent h3" ).html( sessionStorage.getItem( "Helen-sort" ) );
            $( ".topnav a" ).removeClass( "active" );
            $( ".topnav a:contains(" + sessionStorage.getItem( "Helen-sort" ) + ")" ).addClass( "active" );

            $( "#rule" ).html( "版規：" + rule.split("\n").join("<br/>") );

            $( ".tabContent tbody" ).empty();

            for( let i in articles )
            {
                let oneRow = "<tr>" +
                                "<td>" +
                                    "<div class='card'>" +
                                        "<div class='card-body row'>" +
                                            "<span class='col-md-2'>" + 
                                                "<button type='button' class='btn pushpinBtn'>" +
                                                    "<span class='glyphicon glyphicon-pushpin'></span>" +
                                                "</button>" +
                                            "</span>" +
                                            "<span class='col-md-6'>" +
                                                "<span class='articleTitle'>" + articles[i].title + "</span>" +
                                            "</span>" +
                                            "<span class='col-md-4'>";

                if( articles[i].hasLike == 1 )
                {
                    oneRow += "<button type='button' class='btn btn-danger'>" +
                                    "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-heart text-danger'></span><span class='text-danger heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }

                if( articles[i].hasKeep == 1 )
                {
                    oneRow += "<button type='button' class='btn btn-warning'>" +
                                    "<span class='glyphicon glyphicon-heart text-light'></span><span class='text-light heartaa'> " 
                                        + articles[i].like + "</span></button>";
                }
                else
                {
                    oneRow += "<button type='button' class='btn btn-secondary'>" +
                                    "<span class='glyphicon glyphicon-heart text-warning'></span><span class='text-warning heartaa'> " 
                                        + articles[i].keep + "</span></button>";
                }
                                                
                oneRow += "</span></div></div></td></tr>";

                $( ".tabContent tbody" ).append( oneRow );
            }

            if( topArticleID != "" )
            {
                let topArticle = articles.find( (element) => element.articleID == topArticleID );

                if( topArticle !== undefined )
                {
                    topArticle = topArticle.title;

                    $( "span.articleTitle:contains('" + topArticle + "')" ).closest( "tr" ).find( ".pushpinBtn").addClass( "top" );

                    let tempTr = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( "tr" );
                    let tempTbody = $( "span.articleTitle:contains('" + topArticle + "')" ).closest( ".tabContent tbody" );

                    tempTr.remove();
                    tempTbody.prepend( tempTr );
                }

                if( articles.length == 0 )
                {
                    let isEmpty = "<tr>" +
                                    "<td>" +
                                        "文章列表為空";
                                    "</td>" +
                                "</tr>";
                    $( ".tabContent tbody" ).append( isEmpty );
                }
            }
        }
    });
}

function checkPermission()
{
    isModerator = false;

    if( !thisAccount )
    {
        $( ".tabContent button" ).has( ".glyphicon-pencil" ).remove();
        $( ".tabContent button.pushpinBtn" ).not( ".top" ).remove();
        return;
    }

    // let status = true;

    // if( status == false )
    // {
    //     $( ".tabContent button" ).has( ".glyphicon-pencil" ).remove();
    //     $( ".tabContent button.pushpinBtn" ).not( ".top" ).remove();
    // }
    // else
    // {
    //     let permission = "2";
    //     let color = "";
    //     let nickname = "";
    //     let boardName = ["美食"];

    //     if( boardName.indexOf( thisBoardName ) == -1 )
    //     {
    //         $( ".tabContent button" ).has( ".glyphicon-pencil" ).remove();
    //         $( ".tabContent button.pushpinBtn" ).not( ".top" ).remove();
    //     }
    //     else
    //     {
    //         isModerator = true;
    //     }
    // }

    let cmd = {};
    cmd[ "act" ] = "showAuthority";
    cmd[ "account" ] = thisAccount;

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false )
        {
            $( ".tabContent button" ).has( ".glyphicon-pencil" ).remove();
            $( ".tabContent button.pushpinBtn" ).not( ".top" ).remove();
        }
        else
        {
            let boardName = dataDB.data.boardName;
            
            if( boardName.indexOf( thisBoardName ) == -1 )
            {
                $( ".tabContent button" ).has( ".glyphicon-pencil" ).remove();
                $( ".tabContent button.pushpinBtn" ).not( ".top" ).remove();
            }
            else
            {
                isModerator = true;
            }
        }
    });
}

function getKeepMenu()
{
    // return ["最愛", "漫威", "小說"];

    let cmd = {};
    cmd[ "act" ] = "showDirList";
    cmd[ "account" ] = thisAccount;

    $.post( "../index.php", cmd, function( dataDB )
    {
        dataDB = JSON.parse( dataDB );

        if( dataDB.status == false)
        {
            swal({
                title: "取得收藏資分類失敗",
                type: "error",
                text: dataDB.errorCode
            }).then(( result ) => {}, ( dismiss ) => {} );

            return [];
        }
        else
        {
            return dataDB.data;
        }
    });
}

function escapeHtml(str)
{
    return $('<div/>').text(str).html();
}