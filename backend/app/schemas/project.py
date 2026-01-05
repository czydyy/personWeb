from pydantic import BaseModel
from typing import Optional, List


class ProjectBase(BaseModel):
    title: str
    description: str
    content: Optional[str] = None  # 详细内容，用于详情页面
    tags: List[str]
    imageUrl: str
    link: Optional[str] = None
    github: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None
    imageUrl: Optional[str] = None
    link: Optional[str] = None
    github: Optional[str] = None


class Project(ProjectBase):
    id: str
    
    class Config:
        from_attributes = True


class ProjectList(BaseModel):
    projects: List[Project]