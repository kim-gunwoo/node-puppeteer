const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
  }); // headless 기본 true 이며 false 일 경우 브라우져를 연다
  const page = await browser.newPage();
  const url = "https://www.naver.com/";

  // 페이지 사이즈를 지정
  //   await page.setViewport({
  //     width: 1920,
  //     height: 1080,
  //   });

  // 웹사이트 로딩
  await page.goto(url, { timeout: 0, waitUntil: "domcontentloaded" });

  // $ 은 요소를 선택함 , $eval() 은 데이터를 추출
  let html_tag = await page.$eval(".issue", (tag) => {
    return tag.textContent.trim();
  });

  //console.log(html_tag);

  html_tag = await page.$(".issue", (tag) => {
    return tag.textContent.trim();
  });

  //console.log(html_tag);

  let data = {};

  data.link = await page.evaluate((data) => {
    return data.href;
  }, html_tag);

  //console.log(data);

  // 페이지 이동
  // 선택자 클릭을 이용한 페이지 전환
  //await page.click(".issue");
  // 링크를 받아서 이동한 페이지 전환
  //await page.goto(data.link);

  // 브라우저 닫기
  //await browser.close();
}

run();
