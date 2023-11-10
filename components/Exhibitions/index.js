import styled from "styled-components";
import uuid from "react-uuid";

export default function Exhibitions({ workData }) {
  return (
    <ExhibitionsContainer>
      {workData?.upcomingExhi && (
        <ExhiContainer id="upcoming">
          <ExhiHeadline>Upcoming Exhibtions</ExhiHeadline>
          {workData.upcomingExhi.map((exhi) => {
            return <ExhiSection key={uuid()}>{exhi}</ExhiSection>;
          })}
        </ExhiContainer>
      )}
      <ExhiContainer id="exhibitions">
        <ExhiHeadline>Exhibitions</ExhiHeadline>
        {workData.exhibitions.map((exhi) => {
          return <ExhiSection key={uuid()}>{exhi}</ExhiSection>;
        })}
      </ExhiContainer>
      <ExhiContainer id="sound">
        <ExhiHeadline>Sound Design</ExhiHeadline>
        {workData.sounddesign.map((exhi) => {
          return <ExhiSection key={uuid()}>{exhi}</ExhiSection>;
        })}
      </ExhiContainer>
    </ExhibitionsContainer>
  );
}

const ExhibitionsContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10vh;
`;

const ExhiContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5vh;
  &:target::before {
    content: "";
    margin-top: 2vh;
  }
`;

const ExhiHeadline = styled.h2``;

const ExhiSection = styled.div`
  display: flex;
`;

const ExhiYear = styled.p`
  display: flex;
  width: 25%;
`;

const ExhiPlace = styled.p`
  padding: 0 20px;
  width: 75%;
`;
