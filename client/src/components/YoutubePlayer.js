import styled from "styled-components";

const YoutubePlayer = ({ id }) => (
  <Container>
    <div className="video">
      <iframe
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${id}?controls=0`}
      ></iframe>
    </div>
  </Container>
);

export default YoutubePlayer;

const Container = styled.div`
  .video {
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
  }

  .video {
    iframe {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }
  }
`;
