import styled from 'styled-components';


export const FooterConteiner = styled.div`
  width: 100%;
  height: 300px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const LinkItem = styled.li`
  display: flex;
  align-items: center;

  margin-bottom: 15px;
  cursor: pointer;
`;
export const LinkLegalInformationItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-bottom: 15px;
  cursor: pointer;
`;

export const FooterLink = styled.a`
  font-family: 'Freigeist';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  color: #ffffff;
`;

export const FooterContCardSvg = styled.img`
  margin-right: 8px;
`;

export const LogoText = styled.h1`
  font-family: 'Freigeist';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  color: #ffffff;
`;
