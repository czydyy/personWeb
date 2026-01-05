from sqlalchemy import Column, String, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.db.base import Base


class ProjectModel(Base):
    __tablename__ = "projects"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    tags = Column(JSON, nullable=False)  # 存储为JSON数组
    image_url = Column(String, nullable=False)
    link = Column(String, nullable=True)
    github = Column(String, nullable=True)
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "tags": self.tags,
            "imageUrl": self.image_url,
            "link": self.link,
            "github": self.github
        }