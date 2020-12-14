<?php include '../sendemail.php'; ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Contact Form</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">	<!-- w3school的搜尋圖示 -->
        
        <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.10.3/sweetalert2.js" type="text/javascript"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.10.3/sweetalert2.css" />
        <!--
        <link rel="icon" href="./static/icon128.ico" type="image/x-icon">
        <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&display=swap" rel="stylesheet">
        <link rel= "stylesheet" href= "./static/myBookCaseMain.css">
        -->
        <link rel= "stylesheet" href= "../css/forgetPassword.css">
        <link rel="stylesheet" href="../css/style.css">
        <link rel= "stylesheet" href= "../css/topnav.css">
  </head>
  <body>
  

    <!--alert messages start-->
    <?php echo $alert; ?>
    <!--alert messages end-->

    <!--contact section start-->
    <!--<div class="contact-section">
      <div class="contact-info">
        <div><i class="fas fa-map-marker-alt"></i>Address, City, Country</div>
        <div><i class="fas fa-envelope"></i>contact@email.com</div>
        <div><i class="fas fa-phone"></i>+00 0000 000 000</div>
        <div><i class="fas fa-clock"></i>Mon - Fri 8:00 AM to 5:00 PM</div>
      </div>
      <div class="contact-form">
        <h2>Contact Us</h2>
        <form class="contact" action="" method="post">
          <input type="text" name="name" class="text-box" placeholder="Your Name" required>
          <input type="email" name="email" class="text-box" placeholder="Your Email" required>
          <input type="message" rows="5" placeholder="Your Message" required><input>
          <input type="submit" name="submit" class="send-btn" value="Send">
        </form>
      </div>
    </div>-->
    <div class="topnav">
        <div class="dropdown">
        <button class="dropbtn" onclick="myFunction(), cross(this)">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        </button>
        <div class="dropdown-content" id="myDropdown">	<!-- 各大版-->
          <a href="#">Link 1</a>	
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
          <a href="#">+</a>
        </div>
        </div>
        <div class="login">
        <button>登入</button>
        </div>
        <div class="imgcontainer">
          <i class="fa fa-user-circle" aria-hidden="true"></i>
        </div>
        <div class="search-container">
          <input type="text" placeholder="Search.." name="search">
          <button type="submit"><i class="fa fa-search"></i></button>
        </div>
      </div>
    <div class= "tabContent">
        <h2>Helen－忘記密碼</h2>
        <p>Welcome To Helen</p>
        <div class="contentArea">
            <div class= "content">
        <table>
        <form class="contact" action="" method="post">
            <tr>
                <td rowspan= "4" style="width: 200pt; height: 200pt">
                    <a href={{ url_for('index') }}> 
                        <img src= "../imgs/logo.png" class= "logo">
                    </a>
                </td>
                <td>輸入帳號</td>

                <td>
                
                    <span class="glyphicon glyphicon-envelope"></span>
                    <!--<input type="email" name="email" class="text-box" placeholder="Your Email" required>-->
                    <input type="text" name="email" id= "emailID" class="textInput"
                        name= "email" placeholder="Enter email"  autocomplete="off" >
                    <span id="emailMsg"></span>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button type="submit" class="btn btn-info" name="submit" id="sub_btn">
                        <span class="glyphicon glyphicon-send"></span> 驗證信箱</button>
                        <span id="chkmsg"></span>
                </td>
            </tr>
            </form>
            <tr>
            
                <td>輸入新密碼</td>
                <td>
                    <span class="glyphicon glyphicon-lock"></span>
                    <input type="password" id= "password" class="textInput"
                    name= "password" placeholder="password" required>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button type="button" class="btn btn-primary">
                        <span class="glyphicon glyphicon-log-in"></span> 登入
                    </button>
                </td>
            </tr>
        </table>
    </div>
        </div>
    <!--contact section end-->

    <script type="text/javascript">
    if(window.history.replaceState){
      window.history.replaceState(null, null, window.location.href);
    }
    </script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js">
       </script>

    <script src="../js/forgetPassword.js"></script>
    
    </body>
</html>
                           