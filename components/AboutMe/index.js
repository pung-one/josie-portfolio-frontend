import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SortContent from "@/utils/SortContent";
import Link from "next/link";

export default function AboutMe({ aboutMe }) {
  if (!aboutMe.portfolioPDF?.fields.file.url) return <h1>Loading..</h1>;

  const ausbildungs = aboutMe.ausbildungs.map((ausbi) => {
    const match = ausbi.match(/(\d{4}\s*-\s*\S+)(.+)/);

    if (match) {
      const time = match[1].trim();
      const place = match[2].trim();

      return { time, place };
    } else {
      console.error(`Unable to parse: ${item}`);
      return null;
    }
  });

  console.log(ausbildungs);

  return (
    <AboutMeContainer>
      <StyledLink
        href={`https:${aboutMe.portfolioPDF?.fields.file.url}`}
        target="_blank"
      >
        Download Portfolio
      </StyledLink>
      <section>
        <ReactMarkdown>{aboutMe.personalData}</ReactMarkdown>
      </section>
      <section>
        <ReactMarkdown>{aboutMe.selfDescription}</ReactMarkdown>
      </section>
      <h2>Ausbildung</h2>
      <Education>
        <tbody>
          {ausbildungs.map((edu, index) => (
            <tr key={edu.place + index}>
              <YearTd>{edu.time}</YearTd>
              <PlaceTd>{edu.place}</PlaceTd>
            </tr>
          ))}
        </tbody>
      </Education>
    </AboutMeContainer>
  );
}

const AboutMeContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 5vh;
`;

const StyledLink = styled(Link)`
  position: relative;
  width: fit-content;
  text-decoration: none;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    right: 0;
    background-color: black;
    transform: scaleX(1);
  }
`;

const Education = styled.table`
  border-spacing: 10px 50px;
  margin: -50px 0;
  td {
    vertical-align: top;
  }
`;

const YearTd = styled.td`
  text-align: left;
`;
const PlaceTd = styled.td`
  text-align: right;
`;
