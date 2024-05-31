import React, { useEffect, useState } from 'react';
import { notices } from '@/constant/selectedOfficeNotice';

interface OfficeNoticeProps {
  branchName: string;
}

const OfficeNotice: React.FC<OfficeNoticeProps> = ({ branchName }) => {
    const [randomNotices, setRandomNotices] = useState<{ title: string; content: string }[]>([]);
    const [expandedNotice, setExpandedNotice] = useState<{ [key: string]: boolean }>({});
    
    const hashCode = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return hash;
    };
    
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    
    useEffect(() => {
      const seed = hashCode(branchName);
      const urgentNotices = notices.filter(notice => notice.type === '긴급');
      const generalNotices = notices.filter(notice => notice.type === '일반');
    
      const randomUrgentNotice = urgentNotices[Math.floor(seededRandom(seed) * urgentNotices.length)];
      const randomGeneralNotices = generalNotices
        .sort(() => 0.5 - seededRandom(seed))
        .slice(0, 2);
    
      setRandomNotices([randomUrgentNotice, ...randomGeneralNotices]);
    }, [branchName]);
    
    const toggleExpand = (title: string) => {
      setExpandedNotice(prevState => ({
        ...prevState,
        [title]: !prevState[title] 
      }));
    };
    
    return (
      <div className="px-4 pb-4">
        {randomNotices.map((notice, index) => (
          <div key={index} className="mb-[15px]">
            <div className="flex justify-between items-center py-[10px]">
              <div className="pl-[20px] text-black/opacity-20 text-sm font-semibold font-['Pretendard'] leading-tight tracking-tight cursor-pointer" onClick={() => toggleExpand(notice.title)}>
                {notice.title} 
              </div>
              <img
                className="w-[20px] h-4 cursor-pointer mr-[20px]"
                src={
                  expandedNotice[notice.title]
                    ? '/mypage/notice/UpArrow.svg'
                    : '/mypage/notice/DownArrow.svg'
                }
                alt="arrow"
                onClick={() => toggleExpand(notice.title)}
              />
            </div>
            {expandedNotice[notice.title] && (
              <div className="text-neutral-400 text-sm font-medium px-[20px] border-t border-b leading-tight py-3 bg-stone-50  border-neutral-300 mt-[15px]">{notice.content}</div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default OfficeNotice;