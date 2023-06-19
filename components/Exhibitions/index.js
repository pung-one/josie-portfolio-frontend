import styled from "styled-components";
import uuid from "react-uuid";
import SortContent from "@/utils/SortContent";

export default function Exhibitions({ workData }) {
  console.log(workData);
  return (
    <ExhibitionsContainer>
      {workData?.upcomingExhibitions[0] && (
        <ExhiContainer>
          <ExhiHeadline>kommende Ausstellungen</ExhiHeadline>
          {workData.upcomingExhibitions.sort(SortContent).map((exhi) => {
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
        {workData.exhibitions.sort(SortContent).map((exhi) => {
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
  gap: 10vh;
`;

const ExhiContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5vh;
`;

const ExhiHeadline = styled.h2`
  /* margin-bottom: 1vh; */
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
