import styled from "styled-components";
import YoutubePlayer from "../YoutubePlayer";
import { FaWindowClose } from "react-icons/fa";

const VideoContainer = ({ videoKey, setVideoIsOpen }) => {
  return (
    <Container>
      <div className="video-container">
        <div className="box">
          <div className="close-btn" onClick={() => setVideoIsOpen(false)}>
            <i>
              <FaWindowClose />
            </i>
          </div>
          <YoutubePlayer id={videoKey} />
        </div>
      </div>
    </Container>
  );
};

export default VideoContainer;

const Container = styled.div`
  .video-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    min-width: 320px;
    max-width: 700px;

    .box {
      position: relative;

      .close-btn {
        position: absolute;
        z-index: 1;
        top: 2%;
        right: 1.5%;
        transform: scale(1.25);
        cursor: pointer;
        color: rgba(255, 255, 255, 0.75);
        transition: 0.2s color;
      }

      .close-btn:hover {
        color: rgba(255, 255, 255, 1);
      }
    }
  }
`;
