from __future__ import annotations

import json
import re
import shutil
import unicodedata
from datetime import datetime
from pathlib import Path
import sys


ROOT_DIR = Path(__file__).resolve().parent.parent
POSTS_JSON_PATH = ROOT_DIR / "public" / "data" / "posts.json"
POSTS_DIR = ROOT_DIR / "public" / "posts"
POST_IMAGES_DIR = ROOT_DIR / "public" / "images" / "posts"
TEMPLATE_PATH = ROOT_DIR / "scripts" / "templates" / "post-template.md"


def load_json(path: Path) -> list[dict]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value: list[dict]) -> None:
    path.write_text(f"{json.dumps(value, ensure_ascii=False, indent=2)}\n", encoding="utf-8")


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii").lower()
    ascii_text = re.sub(r"[^a-z0-9\s-]", "", ascii_text).strip()
    ascii_text = re.sub(r"\s+", "-", ascii_text)
    return re.sub(r"-+", "-", ascii_text)


def strip_markdown(markdown: str) -> str:
    content = re.sub(r"```[\s\S]*?```", " ", markdown)
    content = re.sub(r"`[^`]*`", " ", content)
    content = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", content)
    content = re.sub(r"\[[^\]]+\]\(([^)]+)\)", " ", content)
    content = re.sub(r"^>\s?", "", content, flags=re.MULTILINE)
    content = re.sub(r"^#{1,6}\s+", "", content, flags=re.MULTILINE)
    content = re.sub(r"^[-*+]\s+", "", content, flags=re.MULTILINE)
    content = re.sub(r"^\d+\.\s+", "", content, flags=re.MULTILINE)
    content = content.replace("|", " ")
    content = re.sub(r"[*_~>#-]", " ", content)
    return re.sub(r"\s+", " ", content).strip()


def estimate_reading_time(markdown: str) -> str:
    clean = strip_markdown(markdown)
    chinese_chars = len(re.findall(r"[\u4e00-\u9fff]", clean))
    english_text = re.sub(r"[\u4e00-\u9fff]", " ", clean)
    english_words = len([token for token in re.split(r"\s+", english_text) if token.strip()])
    minutes = max(1, int((chinese_chars / 300 + english_words / 200) + 0.9999))
    return f"{minutes} min read"


def create_placeholder_cover_svg(title: str) -> str:
    safe_title = re.sub(r'[<&>"]', "", title)
    return f"""<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" rx="48" fill="#0F172A"/>
  <circle cx="1360" cy="140" r="220" fill="#1F7CFF" fill-opacity="0.18"/>
  <circle cx="180" cy="760" r="260" fill="#FF7A59" fill-opacity="0.16"/>
  <rect x="110" y="140" width="920" height="540" rx="36" fill="white" fill-opacity="0.06"/>
  <text x="110" y="350" fill="white" font-size="88" font-family="Arial, sans-serif" font-weight="700">{safe_title}</text>
  <text x="110" y="450" fill="#BFDBFE" font-size="34" font-family="Arial, sans-serif">Personal Blog Cover</text>
  <text x="110" y="520" fill="#CBD5E1" font-size="28" font-family="Arial, sans-serif">Replace this placeholder with your final cover image.</text>
</svg>
"""


def create_placeholder_cover_file(title: str, slug: str) -> str:
    POST_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    target_name = f"{slug}.svg"
    target_path = POST_IMAGES_DIR / target_name
    target_path.write_text(create_placeholder_cover_svg(title), encoding="utf-8")
    return f"/images/posts/{target_name}"


def copy_cover_file(source_path: str, slug: str) -> str:
    source = Path(source_path).expanduser()
    if not source.is_absolute():
        source = (ROOT_DIR / source).resolve()

    if not source.exists():
        raise FileNotFoundError(f"Cover file not found: {source}")

    POST_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    extension = source.suffix.lower() or ".png"
    target_name = f"{slug}{extension}"
    target_path = POST_IMAGES_DIR / target_name
    shutil.copyfile(source, target_path)
    return f"/images/posts/{target_name}"


def create_searchable_text(post: dict, markdown: str) -> str:
    clean = strip_markdown(markdown)
    return re.sub(
        r"\s+",
        " ",
        " ".join([post["title"], post["excerpt"], " ".join(post["tags"]), clean]).strip(),
    ).strip()


def sort_posts(posts: list[dict]) -> list[dict]:
    return sorted(posts, key=lambda item: item["publishedAt"], reverse=True)


def prompt(label: str, placeholder: str = "") -> str:
    suffix = f" [{placeholder}]" if placeholder else ""
    return input(f"{label}{suffix}: ").strip()


def prompt_required(label: str) -> str:
    while True:
        value = input(f"{label}: ").strip()
        if value:
            return value
        print("这一项是必填的，请至少输入一点内容。")


def prompt_yes_no(label: str, default: bool = True) -> bool:
    hint = "Y/n" if default else "y/N"
    value = input(f"{label} [{hint}]: ").strip().lower()
    if not value:
        return default
    return value in {"y", "yes"}


def build_slug(title: str, slug_input: str) -> str:
    if slug_input:
        return slug_input

    derived_slug = slugify(title)
    if derived_slug:
        return derived_slug

    return f"post-{datetime.now().strftime('%Y%m%d%H%M%S')}"


def normalize_date(date_input: str) -> str:
    if not date_input:
        return datetime.now().astimezone().replace(microsecond=0).isoformat()

    return date_input


def main() -> int:
    posts = load_json(POSTS_JSON_PATH)
    template = TEMPLATE_PATH.read_text(encoding="utf-8")

    print("开始创建新文章。直接回车可以跳过可选项。")
    print("")

    title = prompt_required("文章标题")
    slug_input = prompt("文件名称 / slug", "留空则自动生成")
    slug = build_slug(title, slug_input)

    if any(post.get("slug") == slug for post in posts):
        print(f"已存在同名 slug：{slug}，请换一个文件名称。")
        return 1

    excerpt = prompt("文章摘要", "可留空，后续可由 sync:content 自动更新")
    tags_input = prompt("文章标签", "多个标签用英文逗号分隔")
    tags = [tag.strip() for tag in tags_input.split(",") if tag.strip()]
    date_input = prompt("发布时间", "留空则使用当前系统时间")
    published_at = normalize_date(date_input)
    cover_url = prompt("封面图 URL", "可留空")
    cover_file = prompt("本地封面图路径", "可留空")

    markdown = template.replace("{{title}}", title).replace("{{excerpt}}", excerpt)
    reading_time = estimate_reading_time(markdown)

    markdown_path = f"/posts/{slug}.md"
    markdown_file_path = POSTS_DIR / f"{slug}.md"
    POSTS_DIR.mkdir(parents=True, exist_ok=True)

    if markdown_file_path.exists():
        print(f"已存在同名 Markdown 文件：public/posts/{slug}.md，请换一个文件名称。")
        return 1

    try:
        if cover_file:
            cover = copy_cover_file(cover_file, slug)
        elif cover_url:
            cover = cover_url
        else:
            cover = create_placeholder_cover_file(title, slug)
    except FileNotFoundError as error:
        print(str(error))
        return 1

    next_id = max((int(post.get("id", 0)) for post in posts), default=0) + 1
    excerpt_value = excerpt or f"{title} 的内容摘要，记得在正文完善后执行同步脚本自动刷新摘要。"

    new_post = {
        "id": next_id,
        "slug": slug,
        "title": title,
        "excerpt": excerpt_value,
        "cover": cover,
        "tags": tags,
        "publishedAt": published_at,
        "readingTime": reading_time,
        "markdownPath": markdown_path,
        "searchableText": "",
    }
    new_post["searchableText"] = create_searchable_text(new_post, markdown)

    updated_posts = sort_posts([new_post, *posts])

    if not prompt_yes_no("确认创建这篇文章吗", default=True):
        print("已取消，本次没有写入任何文件。")
        return 0

    write_json(POSTS_JSON_PATH, updated_posts)
    markdown_file_path.write_text(markdown, encoding="utf-8")

    print("")
    print("文章已创建。")
    print(f"标题: {title}")
    print(f"Slug: {slug}")
    print(f"Markdown: public/posts/{slug}.md")
    print(f"封面: public{cover}" if cover.startswith("/") else f"封面: {cover}")
    print(f"发布时间: {published_at}")
    print(f"阅读时间: {reading_time}")
    print("")
    print("下一步建议：")
    print("1. 编辑文章 Markdown 正文")
    print("2. 运行 npm run sync:content")
    print("3. 运行 npm run build")
    return 0


if __name__ == "__main__":
    sys.exit(main())
