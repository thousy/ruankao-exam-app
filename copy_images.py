import shutil
import os
from pathlib import Path

# 找到brain目录下的所有可能的artifacts目录
brain_dir = Path(os.path.expanduser("~/.gemini/antigravity/brain"))

# 尝试多个可能的位置
possible_dirs = [
    brain_dir / "tempmediaStorage" / "artifacts",
    brain_dir / "tempmediaStorage",
]

# 添加所有会话目录
for session_dir in brain_dir.glob("*"):
    if session_dir.is_dir():
        possible_dirs.append(session_dir / "artifacts")

images = []
artifacts_dir = None

for dir_path in possible_dirs:
    if dir_path.exists():
        found_images = sorted(dir_path.glob("image_*.png"), key=lambda x: x.name)
        if found_images:
            images = found_images
            artifacts_dir = dir_path
            break

if artifacts_dir:
    print(f"Found artifacts in: {artifacts_dir}")
    print(f"Found {len(images)} images:")
    for img in images:
        print(f"  - {img.name} ({img.stat().st_size} bytes)")
else:
    print("No artifacts directory found")
    exit(1)

# 复制图片到目标位置
if len(images) >= 4:
    target_dir = Path("f:/软考资料/202605/exam-app/images")
    
    # 按顺序复制: 62, 65, 66, 67
    # 取最后4张图片（最新上传的）
    latest_images = images[-4:]
    
    mappings = [
        (latest_images[0], target_dir / "ch6_q62.png"),
        (latest_images[1], target_dir / "ch6_q65.png"),
        (latest_images[2], target_dir / "ch6_q66.png"),
        (latest_images[3], target_dir / "ch6_q67.png"),
    ]
    
    for src, dst in mappings:
        shutil.copy2(src, dst)
        print(f"Copied: {src.name} -> {dst.name} ({src.stat().st_size} bytes)")
    
    print("\n✅ All images copied successfully!")
else:
    print(f"\n❌ Error: Expected at least 4 images, found {len(images)}")
