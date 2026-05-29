# -*- coding: utf-8 -*-
import zipfile
import os
import glob

def create_zip():
    zip_name = '软考练题应用.zip'
    base_dir = os.getcwd()
    zip_path = os.path.join(base_dir, zip_name)
    
    # 核心运行文件
    essential_files = [
        'index.html',
        'styles.css',
        'data.js'
    ]
    
    # 所有的章节题库
    question_files = glob.glob('ocr_questions_ch*.js')
    # 排除备份和清理文件
    question_files = [f for f in question_files if not f.endswith('_cleaned.js') and not f.endswith('_new.js')]
    
    # 图片资源
    image_files = []
    if os.path.exists('images'):
        for root, dirs, files in os.walk('images'):
            for file in files:
                image_files.append(os.path.join(root, file))

    all_files = essential_files + question_files + image_files
    
    print(f"准备打包文件，共计 {len(all_files)} 个项目...")
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in all_files:
            if os.path.exists(file):
                zipf.write(file, file)
                print(f"  + {file}")
    
    print(f"\n✅ 打包成功！")
    print(f"文件名: {zip_name}")
    print(f"大小: {os.path.getsize(zip_path) / 1024 / 1024:.2f} MB")

if __name__ == '__main__':
    create_zip()
