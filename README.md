# 엘소드 10주년 기념 사이트 리뉴얼
1. 터미널에서 npm install 실행
2. Atom Bottom Dock Gulp 새로고침 후, default 태스크 실행
3. 모든 수정은 src 폴더 내 파일 이용
4. src/css, src/html 폴더 확인할 것
5. HTML Include 형식 @@@include('./header_main.html')
6. 최종 산출 CSS 파일 경로: assets/css/style.css
7. 최종 산출 HTML 파일 경로: 맨바깥(root)

## Gulp Task 목록
0. gulp html (HTML 파일 빌드)
0. gulp css (CSS 무압축 파일 빌드)
0. gulp cssnano (CSS 압축 파일 빌드)
0. gulp clean (최종 산출 폴더 비우기)
0. gulp default (gulp html, gulp css 태스크 처리 후, 서버 Live Reload)