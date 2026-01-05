from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class BlogPostBase(BaseModel):
    title: str
    excerpt: str
    content: str
    date: str
    author: str
    tags: List[str]
    coverImage: str


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    date: Optional[str] = None
    author: Optional[str] = None
    tags: Optional[List[str]] = None
    coverImage: Optional[str] = None


class BlogPost(BlogPostBase):
    id: str
    
    class Config:
        from_attributes = True


class BlogPostList(BaseModel):
    blogs: List[BlogPost]


class BlogGenerateRequest(BaseModel):
    topic: str
    style: Optional[str] = "technical"