<?php 
 $CLIENT_ID     = "d04ae1383bcffeba9d34606483d64c06"; 
 $REDIRECT_URI  = "zytls92.cafe24.com/oauth"; 
 $TOKEN_API_URL = "https://kauth.kakao.com/oauth/token"; 

 $code   = $_GET["code"]; 
 $params = sprintf( 'grant_type=authorization_code&client_id=%s&redirect_uri=%s&code=%s', $CLIENT_ID, $REDIRECT_URI, $code); 

 $opts = array( 
   CURLOPT_URL => $TOKEN_API_URL, 
   CURLOPT_SSL_VERIFYPEER => false, 
    CURLOPT_SSLVERSION => 1, // TLS
   CURLOPT_POST => true, 
   CURLOPT_POSTFIELDS => $params, 
   CURLOPT_RETURNTRANSFER => true, 
   CURLOPT_HEADER => false 
 ); 

 $curlSession = curl_init(); 
 curl_setopt_array($curlSession, $opts); 
 $accessTokenJson = curl_exec($curlSession); 
 curl_close($curlSession); 

 echo $accessTokenJson; 
?>