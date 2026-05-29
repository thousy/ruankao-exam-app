
import os
import re
import shutil
import zipfile
import datetime
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# 定义路径
src_dir = r'f:\软考资料\202605\exam-app'
dist_dir = r'f:\软考资料\202605\exam_app_share_temp'
date_str = datetime.datetime.now().strftime("%Y%m%d")
zip_path = rf'f:\软考资料\202605\软考系统_分享给朋友版本_{date_str}.zip'

# 1. 创建干净的目录
if os.path.exists(dist_dir):
    shutil.rmtree(dist_dir)
os.makedirs(dist_dir)

# 2. 找出所有引用的图片
used_images = set()
# 匹配模式：images/filename.png
img_pattern = re.compile(r'images/([a-zA-Z0-9_\-\.]+)')

# 遍历所有 js, html 文件进行扫描
for root, dirs, files in os.walk(src_dir):
    # 彻底过滤掉备份和导出目录，不扫描它们
    if any(x in root.lower() for x in ['backups', 'exports', '.agent', '.gemini', 'temp_']):
        continue
        
    for file in files:
        if file.endswith(('.js', '.html', '.css')):
            file_path = os.path.join(root, file)
            # 尝试几种常见的编码
            content = None
            for encoding in ['utf-8', 'gbk', 'gb2312', 'latin-1']:
                try:
                    with open(file_path, 'r', encoding=encoding) as f:
                        content = f.read()
                        break
                except:
                    continue
            
            if content:
                matches = img_pattern.findall(content)
                for match in matches:
                    # 提取纯文件名（去掉引号或多余字符）
                    img_name = match.split('\\')[0].split('"')[0].split("'")[0]
                    used_images.add(img_name)

print(f"扫描完毕，共找到 {len(used_images)} 个被引用的图片资源。")

# 3. 复制核心文件
# 只复制前端核心文件
for item in os.listdir(src_dir):
    item_path = os.path.join(src_dir, item)
    if os.path.isfile(item_path):
        # 仅包含运行 App 所需的类型
        if item.endswith(('.html', '.js', '.css')):
            # 排除清理脚本本身
            if 'prepare_share' not in item:
                shutil.copy2(item_path, dist_dir)
    elif os.path.isdir(item_path):
        if item == 'images':
            # 创建目标图片目录
            target_img_dir = os.path.join(dist_dir, 'images')
            os.makedirs(target_img_dir)
            # 仅复制脚本检测到的被引用图片
            for img_name in used_images:
                # 兼容处理（有些地方可能写了 ch6_q102 但没写 .png）
                img_src = os.path.join(item_path, img_name)
                if not os.path.exists(img_src) and not img_name.endswith('.png'):
                    img_src = img_src + '.png'
                
                if os.path.exists(img_src):
                    shutil.copy2(img_src, target_img_dir)

# 4. 打包文件
def zip_folder(folder_path, output_path):
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, folder_path)
                zipf.write(abs_path, rel_path)

zip_folder(dist_dir, zip_path)

# 5. 清理临时文件夹
shutil.rmtree(dist_dir)

print(f"一键打包完成！")
print(f"------------------------------------")
print(f"生成的分享文件：{zip_path}")
print(f"文件大小约为：{os.path.getsize(zip_path) / (1024*1024):.2f} MB")
print(f"已自动排除所有冗余图片、脚本及备份文件。")
