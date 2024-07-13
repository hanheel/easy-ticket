import styled from "styled-components";

const SubNavWrap = styled.div`
  width: 1320px;
  height: 40px;
  background-color: var(--sub-color);
  display: flex;
  justify-content: center;
`;
/*서브네비게이터 ul */
const SubNavContainer = styled.ul`
  width: 1320px;
  display: flex;
  align-items: center;
  text-align: center;
`;
/*서브네비게이터 Contents - 서브네비게이터 내용*/
const SubNavContent = styled.li`
  font-size: 12px;
  color: var(--text-color);
  width: 90px;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: var(--key-color);
  }
`;

const SubNav = ({ hoveredItem }) => {
  return (
    <>
      {hoveredItem === "연습모드" && (
        <SubNavWrap>
          <SubNavContainer>
            <SubNavContent>초급</SubNavContent>
            <SubNavContent>중급</SubNavContent>
            <SubNavContent>고급</SubNavContent>
          </SubNavContainer>
        </SubNavWrap>
      )}

      {hoveredItem === "실전모드" && (
        <SubNavWrap>
          <SubNavContainer>
            <SubNavContent>인터파크 티켓</SubNavContent>
            <SubNavContent>멜론티켓</SubNavContent>
            <SubNavContent>예스24</SubNavContent>
            <SubNavContent>티켓링크</SubNavContent>
          </SubNavContainer>
        </SubNavWrap>
      )}
      {hoveredItem === null && null}
    </>
  );
};

export default SubNav;
