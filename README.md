# 📦 Vue3-BigEventAdmin（管理後台示例）
## 📍 專案在線預覽

🔗 https://emmamaim.github.io/Vue3-BigEventAdmin/

🔐 測試帳號
```
帳號：emma123
密碼：123321
```
📌 可自行註冊帳號後登入，體驗完整功能流程。

📌 API 感謝「黑馬前端」提供支援。

📌 注意： API 需真實後端支援，如遇接口錯誤請確認對應 API 是否可用。

## 🧠 專案簡介

Vue3-BigEventAdmin 是一個基於 Vue 3 + Vite + Pinia + Element Plus 的管理後台示例專案，包含登入 / 註冊、文章分類管理、文章管理（富文本編輯）、上傳圖片、個人資料管理、修改密碼和權限控制與狀態持久化的功能。


## ⚙️ 技術棧（Tech Stack）

Vue 3 — Composition API

Vite — 打包工具

Pinia — 全局狀態管理

Vue Router — 路由管理（使用 Hash 模式部署）

Element Plus — UI 元件庫

Axios（request 封裝） — API 請求層

@vueup/vue-quill — 富文本編輯器

GitHub Pages — 靜態部署

## 🧩 核心架構設計（Architecture）
### 1️⃣ API 請求抽象

所有 API 請求集中於 src/api/ 目錄

使用封裝的 axios 實例統一處理 baseURL、錯誤統一攔截

### 2️⃣ 全局狀態管理（Pinia）
stores/ </br>
├── user.js  
├── ...其他模塊

user 模塊管理 token、個人信息

支援持久化儲存 + 重新拉取資料

### 3️⃣ 路由導航與權限

使用 Hash 模式 (createWebHashHistory())
避免部署到 GitHub Pages 時刷新 404

登入成功後 token 驗證 + 路由守衛

## 🧠 核心功能模塊（Core Features）
### 1. Auth Module 登入 / 註冊
- 同頁提供「登入 / 註冊」切換
- 帳號 + 密碼表單校驗（必填、格式限制）
- 登入成功後寫入 Token（Pinia 持久化），並透過路由守衛限制未登入訪問

### 2. Layout & Navigation 佈局與導航
- 後台整體 Layout 容器：側邊欄選單 + Header + 內容區
- 子路由切換對應功能頁（文章 / 用戶模組） 

### 3. Article Channel 分類管理（Table + Form）
- 分類列表：表格展示（Table）
- 新增 / 編輯分類：表單彈層（常見為 Dialog/Drawer 類交互）
- 表單校驗 + CRUD 操作（新增、修改、刪除）

### 4. Article Manage 文章管理（篩選表單 + 表格 + 抽屜）
- 搜尋/篩選區：表單（Form）組合條件查詢
- 文章列表：表格（Table）展示 + 常見分頁/操作列
- 新增/編輯文章：抽屜（Drawer）承載完整表單流程（更貼近企業後台交互）

### 5. Rich Text Editor 文本編輯器（Quill）
- 文章內容編輯使用 Quill 編輯器（@vueup/vue-quill）
- 支援富文本輸入（段落、粗體、列表等），並與表單資料提交整合

### 6. Image Upload 圖片上傳（封面 / 頭像）
- 文章封面 / 用戶頭像支援上傳與預覽
- 上傳後提交更新，並同步狀態/畫面

### 7. User Profile 個人資訊（Form Validation）
- 個人資料表單：登入名稱只讀、暱稱/信箱可編輯
- Element Plus 表單校驗（必填、格式、長度）
- 更新成功後同步刷新用戶資料（Pinia / 表單資料同步）

### 8. Change Password 修改密碼（自訂校驗）
- 原密碼 / 新密碼 / 確認密碼三欄位校驗
- 自訂規則：新密碼不可與原密碼相同、確認密碼需一致

## 🧪 專案快速啟動（本地開發）
pnpm install
pnpm dev

## 📦 專案構建與部署
🛠️ 打包至生產
pnpm run build

🚀 部署到 GitHub Pages
pnpm run deploy

已配置 .nojekyll 並且使用 Hash 路由以避免資源 404 / 子路由刷新 404。

## 🧩 注意事項

如果接口返回 404 / api 打不開，請確認對應後端是否能用 HTTPS 或開啟代理

Hash 模式用於靜態托管（GitHub Pages）避免刷新路由 404

多數錯誤（Mixed Content / 404 / token 無效）屬瀏覽器安全 / 靜態部署環境限制

## 🧑‍💻 作者

Emma-Mai

GitHub：https://github.com/emmamaim

## 📄 LICENSE

此專案遵循 MIT License。
