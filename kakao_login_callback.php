<?php
    //kakao_login_callback.php

	$returnCode = $_GET["code"]; // 서버로 부터 토큰을 발급받을 수 있는 코드를 받아옵니다.
	$restAPIKey = "d04ae1383bcffeba9d34606483d64c06"; // 본인의 REST API KEY를 입력해주세요
	$callbacURI = urlencode("zytls92.cafe24.com/kakao_login_callback.php"); // 본인의 Call Back URL을 입력해주세요

    // API 요청 URL
	$returnUrl = "https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=".$restAPIKey."&redirect_uri=".$callbacURI."&code=".$returnCode;
	
	$isPost = false;
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $returnUrl);
	curl_setopt($ch, CURLOPT_POST, $isPost);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	$headers = array();
	$loginResponse = curl_exec ($ch);
	$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close ($ch);
	
	var_dump($loginResponse); // Kakao API 서버로 부터 받아온 값

    $accessToken= json_decode($loginResponse)->access_token; //Access Token만 따로 뺌

    echo "<br><br> accessToken : ".$accessToken;
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
	</head>
	
	<body>
		<p><?= $kakaoLoginUrl ?>카카오톡으로 로그인</p>
	</body>
</html>