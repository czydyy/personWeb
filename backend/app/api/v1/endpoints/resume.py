from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List
import uuid

from app.schemas.resume import ResumeData, ResumeUpdate, ExperienceItem, SkillCategory
from app.core.security import verify_token

router = APIRouter()
security = HTTPBearer()

# 模拟数据存储（后续替换为数据库）
experience_db = []
skills_db = []


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """验证用户身份"""
    token = credentials.credentials
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="令牌无效或已过期"
        )
    
    return payload


@router.get("/", response_model=ResumeData)
async def get_resume_data():
    """获取简历数据（经历和技能）"""
    # 如果数据库为空，返回一些示例数据
    if not experience_db or not skills_db:
        from app.schemas.resume import ExperienceItem, SkillCategory
        
        example_experience = [
            ExperienceItem(
                id=str(uuid.uuid4()),
                company="示例公司",
                role="示例职位",
                period="2020 - 至今",
                description=["负责示例项目", "参与团队协作"]
            )
        ]
        
        example_skills = [
            SkillCategory(
                category="示例技能分类",
                items=["技能1", "技能2", "技能3"]
            )
        ]
        
        return ResumeData(
            experience=example_experience,
            skills=example_skills
        )
    
    return ResumeData(
        experience=experience_db,
        skills=skills_db
    )


@router.post("/", response_model=ResumeData)
async def update_resume_data(
    update: ResumeUpdate,
    current_user: dict = Depends(get_current_user)
):
    """更新简历数据（需要认证）"""
    global experience_db, skills_db
    
    if update.experience is not None:
        experience_db = update.experience
    
    if update.skills is not None:
        skills_db = update.skills
    
    return ResumeData(
        experience=experience_db,
        skills=skills_db
    )


@router.get("/experience", response_model=List[ExperienceItem])
async def get_experience():
    """获取工作经历"""
    if not experience_db:
        return [
            ExperienceItem(
                id=str(uuid.uuid4()),
                company="示例公司",
                role="示例职位",
                period="2020 - 至今",
                description=["负责示例项目", "参与团队协作"]
            )
        ]
    
    return experience_db


@router.get("/skills", response_model=List[SkillCategory])
async def get_skills():
    """获取技能分类"""
    if not skills_db:
        return [
            SkillCategory(
                category="示例技能分类",
                items=["技能1", "技能2", "技能3"]
            )
        ]
    
    return skills_db


@router.post("/experience", response_model=List[ExperienceItem])
async def update_experience(
    experience: List[ExperienceItem],
    current_user: dict = Depends(get_current_user)
):
    """更新工作经历（需要认证）"""
    global experience_db
    experience_db = experience
    return experience_db


@router.post("/skills", response_model=List[SkillCategory])
async def update_skills(
    skills: List[SkillCategory],
    current_user: dict = Depends(get_current_user)
):
    """更新技能分类（需要认证）"""
    global skills_db
    skills_db = skills
    return skills_db