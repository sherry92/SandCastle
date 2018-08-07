<!DOCTYPE HTML>

<html>
	<head>
		<meta charset="utf-8" />
		<title>SandCastle</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <link rel="stylesheet" href="/style/main.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
		<noscript><link rel="stylesheet" href="/style/noscript.css" /></noscript>
		<script src="/pixi.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.1/pixi.min.js"></script>
        <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
        <style>
          #container {
            width: 70%;
            margin: 0 auto;     /* 가로로 중앙에 배치 */
            padding-top: 10%;   /* 테두리와 내용 사이의 패딩 여백 */
          }
           
          #list {
            text-align: center;
          }
         
          #write {
            text-align: right;
          }
           
          /* Bootstrap 수정 */
          .table > thead {
            background-color: #b3c6ff;
          }
          .table > thead > tr > th {
            text-align: center;
          }
          .table-hover > tbody > tr:hover {
            background-color: #e6ecff;
          }
          .table > tbody > tr > td {
            text-align: center;
          }
          .table > tbody > tr > #title {
            text-align: left;
          }
           
          div > #paging {
            text-align: center;
          }
           
          .hit {
            animation-name: blink;
            animation-duration: 1.5s;
            animation-timing-function: ease;
            animation-iteration-count: infinite;
            /* 위 속성들을 한 줄로 표기하기 */
            /* -webkit-animation: blink 1.5s ease infinite; */
          }
           
          /* 애니메이션 지점 설정하기 */
          /* 익스플로러 10 이상, 최신 모던 브라우저에서 지원 */
          @keyframes blink {
            from {color: white;}
            30% {color: yellow;}
            to {color: red; font-weight: bold;}
            /* 0% {color:white;}
            30% {color: yellow;}
            100% {color:red; font-weight: bold;} */
          }
        </style>
	</head>
	<body class="is-preload">
		<!-- Page Wrapper -->
			<div id="page-wrapper">
				<!-- Header -->
					<header id="header">
						<h1><a href="index.html">TreasureHunter</a></h1>
						<nav id="nav">
							<ul>
								<li class="special">
									<a href="#menu" class="menuToggle"><span>Menu</span></a>
									<div id="menu">
										<ul>
											<li><a href="index.html">Home</a></li>
											<li><a href="main.html">Game</a></li>
											<li><a href="rank.php">Rank</a></li>
											<li><a href="kakao_login.php">API</a></li>
										</ul>
									</div>
								</li>
							</ul>
						</nav>
					</header>

				<!-- Main -->
					<article id="main">
                        <div id="container">                    
                            <div id="list">
                                <b>RANKING</b>
                            </div>

                            <div>
                                <table class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                    <th width="10%">순위</th>
                                    <th width="40%">이름</th>
                                    <th width="10%">점수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1등</td>
                                    <td>김정우</td>
                                    <td>10000</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>
					</article>
			</div>

		<!-- Scripts -->
			<script src="/src/jquery.min.js"></script>
			<script src="/src/jquery.scrollex.min.js"></script>
			<script src="/src/jquery.scrolly.min.js"></script>
			<script src="/src/browser.min.js"></script>
			<script src="/src/breakpoints.min.js"></script>
			<script src="/src/util.js"></script>
			<script src="/src/main.js"></script>

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	</body>
</html>