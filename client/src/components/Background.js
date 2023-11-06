import styled from "styled-components";

const Background = ({ image }) => {
  return (
    <Container
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0,
                rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url(${image})`,
      }}
    >
      <div className="bg"></div>
    </Container>
  );
};

export default Background;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;

  .bg {
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 40%);
  }
`;
