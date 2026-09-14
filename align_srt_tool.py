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

def main():
    # 1. Read approved lines from txt
    with open(r'C:\Antigravity\科技歷史\字幕校對稿_請使用者確認.txt', 'r', encoding='utf-8-sig') as f:
        raw_lines = [l.strip() for l in f if l.strip()]

    approved_lines = []
    for l in raw_lines:
        if l.startswith('【') or l.startswith('說明：') or l.startswith('您可以直接'):
            continue
        m = re.match(r'^\d+\.\s*(.+)$', l)
        if m:
            approved_lines.append(m.group(1))

    print(f'Total approved lines: {len(approved_lines)}')

    # 2. Read whisper words
    with open(r'C:\Antigravity\科技歷史\whisper_words.json', 'r', encoding='utf-8') as f:
        whisper_words = json.load(f)

    whisper_chars = []
    whisper_char_to_word = []

    for w_idx, w in enumerate(whisper_words):
        w_text = w['word']
        for c in w_text:
            clean_c = re.sub(r'[^\w]', '', c)
            if clean_c:
                whisper_chars.append(clean_c)
                whisper_char_to_word.append(w_idx)

    whisper_full_str = ''.join(whisper_chars)

    # 3. Approved char stream and line boundaries
    approved_char_boundaries = []
    approved_chars = []
    curr_idx = 0

    for l in approved_lines:
        clean_l = re.sub(r'[^\w]', '', l)
        start_c = curr_idx
        end_c = curr_idx + len(clean_l)
        approved_char_boundaries.append((start_c, end_c))
        approved_chars.extend(list(clean_l))
        curr_idx = end_c

    approved_full_str = ''.join(approved_chars)

    # 4. Difflib matching
    matcher = difflib.SequenceMatcher(None, whisper_full_str, approved_full_str)
    blocks = matcher.get_matching_blocks()

    app_to_whisp = [None] * len(approved_full_str)
    for b in blocks:
        w_start, a_start, size = b.a, b.b, b.size
        for i in range(size):
            app_to_whisp[a_start + i] = w_start + i

    # Interpolate unmapped approved chars
    last_mapped_whisp = 0
    for i in range(len(app_to_whisp)):
        if app_to_whisp[i] is None:
            next_mapped_whisp = len(whisper_full_str) - 1
            for j in range(i + 1, len(app_to_whisp)):
                if app_to_whisp[j] is not None:
                    next_mapped_whisp = app_to_whisp[j]
                    break
            app_to_whisp[i] = min(max(last_mapped_whisp, int(round((last_mapped_whisp + next_mapped_whisp) / 2))), len(whisper_full_str) - 1)
        else:
            last_mapped_whisp = app_to_whisp[i]

    # 5. Build subtitle segments
    subtitles = []
    for l_idx, (st_c, ed_c) in enumerate(approved_char_boundaries):
        text = approved_lines[l_idx]
        if st_c == ed_c:
            continue
        w_start_idx = app_to_whisp[st_c]
        w_end_idx = app_to_whisp[min(ed_c - 1, len(app_to_whisp) - 1)]
        
        word_s_idx = whisper_char_to_word[w_start_idx]
        word_e_idx = whisper_char_to_word[w_end_idx]
        
        start_time = whisper_words[word_s_idx]['start']
        end_time = whisper_words[word_e_idx]['end']
        
        subtitles.append({
            'index': l_idx + 1,
            'start': start_time,
            'end': end_time,
            'text': text
        })

    # Post process: Monotonic timestamps and clean gap boundaries
    for i in range(len(subtitles)):
        if i > 0:
            if subtitles[i]['start'] < subtitles[i-1]['start']:
                subtitles[i]['start'] = subtitles[i-1]['start']
            if subtitles[i]['start'] < subtitles[i-1]['end']:
                # Clip previous end to not overlap
                subtitles[i-1]['end'] = subtitles[i]['start']
                # If duration became too short, nudge both
                if subtitles[i-1]['end'] - subtitles[i-1]['start'] < 0.4:
                    subtitles[i-1]['end'] = subtitles[i-1]['start'] + 0.4
                    subtitles[i]['start'] = subtitles[i-1]['end']
        if subtitles[i]['end'] <= subtitles[i]['start']:
            subtitles[i]['end'] = subtitles[i]['start'] + 1.0

    # Ensure last subtitle doesn't extend beyond audio duration
    max_duration = whisper_words[-1]['end'] + 0.5
    if subtitles[-1]['end'] > max_duration:
        subtitles[-1]['end'] = max_duration

    # Output to SRT file with UTF-8-BOM (utf-8-sig)
    srt_path = r'C:\Antigravity\科技歷史\為什麼_Napster_改變音樂：MP3革命.srt'
    with open(srt_path, 'w', encoding='utf-8-sig') as f:
        for s in subtitles:
            f.write(f"{s['index']}\n")
            f.write(f"{format_timestamp(s['start'])} --> {format_timestamp(s['end'])}\n")
            f.write(f"{s['text']}\n\n")

    print(f'Successfully generated {len(subtitles)} subtitles into {srt_path}')

if __name__ == '__main__':
    main()
