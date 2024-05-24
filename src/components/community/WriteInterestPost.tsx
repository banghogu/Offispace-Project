import React, { useEffect, useState } from 'react';
import { tagWithInterest } from '@/constant/TagWithInterest';
import ToBackComunity from './shared/ToBackComunity';
import WritePostTitle from './shared/WritePostTitle';
import WritePostInterest from './interest/WritePostInterest';
import WritePostInterestTag from './interest/WritePostInterestTag';
import WritePostContent from './shared/WritePostContent';
import { WritePostType } from './model/writePostType';
import { useMutation } from 'react-query';
import { writePost } from './remote/post';

const WriteInterestPost = () => {
  const [postData, setPostData] = useState<WritePostType>({
    category: '자유게시판',
    title: '',
    tag: tagWithInterest[0].title,
    content: ''
  });

  const [isValid, setIsValid] = useState(false);

  const { mutateAsync } = useMutation((postData: WritePostType) => writePost(postData), {
    onSuccess: (data) => {
      console.log(data);
    }
  });

  useEffect(() => {
    const { category, tag, title, content } = postData;
    if (category != '' && tag != '' && title != '' && content != '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [postData, setIsValid]);

  return (
    <div className="mx-4">
      <div className="h-[60px]" />
      <header className="flex justify-between items-center">
        <ToBackComunity />
        <button
          onClick={() => mutateAsync(postData)}
          disabled={!isValid}
          className={`h-10 px-3 py-2 rounded-md shrink-0 font-semibold text-xl
          ${isValid === false ? 'text-gray-600' : 'text-white bg-space-purple'}
          `}>
          등록
        </button>
      </header>
      <nav>
        <WritePostInterest postData={postData} setPostData={setPostData} />
      </nav>
      <div>
        <WritePostTitle postData={postData} setPostData={setPostData} />
      </div>
      <div>
        <WritePostContent postData={postData} setPostData={setPostData} />
      </div>
      <footer>
        <WritePostInterestTag postData={postData} setPostData={setPostData} />
      </footer>
    </div>
  );
};

export default WriteInterestPost;
