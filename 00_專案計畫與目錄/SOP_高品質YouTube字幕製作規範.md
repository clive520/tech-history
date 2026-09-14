# 高品質 YouTube 影音字幕製作標準作業程序 (SOP)
> **Standard Operating Procedure: High-Quality YouTube Subtitle Generation & Alignment**

---

## 一、 目的與核心原則

本標準作業程序（SOP）旨在產出**符合人類自然聽覺語感、視覺舒適、且兼具毫秒級精準時間軸**的 YouTube 專用 `.srt` 字幕檔。

### 四大核心原則：
1. **人類呼吸節奏斷句（Cadence-based Chunking）**：
   - 絕不用機械式固定字數硬切。
   - 斷句處必須符合口語呼吸節奏、語義停頓或自然語氣轉折。
   - **嚴格禁止詞彙腰斬**（例如不可出現「被法 / 院」、「破 / 壞力」、「塑膠 / 光碟」）。
2. **視覺閱讀黃金長度（8～12 字）**：
   - 單行理想字數為 **8 ～ 12 個中文字**（英文字詞以視覺寬度折合計算）。
   - 避免單句過長造成觀眾閱讀疲勞，亦避免單字/雙字零碎閃爍。
3. **人機協同校對模式（Human-in-the-Loop）**：
   - 機器負責：語音辨識（ASR）與毫秒級字詞時間戳記提取（Word-level timestamps）。
   - 人類負責：確認斷句行、審閱專業術語與修正同音錯字（校對純文字，無需處理繁瑣時間碼）。
   - 機器再對齊：根據人類最終確認的文字稿，執行強制對齊（Forced Alignment）重構時間軸。
4. **跨平台編碼防禦（UTF-8 with BOM）**：
   - 輸出統一使用 **UTF-8 with BOM (`utf-8-sig`)**，確保 Windows 記事本、剪輯軟體（Premiere / Final Cut / 剪映）以及 YouTube Studio 後台讀取皆 100% 正常，永不亂碼。

---

## 二、 完整製作流程圖

```mermaid
graph TD
    A[原始影音檔 .mp4 / .wav] --> B[階段一: Faster-Whisper 提取<br/>word_timestamps=True]
    B --> C[產生 whisper_words.json<br/>毫秒級單字時間戳]
    C --> D[階段二: 自然口語智慧分句<br/>+ 同音錯字預先校正]
    D --> E[產出: 字幕校對稿_請使用者確認.txt<br/>(純文字+編號，UTF-8-SIG)]
    E --> F[階段三: 人機協同檢視與文字微調<br/>(校對專有名詞、確認斷句)]
    F --> G[階段四: 字元級序列強制對齊<br/>(Forced Alignment)]
    G --> H[時間軸防護處理<br/>單調遞增 / 最小時長防重疊]
    H --> I[輸出最終標準字幕<br/>.srt (UTF-8 with BOM)]
```

---

## 三、 四階段執行步驟詳解

### 階段一：語音特徵提取（Word-Level Timestamps Extraction）
- **工具**：`faster-whisper`
- **模型**：`base`（快速兼顧準確）或 `medium` / `large-v3`（複雜術語或背景音樂大時）。
- **關鍵參數**：
  - `word_timestamps=True`：必須啟用，用以提取每個音節/詞彙的起始與結束時間。
  - `initial_prompt`：傳入相關領域提示詞（如影片標題、核心人物名、專有名詞），大幅降低 ASR 原始錯字率。
- **產出**：儲存為 `whisper_words.json` 作為時間軸錨點底稿。

---

### 階段二：口語節奏智慧分句與預校（Cadence Splitting & Pre-Correction）
1. **分句邊界規則**：
   - **優先依據標點與長停頓**（音訊停頓 Gap > 0.35 秒）。
   - **遇轉折連接詞切分**：當字數累積達 8 字以上，遇到「但是、可是、然後、所以、因為、而且、甚至、如果」時做斷句。
   - **長度門檻限制**：字數超過 12 字時，在最近的一個語義停頓點斷開。
2. **術語與同音錯字過濾網**：
   - 音訊常見聽打錯誤預先轉換：
     - 物理實體：`廣點` $\rightarrow$ `光碟`、`剝接` $\rightarrow$ `撥接`、`大骨` $\rightarrow$ `大鼓`。
     - 科學理論：`心理生學` $\rightarrow$ `心理聲學`、`評裕/食裕責備` $\rightarrow$ `頻域/時域遮蔽`、`絕對聽譽` $\rightarrow$ `絕對聽閾`。
     - 數位概念：`NB3` $\rightarrow$ `MP3`、`燦流` $\rightarrow$ `串流`、`華叔電集` $\rightarrow$ `滑鼠點擊`、`一見下載` $\rightarrow$ `一鍵下載`。
     - 商業法律：`飯爛` $\rightarrow$ `氾濫`、`訓話成` $\rightarrow$ `馴化成`、`持論` $\rightarrow$ `齒輪`、`法任` $\rightarrow$ `法院`。
3. **輸出校對稿**：
   - 產生 `字幕校對稿_請使用者確認.txt`，每一行標上流水號（如 `001. 歡迎來到今天的深度解析`），段落以章節大標（如 `【第一章：音樂的物理枷鎖】`）分組，方便閱讀。

---

### 階段三：人機協同校對（Human-in-the-Loop Review）
- **使用者操作**：
  - 使用者僅需檢閱文字是否符合口白原意、專有名詞是否正確、斷句處唸起來是否順暢。
  - 使用者可直接以記事本增刪字詞或調整換行，**無需關心時間碼**。
- **優勢**：
  - 傳統手動調字幕必須在剪輯軟體拉時間軸，耗費數小時；此模式將人類專注力集中於「文字品質」，將繁重的「時間對齊」完全交給演算法。

---

### 階段四：強制對齊與字幕輸出（Forced Alignment & SRT Generation）
1. **字元級序列匹配**：
   - 利用 `difflib.SequenceMatcher`（或動態規劃 LCS / DTW）將使用者確認的文字稿與原始 Whisper 音訊字詞流對齊。
   - 即使使用者修改了部分錯字或微調了句式，演算法仍能透過周圍錨點（相似度 > 90%）精準鎖定該句在音訊中的確切起訖位置。
2. **時間戳平滑防護機制**：
   - **單調遞增**：確保 $Start_i \ge Start_{i-1}$。
   - **防重疊（Overlap Prevention）**：若 $Start_i < End_{i-1}$，將前一句的結束時間自動平齊至當前句的起始時間。
   - **最小時長保證**：每句字幕顯示時間不少於 $0.4$ 秒，避免一閃而過。
   - **尾端保護**：最後一句字幕結束時間不超出音訊整體長度。
3. **標準格式輸出**：
   - 依據 SRT 標準格式：編號、`00:00:00,000 --> 00:00:00,000`、字幕文字、空行。
   - 使用 `encoding='utf-8-sig'` 寫入。

---

## 四、 核心對齊演算法參考實作

```python
import json
import re
import difflib

def format_timestamp(seconds: float) -> str:
    millis = int(round(seconds * 1000))
    hours = millis // 3600000
    millis %= 3600000
    minutes = millis // 60000
    millis %= 60000
    secs = millis // 1000
    millis %= 1000
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

def align_and_export_srt(approved_txt_path, whisper_json_path, output_srt_path):
    # 1. 讀取校對稿
    with open(approved_txt_path, 'r', encoding='utf-8-sig') as f:
        raw_lines = [l.strip() for l in f if l.strip()]

    approved_lines = []
    for l in raw_lines:
        if l.startswith('【') or l.startswith('說明') or l.startswith('您可以在'):
            continue
        m = re.match(r'^\d+\.\s*(.+)$', l)
        if m:
            approved_lines.append(m.group(1))

    # 2. 讀取 Whisper 單字級時間戳
    with open(whisper_json_path, 'r', encoding='utf-8') as f:
        whisper_words = json.load(f)

    whisper_chars, whisper_char_to_word = [], []
    for w_idx, w in enumerate(whisper_words):
        for c in w['word']:
            clean_c = re.sub(r'[^\w]', '', c)
            if clean_c:
                whisper_chars.append(clean_c)
                whisper_char_to_word.append(w_idx)

    whisper_full_str = ''.join(whisper_chars)

    # 3. 建立校對稿字元邊界
    approved_char_boundaries, approved_chars = [], []
    curr_idx = 0
    for l in approved_lines:
        clean_l = re.sub(r'[^\w]', '', l)
        st_c, ed_c = curr_idx, curr_idx + len(clean_l)
        approved_char_boundaries.append((st_c, ed_c))
        approved_chars.extend(list(clean_l))
        curr_idx = ed_c

    approved_full_str = ''.join(approved_chars)

    # 4. 序列匹配 (Sequence Matching)
    matcher = difflib.SequenceMatcher(None, whisper_full_str, approved_full_str)
    app_to_whisp = [None] * len(approved_full_str)
    for b in matcher.get_matching_blocks():
        for i in range(b.size):
            app_to_whisp[b.b + i] = b.a + i

    # 線性插值填補未直接匹配之字元
    last_val = 0
    for i in range(len(app_to_whisp)):
        if app_to_whisp[i] is None:
            next_val = len(whisper_full_str) - 1
            for j in range(i + 1, len(app_to_whisp)):
                if app_to_whisp[j] is not None:
                    next_val = app_to_whisp[j]
                    break
            app_to_whisp[i] = min(max(last_val, int(round((last_val + next_val) / 2))), len(whisper_full_str) - 1)
        else:
            last_val = app_to_whisp[i]

    # 5. 重構字幕時間軸
    subtitles = []
    for l_idx, (st_c, ed_c) in enumerate(approved_char_boundaries):
        if st_c == ed_c:
            continue
        w_start_idx = app_to_whisp[st_c]
        w_end_idx = app_to_whisp[min(ed_c - 1, len(app_to_whisp) - 1)]
        s_time = whisper_words[whisper_char_to_word[w_start_idx]]['start']
        e_time = whisper_words[whisper_char_to_word[w_end_idx]]['end']
        subtitles.append({'index': l_idx + 1, 'start': s_time, 'end': e_time, 'text': approved_lines[l_idx]})

    # 6. 時間軸防呆校正
    for i in range(len(subtitles)):
        if i > 0:
            if subtitles[i]['start'] < subtitles[i-1]['start']:
                subtitles[i]['start'] = subtitles[i-1]['start']
            if subtitles[i]['start'] < subtitles[i-1]['end']:
                subtitles[i-1]['end'] = subtitles[i]['start']
                if subtitles[i-1]['end'] - subtitles[i-1]['start'] < 0.4:
                    subtitles[i-1]['end'] = subtitles[i-1]['start'] + 0.4
                    subtitles[i]['start'] = subtitles[i-1]['end']
        if subtitles[i]['end'] <= subtitles[i]['start']:
            subtitles[i]['end'] = subtitles[i]['start'] + 1.0

    # 7. 輸出 UTF-8-BOM SRT
    with open(output_srt_path, 'w', encoding='utf-8-sig') as f:
        for s in subtitles:
            f.write(f"{s['index']}\n{format_timestamp(s['start'])} --> {format_timestamp(s['end'])}\n{s['text']}\n\n")

    print(f"成功產出 {len(subtitles)} 條字幕至 {output_srt_path}")
```

---

## 五、 品質檢核表（Checklist）

在發布字幕檔前，請依序核對以下項目：

- [ ] **斷句長度**：每行中文字數是否落在 8～12 字區間（無單行超過 16 字或低於 3 字）。
- [ ] **詞意完整**：專有名詞、成語、複合語詞是否完整保留於同一行（無跨行割裂）。
- [ ] **同音字訂正**：主題專業名詞（人名、專利、格式、公司名）是否 100% 正確。
- [ ] **時間軸流暢**：字幕出現時間是否與人物開口同步，無提早消失或延遲滯留現象。
- [ ] **編碼確認**：檔案標頭具備 UTF-8 BOM（十六進位 `EF BB BF`），記事本開啟無亂碼。
- [ ] **YouTube 上傳測試**：在 YouTube Studio 預覽播放，排版居中整齊、閱讀節奏舒暢。
