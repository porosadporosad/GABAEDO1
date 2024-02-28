import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'shared/database';
import { db } from 'shared/firebase';
import styled from 'styled-components';
import { hashtageData } from 'constant/hashtageData';
import { useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export default function CreatePost({ setModalIsOpen }) {
  const navigate = useNavigate();
  const { data } = useQuery('user', getCurrentUser);
  const { userId, nickname } = data;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState([]);
  const queryClient = useQueryClient();

  const handleOnInput = (e, maxlength) => {
    const {
      target: { value }
    } = e;
    if (value.length > maxlength) e.target.value = value.substr(0, maxlength);
  };

  const addHashtag = (e) => {
    if (hashtag.length >= 3) {
      // 3개까지만 고를 수 있도록 배열 길이 조절
      hashtag.length = 3;
    } else {
      setHashtag((prev) => {
        // 중복 해시태그 방지
        if (!prev.includes(e.target.value)) {
          return [...prev, e.target.value];
        } else {
          return prev;
        }
      });
    }
  };

  const addPost = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.warning('타이틀을 입력해 주세요.');
      return;
    }
    if (!content) {
      toast.warning('소개 한마디를 입력해 주세요.');
      return;
    }
    if (hashtag.length === 0) {
      toast.warning('태그를 1개 이상 골라주세요.');
      return;
    }

    const newPost = {
      userId,
      nickname,
      createdAt: new Date().toISOString(),
      title,
      content,
      hashtag
    };
    try {
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      const postId = docRef.id;

      // 모달 끄기
      setModalIsOpen(false);
      await queryClient.invalidateQueries('posts');
      navigate(`detail/${postId}`);
    } catch (error) {
      console.error('게시글 추가하기 에러', error);
      throw error;
    }
  };

  return (
    <AddPostModalbody>
      <h1>새 가배도 등록 ☕️</h1>
      <PostForm onSubmit={addPost}>
        <h2>타이틀</h2>
        <PostInput
          type="text"
          value={title}
          onInput={(e) => handleOnInput(e, 18)}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ex) 공부하기 좋은 잠실 카페"
        />
        <h2>소개 한마디</h2>
        <PostInput
          type="text"
          value={content}
          onInput={(e) => handleOnInput(e, 20)}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ex) 작업하러 가기 좋았던 곳들이에요."
        />
        <PostSelect defaultValue="default" onChange={addHashtag}>
          <option value="default" disabled>
            # 태그를 골라주세요. (1개~3개)
          </option>
          {hashtageData.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </PostSelect>
        <HashtagSection>
          {hashtag.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </HashtagSection>
        <BtnSection>
          <Btn
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setModalIsOpen(false);
            }}
          >
            취소하기
          </Btn>
          <Btn>등록하기</Btn>
        </BtnSection>
      </PostForm>
    </AddPostModalbody>
  );
}

const AddPostModalbody = styled.section`
  width: 400px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #e0c3ae;
  border: 2px solid #784b31;
  border-radius: 50px;
  box-shadow: 5px 5px 20px 3px #e0c3ae;

  & h1 {
    height: 50px;
    line-height: 45px;

    font-size: 1.5rem;
    font-family: 'SunBatang-Medium';
    color: #784b31;
  }
`;

const PostForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 15px;

  & h2 {
    margin-top: 3px;
    font-family: 'SunBatang-Bold';
    color: #784b31;
  }
`;

const PostInput = styled.input`
  height: 50px;
  display: block;
  padding: 10px;

  border: none;
  border-radius: 15px;
`;

const PostSelect = styled.select`
  height: 40px;
  padding: 10px;

  color: #784b31;
  border: none;
  border-radius: 15px;
`;

const HashtagSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  & p {
    padding: 10px 20px;

    font-size: 13px;
    color: #784b31;
    background-color: #fff;
    /* border: 1px solid #784b31; */
    border-radius: 30px;
  }
`;

const BtnSection = styled.section`
  height: 50px;
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  width: 50%;

  font-size: 17px;
  color: #fff;
  background-color: #c70000;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #b10000;
  }
`;
