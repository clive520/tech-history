import os
import json
import re

base_dir = r"c:\Antigravity\科技歷史"
data_js_path = os.path.join(base_dir, 'js', 'data.js')

with open(data_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const TOPICS_DATA = (\[.*?\]);', content, re.DOTALL)
if match:
    topics = json.loads(match.group(1))
    updated_count = 0
    for topic in topics:
        folder = topic.get('categoryFolder', '')
        filename = topic.get('file', '')
        filepath = os.path.join(base_dir, folder, filename)
        if os.path.exists(filepath):
            file_size = os.path.getsize(filepath)
            if file_size > 300:
                if topic.get('status') != 'published':
                    topic['status'] = 'published'
                    updated_count += 1
            else:
                if topic.get('status') != 'in_progress':
                    topic['status'] = 'in_progress'
                    updated_count += 1
    
    new_topics_json = json.dumps(topics, ensure_ascii=False, indent=2)
    new_content = re.sub(r'const TOPICS_DATA = \[.*?\];', f'const TOPICS_DATA = {new_topics_json};', content, flags=re.DOTALL)
    with open(data_js_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Index sync complete. {updated_count} topic(s) status updated.")
else:
    print("Could not parse TOPICS_DATA")
