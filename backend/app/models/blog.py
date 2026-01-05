from sqlalchemy import Column, String, Text, JSON, DateTime
from sqlalchemy.sql import func
import uuid
from app.db.base import Base


class BlogPostModel(Base):
    __tablename__ = "blog_posts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    date = Column(String, nullable=False)  # 存储为字符串，格式如"2024年3月15日"
    author = Column(String, nullable=False)
    tags = Column(JSON, nullable=False)  # 存储为JSON数组
    cover_image = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "excerpt": self.excerpt,
            "content": self.content,
            "date": self.date,
            "author": self.author,
            "tags": self.tags,
            "coverImage": self.cover_image
        }