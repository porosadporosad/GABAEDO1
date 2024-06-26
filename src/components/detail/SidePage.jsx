import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteDoc, doc, getDoc, updateDoc } from '@firebase/firestore';

import EditModal from './EditModal';
import userImg from 'assets/defaultImg.jpg';
import bookmarkDefault from 'assets/bookmark_default.png';
import bookmarkSelected from 'assets/bookmark_selected.png';
import { db } from 'shared/firebase';
import { getUsers } from 'shared/database';
import { getCurrentUser } from 'shared/database';

export default function SidePage({ postData, placeData, onPlaceClick }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const uid = localStorage.getItem('uid');

  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [writerIcon, setWriterIcon] = useState(userImg);
  const [writerNickname, setWriterNickname] = useState('');
  const [bookmarkImg, setBookmarkImg] = useState(bookmarkDefault);

  const { isLoading: currUserIsLoading, data: currUserData } = useQuery('user', getCurrentUser);
  const { isLoading: usersIsLoading, data: usersData } = useQuery('users', getUsers);

  const handlePlaceClick = (place) => {
    if (onPlaceClick) onPlaceClick(place.lat, place.lng);
  };

  /** 북마크 여부에 따라 아이콘 변경 */
  useEffect(() => {
    const fetchUserBookmark = async () => {
      if (uid) {
        const userDocRef = doc(db, 'users', uid);
        try {
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            if (userData.bookmark.includes(id)) {
              setBookmarkImg(bookmarkSelected);
            } else {
              setBookmarkImg(bookmarkDefault);
            }
          }
        } catch (error) {
          console.error('사용자 정보 가져오기 에러', error.message);
        }
      }
    };

    fetchUserBookmark();
  }, [uid, id]);

  useEffect(() => {
    if (!usersIsLoading && Array.isArray(usersData)) {
      const fetchData = async () => {
        const writerInfo = postData.userId;
        const writer = usersData.find((user) => user.userId === writerInfo);
        if (writer) {
          setWriterIcon(writer.avatar);
          setWriterNickname(writer.nickname);
        } else {
          console.error('글쓴이를 찾을 수 없습니다!');
        }
      };
      fetchData();
    }
  }, [usersData, postData, usersIsLoading]);

  /** 뒤로가기 버튼 */
  const goBackClickHandler = () => {
    navigate(`/`);
  };

  /** 카페 추가하기 버튼 */
  const addPlaceBtnHandler = () => {
    navigate(`/search/${id}`);
  };

  if (currUserIsLoading || usersIsLoading) {
    return <div>로딩중</div>;
  }

  /** 북마크 버튼 클릭 핸들러 */
  const bookmarkClickHandler = async () => {
    //로그인을 안 한 경우
    if (!uid) {
      if (!window.confirm(`로그인이 필요합니다. 로그인 페이지로 이동할까요?`)) {
        return;
      } else {
        navigate(`/login`);
        return;
      }
    }
    //로그인이 되어 있는 경우
    const userDocRef = doc(db, 'users', uid);
    try {
      setIsAdding(true);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        let updatedBookmark;

        //이미 북마크 되어 있는 게시글이라면
        if (userData.bookmark.includes(id)) {
          alert(`해당 가배도를 북마크 해제합니다.`);
          updatedBookmark = userData.bookmark.filter((item) => item !== id);
          setBookmarkImg(bookmarkDefault);

          //아직 북마크 되어 있지 않은 게시글이라면
        } else {
          toast.success(`북마크 성공! 마이페이지에서 확인하세요.`);
          updatedBookmark = [...userData.bookmark, id];
          setBookmarkImg(bookmarkSelected);
        }
        const newData = { ...userData, bookmark: updatedBookmark };

        await updateDoc(userDocRef, newData);
        await queryClient.invalidateQueries('users');
      } else {
        console.log('해당 사용자의 데이터가 없다');
      }
    } catch (error) {
      console.error('북마크 추가 에러 발생', error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      if (!window.confirm(`이 카페를 해당 가배도에서 삭제할까요?`)) return;
      const docRef = doc(db, 'places', id);

      await deleteDoc(docRef);
      await queryClient.invalidateQueries('posts');
    } catch (error) {
      toast.error(`오류 발생! 다시 시도해보세요.`);
      console.error('문서 삭제 에러', error);
    }
  };

  const writerInfo = postData.userId;

  return (
    <>
      <SidePageContainer>
        <GoBackButton onClick={goBackClickHandler} title="돌아가기">
          ◀
        </GoBackButton>
        <PostInfo>
          {!currUserIsLoading && currUserData.userId === writerInfo ? (
            <Edit onClick={() => setIsModalOpen(true)}>수정</Edit>
          ) : null}
          <PostBox>
            <h2>
              ✧☕✧
              <br />
              {postData.title}
            </h2>
            <h3>{postData.content}</h3>
          </PostBox>
          <HashtagBox>
            {postData.hashtag.map((hashtag) => {
              return <Hashtag key={hashtag}>{hashtag}</Hashtag>;
            })}
          </HashtagBox>
          <BrownLine />
          <BookmarkAndWriter>
            <Bookmark>
              <img
                src={bookmarkImg}
                onClick={bookmarkClickHandler}
                disabled={isAdding}
                title="해당 가배도 북마크하기"
                width="20"
                alt="북마크"
              />
            </Bookmark>
            <Writer>
              <img src={writerIcon} alt="사용자 아바타" width="25" style={{ borderRadius: '50%' }} />
              <WriterNickname>{writerNickname}</WriterNickname>
            </Writer>
          </BookmarkAndWriter>
        </PostInfo>
        {!currUserIsLoading && currUserData.userId === writerInfo ? (
          <AddPlaceBtn onClick={addPlaceBtnHandler}>카페 추가하기</AddPlaceBtn>
        ) : null}
        <PlacesBox>
          {placeData.length === 0 ? (
            <Place style={{ textAlign: 'center' }}>아직 등록된 카페가 없습니다.</Place>
          ) : (
            placeData.map((place) => {
              return (
                <Place key={place.id} onClick={() => handlePlaceClick(place)}>
                  <PlaceInfo>
                    <h2>{place.name}</h2>
                    <h4>{place.address}</h4>
                  </PlaceInfo>
                  <h3>{place.placeComment}</h3>
                  <DeleteBtnArea>
                    {!currUserIsLoading && currUserData.userId === writerInfo ? (
                      <Edit onClick={() => deleteHandler(place.id)}>삭제</Edit>
                    ) : null}
                  </DeleteBtnArea>
                </Place>
              );
            })
          )}
        </PlacesBox>
      </SidePageContainer>
      <EditModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} postData={postData} id={id} />
    </>
  );
}

const SidePageContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 450px;
  height: 100%;
  border-right: 1px solid #c70000;
  background-color: #e0c3ae;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const GoBackButton = styled.div`
  display: inline-block;
  background-color: #784b31;
  color: white;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const BrownLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0c3ae;
`;

const PostInfo = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  box-shadow: 2px 2px 5px 2px #e0c3aea2;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const BookmarkAndWriter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12pt;
  gap: 5px;
`;

const Bookmark = styled.div`
  margin-left: 5px;
  cursor: pointer;
`;

const WriterNickname = styled.span`
  font-family: 'SunBatang-Bold';
  color: #784b31;
  margin-right: 5px;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PostBox = styled.div`
  text-align: center;
  gap: 5px;

  & h2 {
    font-family: 'SunBatang-Bold';
    padding: 10px;
    font-size: 25px;
    color: #784b31;
  }

  & h3 {
    font-family: 'SunBatang-Medium';
    line-height: 2;
  }
`;

const HashtagBox = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

const Hashtag = styled.span`
  background-color: #fff9f3;
  border-radius: 12px;
  font-size: 10pt;
`;

const AddPlaceBtn = styled.button`
  background-color: #b6856a;
  border: none;
  border-radius: 12px;
  width: 100%;
  height: 40px;
  font-family: 'SunBatang-Bold';
  font-size: 14pt;
  cursor: pointer;
`;

const PlacesBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;

const Place = styled.div`
  background-color: #fff9f3;
  border: 1px solid #b6856a;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 10px rgba(255, 105, 180, 0.6);
  }

  & h2 {
    font-family: 'SunBatang-Bold';
    font-size: 20px;
    color: #784b31;
  }

  & h3 {
    font-family: 'SunBatang-Medium';
    font-size: 18px;
    line-height: 180%;
  }

  & h4 {
    font-family: 'SunBatang-Medium';
    font-size: 14px;
    line-height: 180%;
    color: #b6856a;
  }
`;

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Edit = styled.div`
  width: 50px;
  height: 20px;
  background-color: #b6856a;
  color: white;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DeleteBtnArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;
