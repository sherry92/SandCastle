// 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('c881ac5f6c70b9cb513a5b1d321661c4');

Kakao.Auth.createLoginButton({
    container: '#Kakao-login-btn',
    success: function(authObj) {
        // 로그인 성공시, API를 호출합니다.
        Kakao.API.request({
            url: '/v1/user/me',
            success: function(res) {
                //alert(JSON.stringify(res)); // kakao.api.request에서 불러온 결과값 json 형태로 출력
                //alert(JSON.stringify(authObj)); // kakao.Auth.createLoginButton에서 불러온 결과값 json 형태로 출력
                alert(res.properties.nickname+' 님 환영합니다.');
                location.href="/main.html";
                //location.href="./result?name="+res.properties.nickname;
                //location.href="https://kauth.kakao.com/oauth/authorize?client_id=d04ae1383bcffeba9d34606483d64c06&redirect_uri=zytla92.cafe24.com/kakao_login_callback.php&response_type=code"
            },
            fail: function(error) {
                alert(JSON.stringify(error));
            }
        })
    },
    fail: function(err) {
        alert(JSON.stringify(err));
    }
});

// // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
// Kakao.Link.createDefaultButton({
//     container: '#kakao-link-btn',
//     objectType: 'feed',
//     content: {
//       title: '딸기 치즈 케익',
//       description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
//       imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
//       link: {
//         mobileWebUrl: 'https://developers.kakao.com',
//         webUrl: 'https://developers.kakao.com'
//       }
//     },
//     social: {
//       likeCount: 286,
//       commentCount: 45,
//       sharedCount: 845
//     },
//     buttons: [
//       {
//         title: '웹으로 보기',
//         link: {
//           mobileWebUrl: 'https://developers.kakao.com',
//           webUrl: 'https://developers.kakao.com'
//         }
//       },
//       {
//         title: '앱으로 보기',
//         link: {
//           mobileWebUrl: 'https://developers.kakao.com',
//           webUrl: 'https://developers.kakao.com'
//         }
//       }
//     ]
// });

// Kakao.Story.createShareButton({
//     container: '#kakaostory-share-button',
//     url: 'http://developers.kakao.com',
//     text: '카카오 개발자 사이트로 놀러오세요! #개발자 #카카오 :)'
// });

// var refreshToken = Kakao.Auth.getRefreshToken();
// Kakao.Auth.setAccessToken(accessTokenFromServer);

function loginWithKakao() {
    // 로그인 창을 띄웁니다.
    Kakao.Auth.login({
    success: function(authObj) {
        alert(JSON.stringify(authObj));        
        },
    fail: function(err) {
        alert(JSON.stringify(err));        
        }      
    });
};

function ktout() {
    Kakao.Auth.logout(function() {
        setTimeout(function(){
            location.href="https://192.168.50.122:8083/pe/board/test"
        }, 1000); // 로그아웃 처리되는 타임을 임시적으로 1000설정(=1초)
    });
}

function shareStory() {
    Kakao.Story.share({
        url: 'https://developers.kakao.com',
        text: '카카오 개발자 사이트로 놀러오세요! #개발자 #카카오 :)'
    });
}

// // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
function sendLink() {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '딸기 치즈 케익',
        description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
        imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com'
        }
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com'
          }
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com'
          }
        }
      ]
    });
  }