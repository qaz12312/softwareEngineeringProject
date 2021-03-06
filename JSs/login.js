$(document).ready(function () {
    barInitial();
    initial();
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){ 
           
            $('#Log-inBtn').click();
        }
    
    };
    // $(".account").onkeydown=function(event){
    //     if (event.keyCode == 13) { // 按下 ENTER
    //         $('#Log-inBtn').click();
    //     }
    // };
    
    
    $("#Log-inBtn").click(function () {
        let act = $("#account").val(),
            pw = $("#password").val();
        let format = Restrict();
        
        if ((!act)) {
            swal({
                title: 'Wrong',
                type: 'error',
                html: $('<h3>').text('請輸入學號 \u2620'),
                animation: false,
                customClass: 'animated tada',
                confirmButtonText: 'okay!',
                confirmButtonColor: '#ecba73'
            })
            $("#account").focus();
        }
        else if ((!pw)) {
            
            swal({
                title: 'Wrong',
                type: 'error',
                html: $('<h3>').text('沒輸入密碼喔 \u2620'),
                animation: false,
                customClass: 'animated tada',
                confirmButtonText: 'okay!',
                confirmButtonColor: '#b9cd74',
                timer:5000
            })
            $("#password").focus();
        }
        else if (format) {
            let cmd = {};
            cmd["act"] = "logIn";
            cmd["account"] = window.btoa(act);
            cmd["password"] = window.btoa(pw);
            $.post("../index.php", cmd, function (data) {
                
                dataDB = JSON.parse(data);
                if (dataDB.status == false) {
                    dataDB.data = ""
                    swal({
                        title: 'OOPS...',
                        type: 'error',
                        text: '帳號或密號錯誤 \u2620',
                        animation: false,
                        customClass: 'animated rotateOutUpLeft',
                        confirmButtonText: 'okay!',
                        confirmButtonColor: '#eda2b6'
                    }).then(( result ) => {}, ( dismiss ) => {});
                }
                else {//登入成功
                    
                    leaveUserDetails(dataDB.data[0], dataDB.data[1], dataDB.data[2]);
                    swal({
                        title: 'Welcome To Helen',
                        type: 'success',
                        text: '本訊息1秒後自動關閉',
                        showConfirmButton: false,
                        timer: 1000,
                    }).then(
                        function () { },
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                window.location.href = "../HTMLs/home.html";
                            }
                        }
                    )
                }
            });
        }

    });
    
    $("#Sign-upBtn").click(function () {
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
                    window.location.href = "./registration.html";
                }
            }
        )
    });
    $("#forgetPw-Btn").click(function () {
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
                    window.location.href = "./forgetPassword.html";
                }
            }
        )
    });
});

function initial() {
    let cmd = {};
    cmd["act"] = "logIn";
    cmd["account"] = window.btoa($("#account").val());
    cmd["password"] = window.btoa($("#password").val());
    $("#account").val("");
    $("#password").val("");
}

function Restrict() {
    let act = $("#account").val(),
        pw = $("#password").val();





    if (pw.length > 20 || pw.length < 3) {
        swal({
            title: 'OOPS...',
            type: 'error',
            html: '帳號或密號錯誤',
            confirmButtonText: 'okay!',
            confirmButtonColor: '#7a96a2'
        })
            $("#password").focus();
       
        return false;
    }
    /*else if (okPassword) {
        swal({
            title: 'OOPS...',
            type: 'error',
            html:'密碼只能是英文、數字 &#9888;',
            confirmButtonText: 'okay!',
            confirmButtonColor: '#252621'
        }).then(( result ) => {}, ( dismiss ) => {});
        return false;
    }*/
    return true;
}

function leaveUserDetails(account, color ,nickname) {
    sessionStorage.setItem("Helen-account", account);
    sessionStorage.setItem("Helen-color", color);
    sessionStorage.setItem("Helen-nickname", nickname);
}
