import { styled } from "styled-components";
import uuid from "react-uuid";

export default function Exhibitions({ workData }) {
  return (
    <ExhibitionsContainer>
      {workData?.upcomingExhibitions[0] && (
        <ExhiContainer>
          <ExhiHeadline>kommende Ausstellungen</ExhiHeadline>
          {workData.upcomingExhibitions.map((exhi) => {
            return (
              <ExhiSection key={uuid()}>
                <ExhiYear>{exhi.attributes.Jahr}</ExhiYear>
                <ExhiPlace>{exhi.attributes.Ausstellung}</ExhiPlace>
              </ExhiSection>
            );
          })}
        </ExhiContainer>
      )}
      <ExhiContainer>
        <ExhiHeadline>Ausstellungen</ExhiHeadline>
        {workData.exhibitions.map((exhi) => {
          return (
            <ExhiSection key={uuid()}>
              <ExhiYear>{exhi.attributes.Jahr}</ExhiYear>
              <ExhiPlace>{exhi.attributes.Ausstellung}</ExhiPlace>
            </ExhiSection>
          );
        })}
      </ExhiContainer>
    </ExhibitionsContainer>
  );
}

const ExhibitionsContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-right: 10px;
`;

const ExhiContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ExhiHeadline = styled.h2`
  margin-bottom: 50px;
`;

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
