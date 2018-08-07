<?php
$url = 'https://kapi.kakao.com/v1/user/me'; //접속할 url 입력

$post_data["param1key"] = "param1value";
$post_data["param2key"] = "param2value";

//$header_data = array('Authorization: Bearer access_token_value'); //에러 발생
$header_data = [];
$header_data[] = 'Authorization: Bearer access_token_value';

$ch = curl_init(); //curl 사용 전 초기화 필수(curl handle)

curl_setopt($ch, CURLOPT_URL, $url); //URL 지정하기
curl_setopt($ch, CURLOPT_POST, 1); //0이 default 값이며 POST 통신을 위해 1로 설정해야 함
curl_setopt ($ch, CURLOPT_POSTFIELDS, $post_data); //POST로 보낼 데이터 지정하기
curl_setopt ($ch, CURLOPT_POSTFIELDSIZE, 0); //이 값을 0으로 해야 알아서 &post_data 크기를 측정하는듯
curl_setopt($ch, CURLOPT_HTTPHEADER, $header_data); //header 지정하기
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1); ////이 옵션이 0으로 지정되면 curl_exec의 결과값을 브라우저에 바로 보여줌. 이 값을 1로 하면 결과값을 return하게 되어 변수에 저장 가능(테스트 시 기본값은 1인듯?)
$res = curl_exec ($ch);

var_dump($res);//결과값 확인하기
echo '<br>';
print_r(curl_getinfo($ch));//마지막 http 전송 정보 출력
echo curl_errno($ch);//마지막 에러 번호 출력
echo curl_error($ch);//현재 세션의 마지막 에러 출력
curl_close($ch);
?>