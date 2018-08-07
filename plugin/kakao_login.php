<?php
    //kakao_login.php

	$restAPIKey = "18b3b3587f7c610a14815f6840d5d740"; //본인의 REST API KEY를 입력해주세요
	$callbacURI = urlencode("zytls92.cafe24.com/plugin/kakao_login_callback.php"); //본인의 Call Back URL을 입력해주세요
	$kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize?client_id=".$restAPIKey."&redirect_uri=".$callbacURI."&response_type=code";
	echo $kakaoLoginUrl;
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
	</head>
	
	<body>
		<a href="<?= $kakaoLoginUrl ?>">
			카카오톡으로 로그인
		</a>
	</body>
</html>