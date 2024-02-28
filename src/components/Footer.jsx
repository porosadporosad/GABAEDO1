import styled from 'styled-components';
import githubIcon from 'assets/github-icon.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <StFooter>
      <Link to="https://github.com/porosadporosad/GABAEDO" target="_blank">
        <img src={githubIcon} alt="깃허브 아이콘" />
      </Link>
      <p> Gabaedo Project Copyright 2024. Newbie9 all rights reserved.</p>
    </StFooter>
  );
}

const StFooter = styled.footer`
  height: 130px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;

  color: #e0c3ae;

  & img {
    width: 30px;
    height: 30px;

    opacity: 0.5;
  }
`;
