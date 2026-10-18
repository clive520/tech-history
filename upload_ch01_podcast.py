#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
臺灣史專案 - 第 01 章 YouTube 官方 Data API v3 自動化發布與排程器 (Podcast 專題影片版)
"""

import os
import sys
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

BASE_DIR = Path(__file__).parent.resolve()
TAIWAN_DIR = BASE_DIR / "臺灣史"
sys.path.append(str(TAIWAN_DIR / "00_專案計畫與規範"))

from youtube_api_uploader import get_authenticated_service, upload_video

def main():
    ch01_dir = TAIWAN_DIR / "01_史前文明與南島之源"
    video_path = ch01_dir / "第01章_黑潮上的遠古足跡_深度對談播客.mp4"
    thumbnail_path = TAIWAN_DIR / "assets" / "images" / "ch01" / "ch01_hero_banner.jpg"
    desc_file = ch01_dir / "ch01_podcast_desc.txt"

    title = "【臺灣史 PODCAST EP01】黑潮上的遠古足跡：長濱文化與左鎮人（23分鐘雙人深度對談）"

    with open(desc_file, "r", encoding="utf-8") as f:
        description = f.read()

    tags = [
        "臺灣史", "台灣史", "Podcast", "播客", "舊石器時代", "長濱文化",
        "八仙洞", "左鎮人", "菜寮溪", "黑潮", "歷史科普", "NotebookLM"
    ]

    print("\n" + "=" * 70)
    print("🎙️ 啟動【臺灣史】第 01 章 YouTube PODCAST 專題影片發布管線")
    print("=" * 70)
    print(f"🎬 影片檔案：{video_path.name}")
    print(f"🖼️ 高清縮圖：{thumbnail_path.name}")
    print(f"⏰ 排程發布：2026-10-26 19:30 (臺灣時間 UTC+8)")
    print(f"📂 播放清單：台灣史")
    print("=" * 70 + "\n")

    # 1. 取得 YouTube 官方 API 服務
    youtube = get_authenticated_service()

    # 2. 執行影片上傳、排程、縮圖與播放清單歸類
    video_id = upload_video(
        youtube=youtube,
        video_file=video_path,
        title=title,
        description=description,
        tags=tags,
        schedule_str="2026-10-26 19:30",
        thumbnail_file=thumbnail_path,
        playlist_name="台灣史"
    )

    print("\n" + "=" * 70)
    print("🎉 【第 01 章 PODCAST 影片發布成功】")
    print(f"🔗 影片網址: https://youtu.be/{video_id}")
    print("=" * 70 + "\n")

if __name__ == "__main__":
    main()
