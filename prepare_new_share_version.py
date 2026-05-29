import os
import shutil
import zipfile
import datetime
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# 定义路径
src_dir = r'f:\软考资料\202605\exam-app'
date_str = datetime.datetime.now().strftime("%Y%m%d_%H%M")
dist_dir = rf'f:\软考资料\202605\exam_app_share_{date_str}'
zip_path = rf'f:\软考资料\202605\软考系统_纯净Excel升级版_{date_str}.zip'

if os.path.exists(dist_dir):
    shutil.rmtree(dist_dir)
os.makedirs(dist_dir)

# 核心需要分享的文件列表
core_files = [
    'index.html',
    'app.js',
    'data.js',
    'styles.css',
    'image-styles.css',
    'xlsx.full.min.js',
    'questions_bank.xlsx',
    '无Python环境双击启动.exe',
    '双击启动直接做题.bat',
    'manifest.json',
    'sw.js'
]

print("正在复制核心文件...")
for item in core_files:
    item_path = os.path.join(src_dir, item)
    if os.path.exists(item_path):
        shutil.copy2(item_path, dist_dir)
        print(f" -> 已复制: {item}")
    else:
        print(f" -> (跳过) 未找到: {item}")

# 复制 images 文件夹中的所有文件
print("\n正在复制图片资源...")
img_src_dir = os.path.join(src_dir, 'images')
img_dst_dir = os.path.join(dist_dir, 'images')
if os.path.exists(img_src_dir):
    os.makedirs(img_dst_dir)
    img_count = 0
    for root, dirs, files in os.walk(img_src_dir):
        for f in files:
            shutil.copy2(os.path.join(root, f), img_dst_dir)
            img_count += 1
    print(f" -> 已复制 {img_count} 张图片")

# 打包文件
print(f"\n正在压缩为 zip: {zip_path}")
def zip_folder(folder_path, output_path):
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, folder_path)
                zipf.write(abs_path, rel_path)

zip_folder(dist_dir, zip_path)

# 清理临时文件夹
shutil.rmtree(dist_dir)

print(f"\n====================================")
print(f"一键打包完成！这是全新升级的 Excel 直接读取版本。")
print(f"生成的分享文件：{zip_path}")
print(f"文件大小约为：{os.path.getsize(zip_path) / (1024*1024):.2f} MB")
print(f"====================================")
