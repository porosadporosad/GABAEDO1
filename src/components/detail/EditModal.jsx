import styled from 'styled-components';
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'shared/firebase';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { hashtageData } from 'constant/hashtageData';

export default function EditModal({ isOpen, postData, setIsModalOpen, id }) {
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);
  const [hashtag, setHashtag] = useState(postData.hashtag);
  const queryClient = useQueryClient();

  if (!isOpen) return null;

  const handleOnInput = (e, maxlength) => {
    const {
      target: { value }
    } = e;
    if (value.length > maxlength) e.target.value = value.substr(0, maxlength);
  };

  const addHashtag = (e) => {
    if (hashtag.length >= 3) {
      hashtag.length = 3;
    } else {
      setHashtag((prev) => {
        if (!prev.includes(e.target.value)) {
          return [...prev, e.target.value];
        } else {
          return prev;
        }
      });
    }
  };

  const updatePost = async (e) => {
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

    const postRef = doc(db, 'posts', id);
    try {
      await updateDoc(postRef, { title, content, hashtag });
      setIsModalOpen(false);
      await queryClient.invalidateQueries('posts');
      toast.success(`게시글이 수정되었습니다.`);
    } catch (error) {
      toast.error(`게시글 수정중 오류가 발생했습니다.`);
      throw error;
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalText>가배도 수정하기</ModalText>
        <PostForm onSubmit={updatePost}>
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
            <button type="button" onClick={() => setIsModalOpen(false)}>
              취소하기
            </button>
            <button type="submit">등록하기</button>
          </BtnSection>
        </PostForm>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: #e0c3ae;
  border: 2px solid #784b31;
  box-shadow: 5px 5px 20px 3px #e0c3ae;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  font-size: 20pt;
  font-family: 'SunBatang-Bold';
  color: #784b31;
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

  & button {
    width: 50%;

    font-size: 17px;
    color: #fff;
    background-color: #c70000;
    border: none;
    border-radius: 15px;
    cursor: pointer;
  }
`;
