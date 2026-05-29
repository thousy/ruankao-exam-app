from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    # 创建蓝色背景
    img = Image.new('RGB', (size, size), color=(78, 115, 223))
    draw = ImageDraw.Draw(img)
    
    # 画一个简单的白色渐变或图标形状 (正方形中间加字母 RK - Ruan Kao)
    margin = size // 5
    draw.rectangle([margin, margin, size-margin, size-margin], outline="white", width=size//30)
    
    # 尝试写字，如果字库找不到就只画方块
    try:
        # 简单画两条线代表书本
        line_w = size // 15
        draw.line([size//3, size//3, 2*size//3, size//3], fill="white", width=line_w)
        draw.line([size//3, size//2, 2*size//3, size//2], fill="white", width=line_w)
        draw.line([size//3, 2*size//3, 2*size//3, 2*size//3], fill="white", width=line_w)
    except:
        pass
        
    img.save(filename)
    print(f"Generated {filename}")

dist_icons = r'f:\软考资料\202605\exam-app\mobile_dist\icons'
create_icon(192, os.path.join(dist_icons, 'icon-192.png'))
create_icon(512, os.path.join(dist_icons, 'icon-512.png'))
