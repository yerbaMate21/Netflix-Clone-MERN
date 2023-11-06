import { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";

const PlanTable = ({ plan, isScrolled }) => {
  const [activeClass, setActiveClass] = useState(null);

  const toggleClass = () => {
    if (plan === "Basic") {
      setActiveClass("active-one");
    } else if (plan === "Standard") {
      setActiveClass("active-two");
    } else if (plan === "Premium") {
      setActiveClass("active-three");
    } else {
      setActiveClass(null);
    }
  };

  useEffect(() => {
    toggleClass();
  }, [plan]);

  return (
    <Container>
      <table className={`flex column ${isScrolled && "translate"}`}>
        <tbody className="flex column">
          <tr className={activeClass}>
            <td className="title">Monthly price</td>
            <td>29 zł</td>
            <td>43 zł</td>
            <td>60 zł</td>
          </tr>
          <tr className={activeClass}>
            <td className="title">Video quality</td>
            <td>Good</td>
            <td>Better</td>
            <td>Best</td>
          </tr>
          <tr className={activeClass}>
            <td className="title">Resolution</td>
            <td>720p</td>
            <td>1080p</td>
            <td>4k + HDR</td>
          </tr>
          <tr className={activeClass}>
            <td className="title">
              Watch on your TV, computer, mobile phone and tablet
            </td>
            <td>
              <i>
                <AiOutlineCheck />
              </i>
            </td>
            <td>
              <i>
                <AiOutlineCheck />
              </i>
            </td>
            <td>
              <i>
                <AiOutlineCheck />
              </i>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default PlanTable;

const Container = styled.div`
  table {
    tbody {
      font-size: 1rem;
      color: #444;

      tr {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid #e6e6e6;

        .title {
          width: 40%;
          font-size: 1rem;
          justify-content: start;
        }

        td {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            font-size: 1.8rem;
          }
        }

        td:nth-child(n + 2) {
          font-weight: 600;
        }
      }

      tr.active-one {
        td:nth-child(2) {
          color: #e50914;
        }
      }

      tr.active-two {
        td:nth-child(3) {
          color: #e50914;
        }
      }

      tr.active-three {
        td:nth-child(4) {
          color: #e50914;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    table {
      tbody {
        tr {
          flex-wrap: wrap;

          .title {
            width: 100%;
            justify-content: center;
          }

          td {
            width: 33.33333%;
          }
        }
      }
    }
  }

  table.translate {
    @media screen and (min-width: 951px) {
      padding-top: 144px;
    }

    @media screen and (min-width: 600px) and (max-width: 950px) {
      padding-top: 110px;
    }

    @media screen and (max-width: 600px) {
      padding-top: 96px;
    }
  }
`;
