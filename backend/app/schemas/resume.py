from pydantic import BaseModel
from typing import List
from typing import Optional


class ExperienceItem(BaseModel):
    id: str
    company: str
    role: str
    period: str
    description: List[str]
    
    class Config:
        from_attributes = True


class SkillCategory(BaseModel):
    category: str
    items: List[str]
    
    class Config:
        from_attributes = True


class ResumeData(BaseModel):
    experience: List[ExperienceItem]
    skills: List[SkillCategory]


class ResumeUpdate(BaseModel):
    experience: Optional[List[ExperienceItem]] = None
    skills: Optional[List[SkillCategory]] = None