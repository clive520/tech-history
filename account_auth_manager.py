#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
帳號授權總管 (Account Auth Manager)
涵蓋三項服務授權：
1. Google NotebookLM (nlm CLI + MCP)
2. YouTube Data API v3 (Google Cloud OAuth 2.0 官方上傳管道)
3. GitHub CLI (gh auth)
"""

import os
import sys
import subprocess
import time
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

BASE_DIR = Path(__file__).parent.resolve()
TAIWAN_DIR = BASE_DIR / "臺灣史"
GET_TOKEN_SCRIPT = TAIWAN_DIR / "00_專案計畫與規範" / "get_youtube_token.py"
NLM_EXE = r"C:\Users\admin\AppData\Local\hermes\hermes-agent\venv\Scripts\nlm.exe"
PYTHON_EXE = sys.executable

def banner():
    print("\n" + "=" * 70)
    print("   🚀 科技歷史與臺灣史專案 - 雲端服務授權登入中心")
    print("   目標帳號：clive520@gmail.com")
    print("=" * 70)

def check_all_status():
    print("\n🔍 正在檢查各項服務授權狀態...")
    print("-" * 70)

    # 1. NotebookLM
    print("【1. Google NotebookLM (nlm CLI / MCP)】")
    try:
        res = subprocess.run([NLM_EXE, "login", "--check"], capture_output=True, text=True, encoding="utf-8")
        if res.returncode == 0:
            print("   ✅ 已成功授權登入 NotebookLM！(Profile: default, clive520@gmail.com)")
        else:
            print("   ❌ 尚未完成授權（需登入 clive520@gmail.com）")
    except Exception as e:
        print(f"   ⚠️ 檢查失敗：{e}")

    # 2. YouTube Data API v3
    print("\n【2. YouTube Data API v3 (Google Cloud OAuth 2.0)】")
    token_file = TAIWAN_DIR / "youtube_token.json"
    if not token_file.exists():
        token_file = TAIWAN_DIR / "00_專案計畫與規範" / "youtube_token.json"
    if not token_file.exists():
        token_file = Path(r"G:\共用雲端硬碟\志賢個人資料\Antigravity\music_suno\youtube_token.json")

    if token_file.exists():
        try:
            from google.oauth2.credentials import Credentials
            from google.auth.transport.requests import Request
            import googleapiclient.discovery

            scopes = [
                "https://www.googleapis.com/auth/youtube.upload",
                "https://www.googleapis.com/auth/youtube.force-ssl"
            ]
            creds = Credentials.from_authorized_user_file(str(token_file), scopes)
            if creds.expired and creds.refresh_token:
                creds.refresh(Request())

            youtube = googleapiclient.discovery.build("youtube", "v3", credentials=creds)
            res = youtube.channels().list(part="snippet", mine=True).execute()
            if res.get("items"):
                ch_name = res["items"][0]["snippet"]["title"]
                print(f"   ✅ 已成功授權連線 YouTube 官方 API！頻道：【{ch_name}】")
            else:
                print("   ✅ 已成功授權連線 YouTube 官方 API！")
        except Exception as e:
            print(f"   ⚠️ 授權 Token 需重新整理或重取：{e}")
    else:
        print("   ❌ 尚未取得 youtube_token.json，請執行選項 [3] 進行授權。")

    # 3. GitHub
    print("\n【3. GitHub CLI (gh)】")
    try:
        res = subprocess.run(["gh", "auth", "status"], capture_output=True, text=True, encoding="utf-8")
        output = res.stdout + res.stderr
        for line in output.splitlines():
            if "Logged in to" in line or "Active account" in line or "Token scopes" in line:
                print(f"   ℹ️ {line.strip()}")
    except Exception as e:
        print(f"   ⚠️ 檢查失敗：{e}")

    print("-" * 70 + "\n")

def auth_notebooklm():
    print("\n" + "=" * 70)
    print("📘 [1/3] 啟動 Google NotebookLM 授權精靈...")
    print("=" * 70)
    print("💡 系統已自動配置為使用 Microsoft Edge 視窗（避開 Google 自動化阻擋）")
    print("👉 請在彈出的瀏覽器視窗中：")
    print("   1. 登入您的 Google 帳號：clive520@gmail.com")
    print("   2. 登入成功並進入 NotebookLM 首頁後，系統會自動捕捉 Session 憑證並關閉視窗")
    print("=" * 70 + "\n")
    try:
        subprocess.run([NLM_EXE, "login", "--storage", "file"], check=False)
        print("\n驗證 NotebookLM 授權狀態：")
        subprocess.run([NLM_EXE, "login", "--check"], check=False)
    except Exception as e:
        print(f"❌ 執行失敗：{e}")

def auth_youtube():
    print("\n" + "=" * 70)
    print("🎬 [2/3] 啟動 YouTube 官方 API 授權精靈 (Google Cloud OAuth 2.0)...")
    print("=" * 70)
    print("👉 專案 ID: youtube-txt-448903")
    print("👉 用戶端 ID: 371441595654-0khfop7jc907eq8npff9tq0lt2dea21v.apps.googleusercontent.com")
    print("👉 請在即將開啟的瀏覽器視窗中登入 clive520@gmail.com 並點選允許。")
    print("👉 授權成功後，憑證將自動保存至 youtube_token.json，未來影片排程、字幕、縮圖全自動！")
    print("=" * 70 + "\n")
    try:
        subprocess.run([PYTHON_EXE, str(GET_TOKEN_SCRIPT)], check=False)
    except Exception as e:
        print(f"❌ 執行失敗：{e}")

def auth_github():
    print("\n" + "=" * 70)
    print("🐙 [3/3] 啟動 GitHub 授權精靈...")
    print("=" * 70)
    print("👉 系統即將透過 Web 瀏覽器進行 GitHub 授權。")
    print("👉 請在即將開啟的 GitHub 頁面確認授權帳號（clive520 / clive520@gmail.com）。")
    print("=" * 70 + "\n")
    try:
        subprocess.run(["gh", "auth", "login", "--web", "-h", "github.com"], check=False)
        print("\n驗證 GitHub 授權狀態：")
        subprocess.run(["gh", "auth", "status"], check=False)
    except Exception as e:
        print(f"❌ 執行失敗：{e}")

def run_all_sequentially():
    banner()
    print("即將依序進行三項授權：")
    print("1. Google NotebookLM")
    print("2. YouTube 官方 API")
    print("3. GitHub")
    print("\n請按 Enter 鍵開始第 1 項授權：Google NotebookLM...")
    input()
    auth_notebooklm()

    print("\nNotebookLM 授權已告一段落。")
    print("請按 Enter 鍵繼續第 2 項授權：YouTube 官方 API...")
    input()
    auth_youtube()

    print("\nYouTube 授權已告一段落。")
    print("請按 Enter 鍵繼續第 3 項授權：GitHub...")
    input()
    auth_github()

    print("\n🎉 全部授權流程已執行完畢！正在產出最終檢查報告：")
    check_all_status()

def main():
    while True:
        banner()
        print("請選擇操作項目：")
        print("  [1] 一鍵依序授權全部 (NotebookLM -> YouTube -> GitHub) 【推薦】")
        print("  [2] 單獨授權 Google NotebookLM (nlm / MCP)")
        print("  [3] 單獨授權 YouTube 官方 API (Google Cloud OAuth 2.0)")
        print("  [4] 單獨授權 GitHub (gh auth login)")
        print("  [5] 檢視目前所有授權狀態 (Status Check)")
        print("  [0] 離開 (Exit)")
        print("-" * 70)
        choice = input("請輸入選項代號 [1/2/3/4/5/0]：").strip()

        if choice == "1":
            run_all_sequentially()
            input("\n按 Enter 返回主選單...")
        elif choice == "2":
            auth_notebooklm()
            input("\n按 Enter 返回主選單...")
        elif choice == "3":
            auth_youtube()
            input("\n按 Enter 返回主選單...")
        elif choice == "4":
            auth_github()
            input("\n按 Enter 返回主選單...")
        elif choice == "5":
            check_all_status()
            input("\n按 Enter 返回主選單...")
        elif choice == "0":
            print("\n再見！")
            break
        else:
            print("⚠️ 無效的選項，請重新輸入。")
            time.sleep(1)

if __name__ == "__main__":
    main()
