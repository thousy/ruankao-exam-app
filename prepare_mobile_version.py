import os
import shutil
import re
import sys

# 修复 Windows 控制台下的编码问题
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# 路径设置
src_dir = r'f:\软考资料\202605\exam-app'
dist_dir = r'f:\软考资料\202605\exam-app\mobile_dist'

# 1. 扫描并复制核心文件 (参考之前的 prepare_share_version.py)
core_extensions = ('.html', '.js', '.css')
image_dir = os.path.join(src_dir, 'images')
target_image_dir = os.path.join(dist_dir, 'images')

if not os.path.exists(target_image_dir):
    os.makedirs(target_image_dir)

# 复制所有 JS, CSS, HTML (跳过已分离的 app.js)
for item in os.listdir(src_dir):
    if item.endswith(core_extensions):
        if 'prepare' not in item and 'generate' not in item and item != 'app.js':
            shutil.copy2(os.path.join(src_dir, item), dist_dir)
        elif item == 'app.js':
            print(f"跳过 {item}：该文件已进入版本分离模式，手动维护移动端逻辑。")

# 复制所有图片 (为了简单起见，全部复制到 mobile 目录)
if os.path.exists(image_dir):
    for img in os.listdir(image_dir):
        shutil.copy2(os.path.join(image_dir, img), target_image_dir)

# 2. 修改 index.html 以支持 PWA 和 安卓优化
index_path = os.path.join(dist_dir, 'index.html')

# 由于原始文件可能不是 UTF-8，我们尝试多种编码读取
content = None
chosen_encoding = 'utf-8'
for enc in ['utf-8', 'gbk', 'gb18030', 'latin-1']:
    try:
        with open(index_path, 'r', encoding=enc) as f:
            content = f.read()
            chosen_encoding = enc
            break
    except:
        continue

if content:
    # 注入 Manifest
    if '<link rel="manifest"' not in content:
        content = content.replace('</head>', '    <link rel="manifest" href="manifest.json">\n    <meta name="theme-color" content="#4e73df">\n</head>')
    
    # 注入 Service Worker 注册代码
    sw_script = """
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registered!', reg))
            .catch(err => console.log('SW failed!', err));
        });
      }
    </script>
    """
    if 'sw.js' not in content:
        content = content.replace('</body>', f'{sw_script}\n</body>')
    
    # 写回文件
    with open(index_path, 'w', encoding='utf-8') as f: # 统一转为 utf-8 以免兼容问题
        f.write(content)

print("移动端项目包准备就绪：f:\软考资料\202605\exam-app\mobile_dist")
print("下一步：使用 Website 2 APK Builder 转换该目录为 APK。")
