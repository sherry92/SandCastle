<?php

$conn=mysql_connect('localhost', 'zytls92', 'KAU-PBNBB!!');     //MySQL 접속 및 설정 저장
mysql_select_db("zytls92", $conn);            //DB 접속

$sql="select * from rank ORDER BY score DESC LIMIT 0, 10";                         //test 테이블의 레코드를 모두 뽑아오기
$sql_result=mysql_query($sql, $conn);          //질의(위 내용)를 수행하라.

$count=mysql_num_rows($sql_result);          //mysql_num_rows() 함수 : 행의 개수를 세는 함수.
echo $count;     //mysql query 수행 후 반환되는 결과값을 매개변수로 받고 그 레코드의 개수를 반환

//mysql_result(쿼리실행결과, 행번호, 변수값) : 결과값을 행 단위로 화면에 출력해주는 함수.

for($i=0; $i<$count; $i++)
{
    $nickname=mysql_result($sql_result, $i, nickname);
    $score=mysql_result($sql_result, $i, score);
    
    echo "$nickname : $score <br>";
}

//mysql_fetch_array($sql_result) 배열 형식으로 결과값을 화면상에 출력해주는 역할..
// for($i=0; $i<$count; $i++)
// {
//     $result_array=mysql_fetch_array($sql_result);
//     echo "num : $result_array[nickname] : $result_array[score] <br>";
// }

?>