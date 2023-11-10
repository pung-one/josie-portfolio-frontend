import styled from "styled-components";
import uuid from "react-uuid";

export default function Exhibitions({ workData }) {
  const splitYearAndPlace = (arr) => {
    return arr.map((item) => {
      const firstSpaceIndex = item.indexOf(" ");
      const time = item.substring(0, firstSpaceIndex);
      const place = item.substring(firstSpaceIndex + 1);

      return { time, place };
    });
  };

  return (
    <ExhibitionsContainer>
      {workData?.upcomingExhi && (
        <ExhiContainer id="upcoming">
          <ExhiHeadline>Upcoming Exhibtions</ExhiHeadline>
          <ExhiTable>
            <tbody>
              {splitYearAndPlace(workData.upcomingExhi).map((exhi) => {
                return (
                  <tr key={uuid()}>
                    <ExhiTime>{exhi.time}</ExhiTime>
                    <ExhiPlace>{exhi.place}</ExhiPlace>
                  </tr>
                );
              })}
            </tbody>
          </ExhiTable>
        </ExhiContainer>
      )}
      <ExhiContainer id="exhibitions">
        <ExhiHeadline>Exhibitions</ExhiHeadline>
        <ExhiTable>
          <tbody>
            {splitYearAndPlace(workData.exhibitions).map((exhi) => {
              return (
                <tr key={uuid()}>
                  <ExhiTime>{exhi.time}</ExhiTime>
                  <ExhiPlace>{exhi.place}</ExhiPlace>
                </tr>
              );
            })}
          </tbody>
        </ExhiTable>
      </ExhiContainer>
      <ExhiContainer id="sound">
        <ExhiHeadline>Sound Design</ExhiHeadline>
        <ExhiTable>
          <tbody>
            {splitYearAndPlace(workData.sounddesign).map((exhi) => {
              return (
                <tr key={uuid()}>
                  <ExhiTime>{exhi.time}</ExhiTime>
                  <ExhiPlace>{exhi.place}</ExhiPlace>
                </tr>
              );
            })}
          </tbody>
        </ExhiTable>
      </ExhiContainer>
    </ExhibitionsContainer>
  );
}

const ExhibitionsContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10vh;
`;

const ExhiContainer = styled.section``;

const ExhiTable = styled.table`
  width: 100%;
  border-spacing: 20px 50px;
  margin: -50px 0;
  td {
    vertical-align: top;
  }
`;

const ExhiHeadline = styled.h2`
  margin-bottom: 5vh;
`;

const ExhiTime = styled.td`
  text-align: left;
`;

const ExhiPlace = styled.td`
  text-align: right;
`;
