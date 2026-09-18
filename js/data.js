// 科技歷史全庫主題與中繼資料
const TOPICS_DATA = [
  {
    "id": "apple-2",
    "category": "hardware",
    "categoryName": "個人電腦與計算硬體",
    "categoryFolder": "01_個人電腦與計算硬體",
    "title": "Apple II 與車庫奇蹟",
    "subtitle": "史蒂夫·沃茲尼克的電路詩篇與個人電腦的破曉",
    "era": "1976 - 1980",
    "figures": [
      "Steve Wozniak",
      "Steve Jobs"
    ],
    "breakthrough": "整合鍵盤、螢幕輸出、彩色圖形與單一主板架構的商業個人電腦",
    "status": "published",
    "youtube": "https://youtu.be/dPUvzS8mq7I",
    "file": "Apple_II_與車庫奇蹟.md"
  },
  {
    "id": "macintosh-1984",
    "category": "hardware",
    "categoryName": "個人電腦與計算硬體",
    "categoryFolder": "01_個人電腦與計算硬體",
    "title": "這場價值百萬的技術大劫案，逼賈伯斯向全世界「老大哥」宣戰！",
    "subtitle": "Macintosh 1984 與 GUI 圖形介面的破曉誕生",
    "era": "1979 - 1984",
    "figures": [
      "Steve Jobs",
      "Jef Raskin",
      "Bill Atkinson",
      "Andy Hertzfeld",
      "Burrell Smith",
      "Ridley Scott"
    ],
    "breakthrough": "將全錄 PARC 的圖形介面與滑鼠平民化，催生下拉選單、重疊視窗與震撼超級盃的《1984》宣言",
    "status": "published",
    "youtube": "https://youtu.be/ObeXPlunpjA",
    "file": "Macintosh_1984.md"
  },
  {
    "id": "ibm-pc",
    "category": "hardware",
    "categoryName": "個人電腦與計算硬體",
    "categoryFolder": "01_個人電腦與計算硬體",
    "title": "藍色巨人的世紀豪賭",
    "subtitle": "IBM 怎麼親手把自己創造的 PC 帝國，拱手送給了相容機叛徒？",
    "era": "1980 - 1987",
    "figures": [
      "Don Estridge",
      "Bill Gates",
      "Rod Canion",
      "Tim Paterson"
    ],
    "breakthrough": "採用貨架現成零件開放標準打造 PC 5150，卻因非獨家 DOS 與乾淨室逆向 BIOS，親手將 PC 帝國拱手奉送給相容機大軍",
    "status": "published",
    "youtube": "https://youtu.be/CvvJ1TsjF9c",
    "file": "IBM_PC_反客為主.md"
  },
  {
    "id": "wintel-alliance",
    "category": "hardware",
    "categoryName": "個人電腦與計算硬體",
    "categoryFolder": "01_個人電腦與計算硬體",
    "title": "躺著收割全球三十年！",
    "subtitle": "微軟與英特爾的「邪惡同盟」是怎麼勒索整個科技界的？",
    "era": "1981 - 2010",
    "figures": [
      "Andy Grove",
      "Bill Gates",
      "Gordon Moore",
      "Steve Ballmer"
    ],
    "breakthrough": "摩爾定律與軟體肥大定律的完美共振，「安迪給予，比爾奪走」鎖死全球 PC 產業三十年",
    "status": "published",
    "file": "Wintel_雙雄記.md"
  },
  {
    "id": "fairchild-semiconductor",
    "category": "hardware",
    "categoryName": "個人電腦與計算硬體",
    "categoryFolder": "01_個人電腦與計算硬體",
    "title": "八個天才的「叛逃」之約",
    "subtitle": "一張五美元鈔票，如何砸開了整個矽谷半導體的黃金時代？",
    "era": "1955 - 1970",
    "figures": [
      "William Shockley",
      "Robert Noyce",
      "Gordon Moore"
    ],
    "breakthrough": "平面工藝發明與積體電路商業化，誕生現代半導體產業群",
    "status": "planned",
    "file": "電晶體與矽谷黎明.md"
  },
  {
    "id": "gpu-nvidia",
    "category": "hardware",
    "categoryName": "個人電腦與計算硬體",
    "categoryFolder": "01_個人電腦與計算硬體",
    "title": "GPU 崛起與光影革命",
    "subtitle": "從 3Dfx Voodoo 巫毒卡到 NVIDIA 的運算帝國",
    "era": "1995 - 至今",
    "figures": [
      "Jensen Huang (黃仁勳)",
      "Scott Sellers"
    ],
    "breakthrough": "定義 GPU（圖形處理器）概念，從 3D 遊戲加速走向平行運算與 AI 世界心臟",
    "status": "planned",
    "file": "GPU_崛起與光影革命.md"
  },
  {
    "id": "thinkpad-yamato",
    "category": "hardware",
    "categoryName": "個人電腦與計算硬體",
    "categoryFolder": "01_個人電腦與計算硬體",
    "title": "ThinkPad 黑盒子傳奇",
    "subtitle": "日本大和實驗室精工、小紅點與商務筆電之王",
    "era": "1992 - 2005",
    "figures": [
      "Arimasa Naitoh (內藤在正)",
      "Richard Sapper"
    ],
    "breakthrough": "日式松花堂便當盒靈感、TrackPoint 紅點游標與航太級堅固設計",
    "status": "planned",
    "file": "ThinkPad_黑盒子傳奇.md"
  },
  {
    "id": "iphone-2007",
    "category": "hardware",
    "categoryName": "個人電腦與計算硬體",
    "categoryFolder": "01_個人電腦與計算硬體",
    "title": "發表會前一秒隨時會當機！",
    "subtitle": "2007 年賈伯斯那場差點翻車的世紀大騙局，如何一夜埋葬諾基亞？",
    "era": "2005 - 2008",
    "figures": [
      "Steve Jobs",
      "Scott Forstall",
      "Jony Ive",
      "Tony Fadell",
      "Andy Grignon"
    ],
    "breakthrough": "電容式多點觸控、慣性滾動與行動 Safari 完整網路體驗，以一場走鋼索般的世紀發表會顛覆手機產業",
    "status": "published",
    "youtube": "https://youtu.be/1uxODV_e4Bg",
    "file": "智慧型手機奇異點_iPhone.md"
  },
  {
    "id": "mp3-revolution",
    "category": "media",
    "categoryName": "數位媒體、編碼與娛樂變革",
    "categoryFolder": "02_數位媒體與編碼",
    "title": "MP3 音訊革命",
    "subtitle": "德國實驗室的聲學心理學、Napster 盜版浪潮與 iPod 救贖",
    "era": "1987 - 2001",
    "figures": [
      "Karlheinz Brandenburg",
      "Shawn Fanning",
      "Steve Jobs"
    ],
    "breakthrough": "聲學心理學心理聽覺遮蔽效應，將 CD 音樂壓縮至 1/10 體積",
    "status": "published",
    "youtube": "https://youtu.be/w4vKBO5K-cY",
    "file": "MP3_音訊革命.md"
  },
  {
    "id": "jpeg-png",
    "category": "media",
    "categoryName": "數位媒體、編碼與娛樂變革",
    "categoryFolder": "02_數位媒體與編碼",
    "title": "JPEG 與 PNG 的誕生",
    "subtitle": "讓網際網路看得見的影像壓縮與專利防禦戰",
    "era": "1991 - 1996",
    "figures": [
      "Thomas Richter",
      "Lee Daniel Crocker"
    ],
    "breakthrough": "離散餘弦變換（DCT）與無失真開源格式對抗 Unisys GIF 專利收費",
    "status": "planned",
    "file": "JPEG_與_PNG_的誕生.md"
  },
  {
    "id": "flash-rise-fall",
    "category": "media",
    "categoryName": "數位媒體、編碼與娛樂變革",
    "categoryFolder": "02_數位媒體與編碼",
    "title": "Flash 興衰錄",
    "subtitle": "向量動畫、網頁小遊戲狂歡與賈伯斯的一紙討伐文",
    "era": "1996 - 2020",
    "figures": [
      "Jonathan Gay",
      "Charlie Jackson",
      "Steve Jobs",
      "Shantanu Narayen"
    ],
    "breakthrough": "以向量幾何動態運算與外掛架構定義早年 Web 互動娛樂，後因封閉、耗能與安全問題遭賈伯斯公開信審判走向終結",
    "status": "published",
    "file": "Flash_興衰錄.md",
    "youtube": "https://youtu.be/gjy-fftxaeA"
  },
  {
    "id": "streaming-netflix",
    "category": "media",
    "categoryName": "數位媒體、編碼與娛樂變革",
    "categoryFolder": "02_數位媒體與編碼",
    "title": "串流媒體先驅",
    "subtitle": "RealPlayer 的掙扎與 Netflix 郵寄 DVD 到雲端串流逆襲",
    "era": "1995 - 2015",
    "figures": [
      "Rob Glaser",
      "Reed Hastings"
    ],
    "breakthrough": "邊下載邊緩衝播放，徹底改寫好萊塢與影音出租巨頭命運",
    "status": "planned",
    "file": "串流媒體先驅.md"
  },
  {
    "id": "cdrom-multimedia",
    "category": "media",
    "categoryName": "數位媒體、編碼與娛樂變革",
    "categoryFolder": "02_數位媒體與編碼",
    "title": "CD-ROM 與多媒體風暴",
    "subtitle": "從《毀滅戰士》到光碟百科全書，重塑軟體載體",
    "era": "1985 - 1998",
    "figures": [
      "John Carmack",
      "Norio Ohga"
    ],
    "breakthrough": "從 1.44MB 磁碟片躍升至 650MB 大容量，解鎖全動態影像與音效",
    "status": "planned",
    "file": "CDROM_與多媒體風暴.md"
  },
  {
    "id": "h264-format-war",
    "category": "media",
    "categoryName": "數位媒體、編碼與娛樂變革",
    "categoryFolder": "02_數位媒體與編碼",
    "title": "H.264 與高畫質影音",
    "subtitle": "藍光 vs HD DVD 世紀大戰與串流編碼統一",
    "era": "2003 - 2012",
    "figures": [
      "Thomas Wiegand",
      "Gary Sullivan"
    ],
    "breakthrough": "極致高效的運動補償與整數變換，成為全球高畫質影音統治級標準",
    "status": "planned",
    "file": "H264_與高畫質影音.md"
  },
  {
    "id": "gmail-1gb",
    "category": "cloud",
    "categoryName": "網際網路服務、搜尋與雲端生態",
    "categoryFolder": "03_網際網路與雲端服務",
    "title": "當全世界都以為是愚人節惡作劇！",
    "subtitle": "Google 如何用「1GB 永久免費」與 Ajax 撕開微軟與雅虎的鐵幕？",
    "era": "2001 - 2004",
    "figures": [
      "Paul Buchheit",
      "Larry Page",
      "Sergey Brin",
      "Sundar Pichai"
    ],
    "breakthrough": "突破 2MB/5MB 信箱枷鎖，免重新整理頁面體驗定義 Web 2.0",
    "status": "published",
    "youtube": "https://youtu.be/RyslEz2WRf4",
    "file": "Gmail_誕生記.md"
  },
  {
    "id": "google-maps",
    "category": "cloud",
    "categoryName": "網際網路服務、搜尋與雲端生態",
    "categoryFolder": "03_網際網路與雲端服務",
    "title": "不用再盯著紙本地圖迷路！",
    "subtitle": "Google 怎麼把 CIA 的衛星黑科技，變成了人手一張的上帝視角？",
    "era": "2003 - 2007",
    "figures": [
      "Lars Rasmussen",
      "Jens Rasmussen",
      "John Hanke"
    ],
    "breakthrough": "切片圖資（Map Tiles）無縫拖曳技術與全方位衛星 3D 視覺化",
    "status": "planned",
    "file": "Google_Maps_前世今生.md"
  },
  {
    "id": "www-berners-lee",
    "category": "cloud",
    "categoryName": "網際網路服務、搜尋與雲端生態",
    "categoryFolder": "03_網際網路與雲端服務",
    "title": "全球資訊網（WWW）誕生",
    "subtitle": "提姆·柏內茲-李在 CERN 的一念之仁與無私開源",
    "era": "1989 - 1993",
    "figures": [
      "Tim Berners-Lee",
      "Robert Cailliau"
    ],
    "breakthrough": "HTTP + HTML + URL 三位一體，並將網頁技術永久無償捐贈人類",
    "status": "planned",
    "file": "全球資訊網_WWW_誕生.md"
  },
  {
    "id": "search-engines",
    "category": "cloud",
    "categoryName": "網際網路服務、搜尋與雲端生態",
    "categoryFolder": "03_網際網路與雲端服務",
    "title": "原本只是兩個史丹佛學生的破爛伺服器！",
    "subtitle": "PageRank 演算法是怎麼把雅虎的人工分類徹底掃進垃圾堆？",
    "era": "1994 - 2002",
    "figures": [
      "Jerry Yang (楊致遠)",
      "Larry Page",
      "Sergey Brin"
    ],
    "breakthrough": "將學術論文引文概念引入超連結網頁評分，顛覆傳統關鍵字搜尋",
    "status": "planned",
    "file": "搜尋引擎演進史.md"
  },
  {
    "id": "wikipedia-miracle",
    "category": "cloud",
    "categoryName": "網際網路服務、搜尋與雲端生態",
    "categoryFolder": "03_網際網路與雲端服務",
    "title": "維基百科的奇蹟",
    "subtitle": "吉米·威爾斯、集體智慧與大英百科全書神話破滅",
    "era": "2000 - 2006",
    "figures": [
      "Jimmy Wales",
      "Larry Sanger"
    ],
    "breakthrough": "任何人皆可自由編輯的眾包知識庫，擊敗百年權威百科全書模式",
    "status": "planned",
    "file": "維基百科的奇蹟.md"
  },
  {
    "id": "amazon-aws",
    "category": "cloud",
    "categoryName": "網際網路服務、搜尋與雲端生態",
    "categoryFolder": "03_網際網路與雲端服務",
    "title": "Amazon AWS 雲端帝國",
    "subtitle": "貝佐斯的「API 聖旨」如何意外催生現代雲端運算",
    "era": "2002 - 2008",
    "figures": [
      "Jeff Bezos",
      "Andy Jassy",
      "Werner Vogels"
    ],
    "breakthrough": "將多餘伺服器運算力商品化（S3 / EC2），開啟基礎設施即服務（IaaS）時代",
    "status": "planned",
    "file": "Amazon_AWS_雲端帝國.md"
  },
  {
    "id": "instant-messaging",
    "category": "cloud",
    "categoryName": "網際網路服務、搜尋與雲端生態",
    "categoryFolder": "03_網際網路與雲端服務",
    "title": "「喔噢！」那個一響起就讓人心跳加速的提示音",
    "subtitle": "ICQ 與 MSN 到底是如何偷走一整代人的青春？",
    "era": "1996 - 2010",
    "figures": [
      "Yair Goldfinger",
      "Arik Vardi"
    ],
    "breakthrough": "在線狀態偵測（Presence）與點對點文字傳輸，取代電子郵件成為即時互動首選",
    "status": "planned",
    "file": "即時通訊演變史.md"
  },
  {
    "id": "windows-95",
    "category": "os",
    "categoryName": "作業系統、平台與基礎軟體",
    "categoryFolder": "04_作業系統與基礎軟體",
    "title": "披星戴月排隊只為買一張軟體光碟？",
    "subtitle": "Windows 95 發售那一天，比爾蓋茲究竟給全世界灌了什麼迷魂湯？",
    "era": "1993 - 1995",
    "figures": [
      "Bill Gates",
      "Brad Silverberg"
    ],
    "breakthrough": "32位元搶佔式多工、隨插即用（Plug and Play）與奠定現代桌面 UI",
    "status": "published",
    "youtube": "https://youtu.be/V36PK1muJaM",
    "file": "Windows_95_狂潮.md"
  },
  {
    "id": "unix-philosophy",
    "category": "os",
    "categoryName": "作業系統、平台與基礎軟體",
    "categoryFolder": "04_作業系統與基礎軟體",
    "title": "因為想在辦公室偷玩《星際旅行》遊戲",
    "subtitle": "兩個天才工程師竟然順手敲出了統治世界的現代作業系統基石？",
    "era": "1969 - 1978",
    "figures": [
      "Ken Thompson",
      "Dennis Ritchie",
      "Brian Kernighan"
    ],
    "breakthrough": "C 語言改寫核心實現跨硬體可移植性，管線（Pipeline）哲學流芳至今",
    "status": "planned",
    "file": "UNIX_傳奇.md"
  },
  {
    "id": "linux-birth",
    "category": "os",
    "categoryName": "作業系統、平台與基礎軟體",
    "categoryFolder": "04_作業系統與基礎軟體",
    "title": "一個芬蘭大學生的「業餘愛好」",
    "subtitle": "如何打碎微軟霸權、成為支撐全人類文明的開源基石？",
    "era": "1991 - 1999",
    "figures": [
      "Linus Torvalds",
      "Richard Stallman",
      "Andrew Tanenbaum"
    ],
    "breakthrough": "網際網路非中心化分散式開源協作，構築全球伺服器與超級電腦底座",
    "status": "published",
    "youtube": "https://youtu.be/dKEY9i7L_3U",
    "file": "Linux_誕生記.md"
  },
  {
    "id": "browser-war-1",
    "category": "os",
    "categoryName": "作業系統、平台與基礎軟體",
    "categoryFolder": "04_作業系統與基礎軟體",
    "title": "微軟史上最兇狠的割喉戰！",
    "subtitle": "比爾蓋茲如何用「免費綁架」絞殺網景，引發差點拆分微軟的世紀大審判？",
    "era": "1994 - 2001",
    "figures": [
      "Marc Andreessen",
      "Bill Gates"
    ],
    "breakthrough": "瀏覽器即平台的構想威脅微軟核心，催生現代反壟斷司法判例",
    "status": "published",
    "youtube": "https://youtu.be/4jmyDt-VFDY",
    "file": "第一次瀏覽器大戰.md"
  },
  {
    "id": "android-green-robot",
    "category": "os",
    "categoryName": "作業系統、平台與基礎軟體",
    "categoryFolder": "04_作業系統與基礎軟體",
    "title": "差點賣給三星卻被當場嘲笑！",
    "subtitle": "這隻原本給相機用的綠色小機器人，最後是如何統治全球數十億手機？",
    "era": "2003 - 2011",
    "figures": [
      "Andy Rubin",
      "Larry Page",
      "Eric Schmidt",
      "Steve Jobs",
      "Cher Wang"
    ],
    "breakthrough": "開放手機同盟（OHA）與完全免費開源授權，HTC G1 首發打破蘋果圍牆，締造覆蓋數十億裝置的綠色帝國",
    "status": "published",
    "youtube": "https://youtu.be/nz2-OvkUiEY",
    "file": "Android_崛起史.md"
  },
  {
    "id": "windows-xp-legacy",
    "category": "os",
    "categoryName": "作業系統、平台與基礎軟體",
    "categoryFolder": "04_作業系統與基礎軟體",
    "title": "Windows XP 與經典的代價",
    "subtitle": "極致穩定、安全中心危機與長達十餘年的退場拉鋸",
    "era": "2001 - 2014",
    "figures": [
      "Steve Ballmer",
      "Jim Allchin"
    ],
    "breakthrough": "完全淘汰 DOS 內核，NT 穩定架構走入家用主流",
    "status": "planned",
    "file": "Windows_XP_經典的代價.md"
  },
  {
    "id": "git-version-control",
    "category": "os",
    "categoryName": "作業系統、平台與基礎軟體",
    "categoryFolder": "04_作業系統與基礎軟體",
    "title": "惹毛天才是什麼下場？",
    "subtitle": "被商業公司收回免費授權後，林納斯閉關十天怒寫出拯救全世界程式設計師的 Git！",
    "era": "2005 - 2010",
    "figures": [
      "Linus Torvalds",
      "Larry McVoy",
      "Andrew Tridgell",
      "Junio Hamano"
    ],
    "breakthrough": "以 SHA-1 內容定址檔案系統與 DAG 圖形快照打造的分散式版本控制，徹底顛覆全球軟體協作範式",
    "status": "published",
    "file": "Git_與版本控制的史詩.md",
    "youtube": "https://youtu.be/zCoBBrqgFAg"
  },
  {
    "id": "geek-culture",
    "category": "culture",
    "categoryName": "科技文化、社群與黑客精神",
    "categoryFolder": "05_科技文化與黑客精神",
    "title": "從咬斷雞頭的馬戲團怪胎，到統治世界的矽谷新貴！",
    "subtitle": "「GEEK」這個標籤究竟是如何完成驚天逆襲的？",
    "era": "1970 - 2010",
    "figures": [
      "Steve Jobs",
      "Bill Gates",
      "Paul Graham"
    ],
    "breakthrough": "專注、偏執與用程式碼重構世界，讓「怪胎」轉變為科技時代的領航英雄",
    "status": "planned",
    "file": "GEEK_極客精神.md"
  },
  {
    "id": "hacker-ethic",
    "category": "culture",
    "categoryName": "科技文化、社群與黑客精神",
    "categoryFolder": "05_科技文化與黑客精神",
    "title": "一個塑膠口哨就能打垮全球電信帝國？",
    "subtitle": "盲人黑客、電話飛客與賈伯斯的第一桶金",
    "era": "1959 - 1984",
    "figures": [
      "Steve Wozniak",
      "Steve Jobs",
      "John Draper (Captain Crunch)",
      "Joe Engressia (Joybubbles)"
    ],
    "breakthrough": "「電腦是雙手可掌控的藝術」、「所有資訊應當自由」，點燃開源與個人運算火苗",
    "status": "published",
    "youtube": "https://youtu.be/Rp9drCAoesY",
    "file": "電話飛客與藍盒子.md"
  },
  {
    "id": "homebrew-club",
    "category": "culture",
    "categoryName": "科技文化、社群與黑客精神",
    "categoryFolder": "05_科技文化與黑客精神",
    "title": "自製電腦俱樂部",
    "subtitle": "Homebrew Computer Club：矽谷車庫神話的真正孵化器",
    "era": "1975 - 1980",
    "figures": [
      "Lee Felsenstein",
      "Fred Moore",
      "Steve Wozniak"
    ],
    "breakthrough": "無私分享電路圖與技術靈感，Altair 8800 與 Apple 核心皆誕生於此",
    "status": "planned",
    "file": "自製電腦俱樂部.md"
  },
  {
    "id": "cypherpunk-movement",
    "category": "culture",
    "categoryName": "科技文化、社群與黑客精神",
    "categoryFolder": "05_科技文化與黑客精神",
    "title": "被美國國防部列為「走私軍火」的代碼！",
    "subtitle": "這群密碼學瘋子抗爭了三十年，最後把世界引向了比特幣",
    "era": "1992 - 2008",
    "figures": [
      "Timothy C. May",
      "Eric Hughes",
      "Satoshi Nakamoto"
    ],
    "breakthrough": "用非對稱加密技術保障數位人權，催生去中心化加密貨幣體系",
    "status": "planned",
    "file": "Cypherpunk_密碼龐克狂潮.md"
  },
  {
    "id": "silicon-valley-garage",
    "category": "culture",
    "categoryName": "科技文化、社群與黑客精神",
    "categoryFolder": "05_科技文化與黑客精神",
    "title": "矽谷車庫文化考",
    "subtitle": "從 HP 惠普車庫、喬布斯車庫到創業符號的誕生",
    "era": "1938 - 1998",
    "figures": [
      "Bill Hewlett",
      "Dave Packard",
      "Steve Jobs"
    ],
    "breakthrough": "從簡陋克難環境中以創新打破常規，成為全世界科技創業的精神象徵",
    "status": "planned",
    "file": "矽谷車庫文化考.md"
  },
  {
    "id": "eff-digital-rights",
    "category": "culture",
    "categoryName": "科技文化、社群與黑客精神",
    "categoryFolder": "05_科技文化與黑客精神",
    "title": "「你們在我們的世界毫無主權！」",
    "subtitle": "這份深夜寫在達沃斯酒吧的獨立宣言，如何點燃了捍衛網路自由的第一把火？",
    "era": "1990 - 2000",
    "figures": [
      "John Perry Barlow",
      "Mitch Kapor",
      "John Gilmore"
    ],
    "breakthrough": "捍衛虛擬網路世界中的言論自由與隱私權免受實體政府蠻橫侵犯",
    "status": "planned",
    "file": "EFF_與數位人權.md"
  },
  {
    "id": "xerox-parc",
    "category": "business",
    "categoryName": "商業戰役、敗局與科技啟示錄",
    "categoryFolder": "06_商業戰役與科技啟示",
    "title": "親手發明了滑鼠、圖形介面與雷射印表機",
    "subtitle": "全錄高層為什麼會把整個未來像白菜一樣白白送給賈伯斯？",
    "era": "1970 - 1983",
    "figures": [
      "Alan Kay",
      "Bob Taylor",
      "Steve Jobs"
    ],
    "breakthrough": "誕生個人運算所有核心要素，卻因母公司缺乏遠見而錯失帝國版圖",
    "status": "published",
    "youtube": "https://youtu.be/kuE-sX7IhMM",
    "file": "全錄_PARC_發明了未來的悲劇天才.md"
  },
  {
    "id": "kodak-dilemma",
    "category": "business",
    "categoryName": "商業戰役、敗局與科技啟示錄",
    "categoryFolder": "06_商業戰役與科技啟示",
    "title": "柯達的數位困境",
    "subtitle": "發明了全球第一台數位相機，卻親手將自己送進墳墓",
    "era": "1975 - 2012",
    "figures": [
      "Steven Sasson"
    ],
    "breakthrough": "因膠卷膠片龐大利潤不敢擁抱親手發明的數位相機，成為創新者窘境代表教材",
    "status": "planned",
    "file": "柯達的數位困境.md"
  },
  {
    "id": "netscape-to-firefox",
    "category": "business",
    "categoryName": "商業戰役、敗局與科技啟示錄",
    "categoryFolder": "06_商業戰役與科技啟示",
    "title": "網景通訊的最後一搏",
    "subtitle": "Mozilla 鳳凰涅槃與 Firefox 的開源復仇",
    "era": "1998 - 2008",
    "figures": [
      "Brendan Eich",
      "Mitchell Baker",
      "Blake Ross"
    ],
    "breakthrough": "瀕臨滅絕之際將代碼全面開源，以輕巧高效的 Firefox 打破 IE 95% 獨佔壟斷",
    "status": "planned",
    "file": "網景通訊的最後一搏.md"
  },
  {
    "id": "nokia-symbian-collapse",
    "category": "business",
    "categoryName": "商業戰役、敗局與科技啟示錄",
    "categoryFolder": "06_商業戰役與科技啟示",
    "title": "諾基亞塞班帝國的崩塌",
    "subtitle": "智慧型手機前夜的組織自滿與燃燒的平台",
    "era": "2004 - 2013",
    "figures": [
      "Jorma Ollila",
      "Stephen Elop"
    ],
    "breakthrough": "硬體思維無法轉向軟體生態，王者在短短 5 年內失去全球手機第一寶座",
    "status": "planned",
    "file": "諾基亞塞班帝國的崩塌.md"
  },
  {
    "id": "yahoo-missed-chances",
    "category": "business",
    "categoryName": "商業戰役、敗局與科技啟示錄",
    "categoryFolder": "06_商業戰役與科技啟示",
    "title": "雅虎錯過的時代",
    "subtitle": "三次足以買下 Google、Facebook 的歷史交叉口",
    "era": "1998 - 2008",
    "figures": [
      "Jerry Yang",
      "Terry Semel"
    ],
    "breakthrough": "迷失在媒體公司與科技公司定位之間，頻繁更迭執行長終遭時代拋棄",
    "status": "planned",
    "file": "雅虎錯過的時代.md"
  },
  {
    "id": "sony-format-wars",
    "category": "business",
    "categoryName": "商業戰役、敗局與科技啟示錄",
    "categoryFolder": "06_商業戰役與科技啟示",
    "title": "被成人影業狠狠背刺？",
    "subtitle": "Sony 在錄影帶大戰輸給 VHS、又在 MP3 時代自廢武功的慘痛教訓",
    "era": "1975 - 2005",
    "figures": [
      "Akio Morita (盛田昭夫)",
      "Norio Ohga"
    ],
    "breakthrough": "極致硬體工藝遭遇封閉版權與開放數位壓縮檔案衝擊，隨身聽霸權移交 iPod",
    "status": "planned",
    "file": "Sony_格式戰爭.md"
  },
  {
    "id": "blackberry-keyboards",
    "category": "business",
    "categoryName": "商業戰役、敗局與科技啟示錄",
    "categoryFolder": "06_商業戰役與科技啟示",
    "title": "黑莓機與按鍵輓歌",
    "subtitle": "九一一事件的通訊英雄如何敗給全觸控時代",
    "era": "1999 - 2016",
    "figures": [
      "Mike Lazaridis",
      "Jim Balsillie"
    ],
    "breakthrough": "雙拇指實體全鍵盤與 BES 加密伺服器稱霸政商界，卻低估觸控螢幕消費者生態",
    "status": "planned",
    "file": "黑莓機與按鍵輓歌.md"
  },
  {
    "id": "sun-microsystems-elegy",
    "category": "business",
    "categoryName": "商業戰役、敗局與科技啟示錄",
    "categoryFolder": "06_商業戰役與科技啟示",
    "title": "太陽微系統的先知悲歌",
    "subtitle": "「網路即電腦」理念、Java 誕生與硬體巨頭的落幕",
    "era": "1982 - 2010",
    "figures": [
      "Scott McNealy",
      "Bill Joy",
      "James Gosling"
    ],
    "breakthrough": "發明 Java、NFS 與伺服器技術超前時代，卻遭遇網路泡沫與 x86 PC 伺服器夾擊",
    "status": "planned",
    "file": "太陽微系統的先知悲歌.md"
  }
];
const CATEGORIES_DATA = [
  {
    "id": "all",
    "name": "全部主題",
    "icon": "layers"
  },
  {
    "id": "hardware",
    "name": "硬體與個人電腦",
    "icon": "cpu"
  },
  {
    "id": "media",
    "name": "數位媒體與編碼",
    "icon": "disc"
  },
  {
    "id": "cloud",
    "name": "網際網路與雲端",
    "icon": "cloud"
  },
  {
    "id": "os",
    "name": "作業系統與軟體",
    "icon": "terminal"
  },
  {
    "id": "culture",
    "name": "科技文化與黑客",
    "icon": "code-2"
  },
  {
    "id": "business",
    "name": "商業戰役與啟示",
    "icon": "trending-up"
  }
];
