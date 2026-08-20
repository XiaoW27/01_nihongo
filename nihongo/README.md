# 研鑽｜N2 → N1 日文學習網站

個人使用的 JLPT N2〜N1 學習工具，包含三個功能：

- **単語（vocab.html）**：看漢字寫讀音的單字卡，共 30 個 N2〜N1 單字
- **文法（grammar.html）**：四選一文法題，共 12 題，涵蓋 4 組易混淆文法
- **読解（reading.html）**：閱讀理解，共 3 篇短文、6 道題目

## 檔案結構

```
nihongo/
├── index.html
├── vocab.html
├── grammar.html
├── reading.html
├── css/style.css
├── js/vocab.js
├── js/grammar.js
├── js/reading.js
└── data/
    ├── vocab.json
    ├── grammar.json
    └── reading.json
```

日後要新增單字、文法題、閱讀文章，只需要編輯 `data/` 裡對應的 JSON 檔案，不需要動到任何 HTML/JS 程式碼，格式請直接參考檔案中既有的項目照著寫即可。

## 部署到 GitHub Pages（免費、無需伺服器）

因為你已經有 GitHub 帳號了，以下是完整步驟：

### 1. 建立新的 Repository
1. 登入 GitHub，點右上角「+」→「New repository」
2. Repository name 填 `nihongo`（或任何你喜歡的名字）
3. 設為 **Public**（GitHub Pages 免費版需要公開 repo）
4. 不要勾選「Add a README file」（我們已經有了）
5. 點「Create repository」

### 2. 上傳檔案（不需要用指令，網頁操作即可）
1. 進入剛建立的 repository 頁面
2. 點「uploading an existing file」（或「Add file」→「Upload files」）
3. 把整個 `nihongo` 資料夾**裡面的所有檔案和資料夾**（保持原本的資料夾結構）拖曳上傳
   - 重要：要連同 `css/`、`js/`、`data/` 資料夾一起拖上去，GitHub 網頁上傳會自動保留資料夾結構
4. 下方填寫 commit message（例如「first commit」），點「Commit changes」

### 3. 開啟 GitHub Pages
1. 進入 repository 的「Settings」頁籤
2. 左側選單找到「Pages」
3. 在「Branch」選擇 `main`，資料夾選 `/ (root)`，點「Save」
4. 等待約 1-2 分鐘，重新整理頁面，上方會出現一個網址，例如：
   `https://你的帳號.github.io/nihongo/`
5. 打開這個網址，就能在手機或電腦上隨時使用你的學習網站了

### 之後要更新內容時
之後想新增單字或文法題，只要：
1. 在本機修改 `data/` 裡的 JSON 檔案
2. 回到 GitHub repository，進到 `data/` 資料夾，點要更新的檔案 → 點鉛筆圖示編輯 → 貼上新內容 → Commit changes
3. GitHub Pages 會在幾十秒內自動更新網站內容，不需要重新部署

## 之後可以擴充的方向
- 用 `localStorage` 記錄每次的答題正確率，做成學習曲線
- 幫單字卡加上「錯題複習」模式，優先複習答錯過的單字
- 文法/閱讀題庫持續往 `data/` 裡累加即可，不影響現有介面
